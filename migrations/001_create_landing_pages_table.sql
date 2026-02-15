-- Migration: Create landing_pages table
-- Date: 2026-02-13
-- Description: Initial migration from Prisma SQLite to Supabase PostgreSQL

-- Create main table
CREATE TABLE landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  checkout_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX idx_landing_pages_updated_at ON landing_pages(updated_at DESC);

-- Create auto-update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_landing_pages_updated_at
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Configure RLS (Row Level Security)
-- Permissive policy for now, no authentication required yet
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for all users" ON landing_pages
  FOR ALL USING (true) WITH CHECK (true);

-- Comments for documentation
COMMENT ON TABLE landing_pages IS 'Landing pages created with Puck visual editor';
COMMENT ON COLUMN landing_pages.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN landing_pages.slug IS 'URL-friendly identifier (unique)';
COMMENT ON COLUMN landing_pages.title IS 'Page title for SEO and display';
COMMENT ON COLUMN landing_pages.data IS 'Puck editor data stored as JSONB';
COMMENT ON COLUMN landing_pages.checkout_url IS 'Optional checkout/payment URL';
COMMENT ON COLUMN landing_pages.created_at IS 'Timestamp when page was created';
COMMENT ON COLUMN landing_pages.updated_at IS 'Timestamp when page was last updated (auto-updated via trigger)';
