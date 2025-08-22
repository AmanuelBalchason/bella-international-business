-- Fix security issue: Restrict SELECT access to contact_submissions table to admin users only
-- This ensures customer contact information cannot be accessed by unauthorized users

-- Drop the existing broad "ALL" policy for admin users and replace with specific policies
DROP POLICY IF EXISTS "Admin users can manage contact submissions" ON public.contact_submissions;

-- Create specific policies for each operation type to be more secure and explicit

-- Admin users can SELECT (read) contact submissions
CREATE POLICY "Admin users can read contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (is_admin());

-- Admin users can INSERT contact submissions (though they typically won't need this)
CREATE POLICY "Admin users can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (is_admin());

-- Admin users can UPDATE contact submissions (for managing status, notes, etc.)
CREATE POLICY "Admin users can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

-- Admin users can DELETE contact submissions
CREATE POLICY "Admin users can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (is_admin());

-- The existing "Anyone can create contact submissions" policy remains unchanged
-- This allows public users to submit contact forms but not read any data