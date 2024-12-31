/*
  # Complaints Management System Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `full_name` (text) - User's full name
      - `is_admin` (boolean) - Admin status flag
      - `created_at` (timestamptz) - Profile creation timestamp
      
    - `complaints`
      - `id` (uuid, primary key)
      - `title` (text) - Complaint title
      - `description` (text) - Detailed complaint description
      - `category` (text) - Type of complaint
      - `location` (text) - Where the incident occurred
      - `status` (text) - Current status of the complaint
      - `is_anonymous` (boolean) - Whether the complaint is anonymous
      - `user_id` (uuid) - Reference to the submitter
      - `created_at` (timestamptz) - Submission timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on both tables
    - Profiles:
      - Users can read their own profile
      - Users can update their own profile
      - Admins can read all profiles
    - Complaints:
      - Anyone can create complaints
      - Users can read all complaints
      - Users can only update their own non-anonymous complaints
      - Admins can update any complaint's status
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

-- Profiles policies
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

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );

-- Complaints policies
CREATE POLICY "Anyone can create complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read all complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own non-anonymous complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id 
    AND NOT is_anonymous
  );

CREATE POLICY "Admins can update any complaint"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE is_admin = true
    )
  );

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON complaints
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();