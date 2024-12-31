/*
  # Fix recursive admin policies

  1. Changes
    - Remove recursive admin policies
    - Create new non-recursive policies using a materialized view
    - Add admin_users view for better performance
  
  2. Security
    - Maintain same security level while avoiding recursion
    - Policies still restrict access appropriately
*/

-- Create materialized view for admin users
CREATE MATERIALIZED VIEW admin_users AS
SELECT id
FROM profiles
WHERE is_admin = true;

-- Create index for better performance
CREATE INDEX admin_users_id_idx ON admin_users(id);

-- Create function to refresh admin users
CREATE OR REPLACE FUNCTION refresh_admin_users()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY admin_users;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh admin users
CREATE TRIGGER refresh_admin_users_trigger
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_admin_users();

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any complaint" ON complaints;

-- Create new non-recursive admin policies
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update any complaint"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );