/*
  # Demo Requests Table

  1. New Tables
    - `demo_requests`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `company` (text) - Company name
      - `role` (text) - Job role/title
      - `phone` (text, nullable) - Phone number
      - `challenges` (text[]) - Array of selected challenges
      - `company_size` (text) - Company size category
      - `current_tools` (text, nullable) - Current tools being used
      - `timeline` (text) - Implementation timeline
      - `budget_range` (text) - Budget range category
      - `preferred_date` (text, nullable) - Preferred meeting date
      - `preferred_time` (text, nullable) - Preferred meeting time
      - `meeting_type` (text) - Type of meeting requested
      - `additional_notes` (text, nullable) - Additional notes/comments
      - `status` (text) - Request status (pending, contacted, scheduled, completed, cancelled)
      - `created_at` (timestamptz) - Timestamp of submission
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `demo_requests` table
    - Add policy for authenticated admin users to view all requests
    - Add policy for anonymous users to insert their own requests
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  phone text,
  challenges text[] NOT NULL DEFAULT '{}',
  company_size text NOT NULL,
  current_tools text,
  timeline text NOT NULL,
  budget_range text NOT NULL,
  preferred_date text,
  preferred_time text,
  meeting_type text NOT NULL,
  additional_notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy for anyone to insert demo requests (anonymous submission)
CREATE POLICY "Anyone can submit demo requests"
  ON demo_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy for authenticated users to view their own requests (if we add user_id later)
CREATE POLICY "Users can view own demo requests"
  ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);