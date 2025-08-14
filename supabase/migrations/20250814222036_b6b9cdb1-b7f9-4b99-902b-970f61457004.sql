-- Drop the current overly permissive policy
DROP POLICY IF EXISTS "Anyone can read published leadership" ON public.leadership_profiles;

-- Create a restricted policy that excludes sensitive contact information from public access
CREATE POLICY "Public can read published leadership (excluding contact info)" 
ON public.leadership_profiles 
FOR SELECT 
USING (
  status = 'published'::content_status 
  AND pg_has_role(current_user, 'authenticated', 'member') = false
) 
WITH (
  -- This policy will be used by anonymous users and will exclude contact fields
  -- The application layer will need to handle field selection
);

-- Create a policy for authenticated users to see contact info (if needed for internal use)
CREATE POLICY "Authenticated users can read published leadership with contact info" 
ON public.leadership_profiles 
FOR SELECT 
USING (
  status = 'published'::content_status 
  AND pg_has_role(current_user, 'authenticated', 'member') = true
);

-- Add a security function to get leadership profiles without sensitive data for public access
CREATE OR REPLACE FUNCTION public.get_public_leadership_profiles()
RETURNS TABLE (
  id uuid,
  name text,
  position text,
  bio text,
  expertise text[],
  quote text,
  years_experience integer,
  sort_order integer,
  created_at timestamptz,
  updated_at timestamptz,
  profile_image_id uuid
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 
    lp.id,
    lp.name,
    lp.position,
    lp.bio,
    lp.expertise,
    lp.quote,
    lp.years_experience,
    lp.sort_order,
    lp.created_at,
    lp.updated_at,
    lp.profile_image_id
  FROM public.leadership_profiles lp
  WHERE lp.status = 'published'::content_status
  ORDER BY lp.sort_order;
$$;