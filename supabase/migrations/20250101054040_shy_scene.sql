/*
  # Initial Schema Setup for Complaint Management System

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - References auth.users
      - `created_at` (timestamp)
      - `full_name` (text)
      - `role` (enum: user, admin)
      - `avatar_url` (text, nullable)
    
    - `complaints`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `status` (enum: pending, in_progress, resolved, rejected)
      - `user_id` (uuid, references profiles)
      - `category` (text)
      - `priority` (enum: low, medium, high)
      - `attachments` (text array, nullable)
      - `admin_notes` (text, nullable)
      - `resolved_at` (timestamp, nullable)

  2. Security
    - Enable RLS on both tables
    - Add policies for user and admin access
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved', 'rejected');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  role user_role DEFAULT 'user',
  avatar_url text
);

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  status complaint_status DEFAULT 'pending',
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  priority priority_level DEFAULT 'medium',
  attachments text[],
  admin_notes text,
  resolved_at timestamptz
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Complaints policies
CREATE POLICY "Users can view their own complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their pending complaints"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid() AND
    status = 'pending'
  );

CREATE POLICY "Admins can view all complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update any complaint"
  ON complaints
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);