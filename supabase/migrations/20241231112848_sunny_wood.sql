/*
  # Update Complaints Table RLS Policies

  1. Changes
    - Remove restriction for authenticated users only
    - Allow public access for creating complaints
    - Maintain read access for everyone
    - Keep update restrictions for owners and admins

  2. Security
    - Enable public access for complaint submission
    - Maintain data integrity with proper constraints
    - Preserve admin privileges
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create complaints" ON complaints;
DROP POLICY IF EXISTS "Users can read all complaints" ON complaints;

-- Create new policies
CREATE POLICY "Anyone can create complaints"
  ON complaints
  FOR INSERT
  TO public  -- Changed from authenticated to public
  WITH CHECK (true);

CREATE POLICY "Anyone can read complaints"
  ON complaints
  FOR SELECT
  TO public  -- Changed from authenticated to public
  USING (true);

-- Keep existing update policies unchanged