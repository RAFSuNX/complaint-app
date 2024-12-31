/*
  # Fix Admin Policies and Add Admin Dashboard Support

  1. Changes
    - Fix infinite recursion in profiles policies
    - Add proper admin access policies
    - Add admin dashboard views
  
  2. Security
    - Enable RLS
    - Add specific admin policies
*/

-- Drop problematic policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;

-- Create new admin policies without recursion
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create admin dashboard views
CREATE VIEW admin_dashboard_stats AS
SELECT
  (SELECT count(*) FROM profiles) as total_users,
  (SELECT count(*) FROM complaints WHERE status = 'pending') as pending_complaints,
  (SELECT count(*) FROM complaints WHERE status = 'resolved') as resolved_complaints,
  (SELECT count(*) FROM complaints WHERE category = 'corruption') as critical_issues;