-- Migration: Storage bucket for landing page assets
-- Date: 2026-02-17
-- Description: Creates a public bucket for image uploads and sets RLS policies

-- Create public bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('page-assets', 'page-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Authenticated users can upload files
CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'page-assets');

-- Authenticated users can replace/update their uploads
CREATE POLICY "Authenticated users can update assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'page-assets');

-- Authenticated users can delete their uploads
CREATE POLICY "Authenticated users can delete assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'page-assets');

-- Public read access (bucket is public, but explicit policy for clarity)
CREATE POLICY "Public can read assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'page-assets');
