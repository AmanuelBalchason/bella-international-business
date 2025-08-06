import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useClientLogos = () => {
  return useQuery({
    queryKey: ['client-logos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_logos')
        .select(`
          *,
          logo_image:media_library(*)
        `)
        .eq('status', 'published')
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
};