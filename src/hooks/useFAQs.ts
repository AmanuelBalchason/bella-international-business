
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useFAQs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select(`
          *,
          category:content_categories(name)
        `)
        .eq('status', 'published')
        .order('sort_order');
      
      if (error) throw error;
      return data;
    },
  });
};
