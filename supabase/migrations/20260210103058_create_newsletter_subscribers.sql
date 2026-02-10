/*
  # Create newsletter_subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key, auto-generated)
      - `email` (text, unique, not null) - subscriber email address
      - `created_at` (timestamptz, default now()) - when the subscription was created

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add INSERT policy for anonymous users to allow form submissions
    - No SELECT/UPDATE/DELETE policies for anon - data is write-only from the public site
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous newsletter signups"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL AND
    length(email) > 0 AND
    email ~ '^[^@]+@[^@]+\.[^@]+$'
  );
