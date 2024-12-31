/*
  # Database Schema Update
  
  1. Tables
    - Creates profiles and complaints tables if they don't exist
    - Adds necessary columns and constraints
  
  2. Security
    - Enables RLS
    - Updates policies with existence checks
    - Sets up trigger for updated_at
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  is_anonymous boolean DEFAULT false,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can create complaints" ON complaints;
DROP POLICY IF EXISTS "Anyone can read complaints" ON complaints;
DROP POLICY IF EXISTS "Users can update own non-anonymous complaints" ON complaints;

-- Recreate policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can create complaints"
  ON complaints
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read complaints"
  ON complaints
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own non-anonymous complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id 
    AND NOT is_anonymous
  );

-- Drop and recreate trigger function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
DROP TRIGGER IF EXISTS update_complaints_updated_at ON complaints;
CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();