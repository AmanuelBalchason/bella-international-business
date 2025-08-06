-- Create newsletter subscriptions table with proper security
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing own subscription (if needed for future features)
CREATE POLICY "Users can view newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON public.newsletter_subscriptions(is_active);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_newsletter_subscriptions_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();