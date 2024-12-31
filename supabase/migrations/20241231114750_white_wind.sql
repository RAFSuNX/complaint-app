/*
  # Add Missing Admin Policies

  1. Changes
    - Add policy for admins to update any complaint
    - Skip profile policies since they already exist
*/

-- Admin policies for complaints
DROP POLICY IF EXISTS "Admins can update any complaint" ON complaints;

CREATE POLICY "Admins can update any complaint"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );