
-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  source TEXT DEFAULT 'website'
);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_subscriptions_email ON public.newsletter_subscriptions(email);

-- Create index on subscribed_at for analytics
CREATE INDEX idx_newsletter_subscriptions_date ON public.newsletter_subscriptions(subscribed_at);

-- Enable RLS (though we'll make it publicly accessible for newsletter signup)
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for newsletter signup)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow public select (for checking if already subscribed)
CREATE POLICY "Anyone can check subscription status" 
  ON public.newsletter_subscriptions 
  FOR SELECT 
  USING (true);
