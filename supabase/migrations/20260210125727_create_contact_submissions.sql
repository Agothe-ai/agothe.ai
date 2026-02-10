/*
  # Create contact_submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, optional) - submitter name
      - `email` (text, not null) - submitter email
      - `service_interest` (text, optional) - which service they are interested in
      - `message` (text, not null) - their message
      - `created_at` (timestamptz, default now()) - submission timestamp

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add INSERT policy for anonymous users to allow form submissions
    - No SELECT/UPDATE/DELETE policies for anon - data is write-only from the public site
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text DEFAULT '',
  email text NOT NULL,
  service_interest text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL AND
    length(email) > 0 AND
    email ~ '^[^@]+@[^@]+\.[^@]+$' AND
    message IS NOT NULL AND
    length(message) > 0
  );
