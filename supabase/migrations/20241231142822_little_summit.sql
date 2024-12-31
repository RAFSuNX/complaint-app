/*
  # Simplify admin policies to eliminate recursion

  1. Changes
    - Remove views and complex policy logic
    - Implement direct policy checks
    - Add necessary indexes
  
  2. Security
    - Maintain RLS security
    - Simplify admin access checks
*/

-- Drop existing objects and policies
DROP VIEW IF EXISTS admin_users CASCADE;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any complaint" ON complaints;

-- Create simplified admin policies
CREATE POLICY "Public can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1
    FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND id IN (SELECT id FROM profiles WHERE is_admin = true)
  ));

CREATE POLICY "Admins can update any complaint"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1
    FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND id IN (SELECT id FROM profiles WHERE is_admin = true)
  ));

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin);
CREATE INDEX IF NOT EXISTS idx_profiles_id_admin ON profiles(id) WHERE is_admin = true;