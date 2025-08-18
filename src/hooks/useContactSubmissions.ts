import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateContactSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      subject?: string;
      message: string;
      form_type?: string;
      metadata?: any;
    }) => {
      const { data, error } = await supabase.functions.invoke('contact-email', {
        body: formData
      });
      
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Unknown error occurred');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
  });
};