-- Create public storage bucket 'media' if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'media') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('media', 'media', true);
  END IF;
END $$;

-- Ensure RLS is enabled on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Reset existing policies for idempotency
DROP POLICY IF EXISTS "Public read access to media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media" ON storage.objects;

-- Public read access to files in the 'media' bucket
CREATE POLICY "Public read access to media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

-- Admins can upload to the 'media' bucket
CREATE POLICY "Admins can upload media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media' AND public.is_admin());

-- Admins can update files in the 'media' bucket
CREATE POLICY "Admins can update media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'media' AND public.is_admin());

-- Admins can delete files in the 'media' bucket
CREATE POLICY "Admins can delete media"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND public.is_admin());

-- Enforce unique slugs for articles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'unique_articles_slug'
  ) THEN
    ALTER TABLE public.articles
    ADD CONSTRAINT unique_articles_slug UNIQUE (slug);
  END IF;
END $$;