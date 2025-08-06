-- Fix function search paths for security
ALTER FUNCTION public.is_admin() SET search_path TO public, auth;
ALTER FUNCTION public.create_first_admin(text, text) SET search_path TO public, auth;
ALTER FUNCTION public.update_updated_at_column() SET search_path TO public;

-- Enhance newsletter subscriptions table with verification
ALTER TABLE public.newsletter_subscriptions
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS verification_token UUID DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ DEFAULT now() + interval '24 hours';

-- Update existing records to be verified (for migration)
UPDATE public.newsletter_subscriptions 
SET is_verified = true 
WHERE is_verified = false;

-- Create comprehensive RLS policies for newsletter
DROP POLICY IF EXISTS "Anyone can check subscription status" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;

-- Public can insert (subscribe)
CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Anyone can verify their subscription
CREATE POLICY "Anyone can verify subscription"
  ON public.newsletter_subscriptions
  FOR UPDATE
  USING (true)
  WITH CHECK (is_verified = true);

-- Admins can manage all records
CREATE POLICY "Admins can manage subscriptions"
  ON public.newsletter_subscriptions
  FOR ALL
  USING (is_admin());

-- Only admins can view full list, others can only check their own
CREATE POLICY "View subscription status"
  ON public.newsletter_subscriptions
  FOR SELECT
  USING (is_admin() OR email = current_setting('request.jwt.claims', true)::json->>'email');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_verification ON public.newsletter_subscriptions(verification_token) WHERE verification_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published_at) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_business_sectors_slug ON public.business_sectors(slug);
CREATE INDEX IF NOT EXISTS idx_leadership_status ON public.leadership_profiles(status);

-- Create function to clean expired tokens
CREATE OR REPLACE FUNCTION public.clean_expired_verification_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  UPDATE public.newsletter_subscriptions 
  SET verification_token = NULL, token_expires_at = NULL
  WHERE token_expires_at < now();
END;
$$;

-- Create trigger to set updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO public
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- Add updated_at triggers to all content tables
DROP TRIGGER IF EXISTS update_articles_updated_at ON public.articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS update_business_sectors_updated_at ON public.business_sectors;
CREATE TRIGGER update_business_sectors_updated_at
  BEFORE UPDATE ON public.business_sectors
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS update_leadership_updated_at ON public.leadership_profiles;
CREATE TRIGGER update_leadership_updated_at
  BEFORE UPDATE ON public.leadership_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS update_faqs_updated_at ON public.faqs;
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();