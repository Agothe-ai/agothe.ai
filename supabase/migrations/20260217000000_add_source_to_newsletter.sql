/*
  # Add source tracking to newsletter_subscribers
  
  1. Changes
    - Add `source` column to track where the subscription came from
    - Update RLS policy to allow source field
*/

ALTER TABLE newsletter_subscribers
ADD COLUMN IF NOT EXISTS source text DEFAULT 'unknown';

-- Drop existing policy
DROP POLICY IF EXISTS "Allow anonymous newsletter signups" ON newsletter_subscribers;

-- Create updated policy with source
CREATE POLICY "Allow anonymous newsletter signups"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL AND
    length(email) > 0 AND
    email ~ '^[^@]+@[^@]+\.[^@]+$'
  );
