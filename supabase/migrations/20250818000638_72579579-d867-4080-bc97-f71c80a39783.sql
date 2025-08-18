-- Create table for event reservations
CREATE TABLE public.event_reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT,
  phone TEXT,
  industry TEXT,
  message TEXT,
  event_name TEXT DEFAULT 'Business Excellence Summit 2025',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.event_reservations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public registration)
CREATE POLICY "Anyone can create event reservations" 
ON public.event_reservations 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view all reservations
CREATE POLICY "Admins can view all event reservations" 
ON public.event_reservations 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND is_active = true 
    AND role IN ('admin', 'editor')
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_event_reservations_updated_at
BEFORE UPDATE ON public.event_reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();