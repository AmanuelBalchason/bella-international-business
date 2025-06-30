
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select(`
          *,
          sector:business_sectors(title)
        `)
        .eq('status', 'published')
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useFeaturedTestimonials = () => {
  return useQuery({
    queryKey: ['featured-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select(`
          *,
          sector:business_sectors(title)
        `)
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('sort_order')
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });
};
