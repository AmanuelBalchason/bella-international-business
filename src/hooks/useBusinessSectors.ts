
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useBusinessSectors = () => {
  return useQuery({
    queryKey: ['business-sectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_sectors')
        .select('*')
        .eq('status', 'published')
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useBusinessSector = (slug: string) => {
  return useQuery({
    queryKey: ['business-sector', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_sectors')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data;
    },
  });
};
