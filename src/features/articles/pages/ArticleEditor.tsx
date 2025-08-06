import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ArticleForm from '../components/ArticleForm';

const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = id !== 'new';

  // Fetch article data for editing
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!isEditing) return null;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing
  });

  // Save article mutation
  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (isEditing) {
        const { error } = await supabase
          .from('articles')
          .update({
            ...data,
            published_at: data.status === 'published' && !article?.published_at 
              ? new Date().toISOString() 
              : article?.published_at
          })
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('articles')
          .insert({
            ...data,
            published_at: data.status === 'published' 
              ? new Date().toISOString() 
              : null
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      toast({
        title: 'Success',
        description: `Article ${isEditing ? 'updated' : 'created'} successfully.`,
      });
      navigate('/admin/articles');
    },
    onError: (error: any) => {
      console.error('Save error:', error);
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} article.`,
        variant: 'destructive',
      });
    }
  });

  if (isEditing && isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/articles')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/articles')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? 'Edit Article' : 'New Article'}
          </h1>
          {isEditing && article && (
            <p className="text-muted-foreground">Editing: {article.title}</p>
          )}
        </div>
      </div>

      {/* Article Form */}
      <ArticleForm
        initialData={article || undefined}
        onSubmit={saveMutation.mutateAsync}
        isLoading={saveMutation.isPending}
      />
    </div>
  );
};

export default ArticleEditor;