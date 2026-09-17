DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['business_sectors','testimonials','faqs','client_logos','announcements','media_library','page_content','content_categories','articles','leadership_profiles','site_settings'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  END LOOP;
END $$;
GRANT EXECUTE ON FUNCTION public.get_public_leadership_profiles() TO anon, authenticated;