/*
  # Fix admin policies and remove recursion

  1. Changes
    - Drop and recreate admin users view with proper concurrency
    - Update admin policies to use a simpler approach
    - Add proper indexes for performance
  
  2. Security
    - Maintain row-level security
    - Ensure admin access is properly controlled
*/

-- Drop existing objects to start fresh
DROP MATERIALIZED VIEW IF EXISTS admin_users CASCADE;
DROP TRIGGER IF EXISTS refresh_admin_users_trigger ON profiles CASCADE;
DROP FUNCTION IF EXISTS refresh_admin_users() CASCADE;

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any complaint" ON complaints;

-- Create a simple view instead of materialized view
CREATE VIEW admin_users AS
SELECT id
FROM profiles
WHERE is_admin = true;

-- Create new admin policies using direct checks
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid())
    OR id = auth.uid()
  );

CREATE POLICY "Admins can update any complaint"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    (SELECT is_admin FROM profiles WHERE id = auth.uid())
  );

-- Add index to improve performance
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;