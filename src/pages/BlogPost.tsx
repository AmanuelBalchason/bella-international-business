import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock, User, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { ExecutiveSummary } from '@/components/ExecutiveSummary';
import NewsletterForm from '@/features/newsletter/components/NewsletterForm';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_id?: string;
  published_at: string;
  read_time?: number;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
  author_id?: string;
}

interface AuthorProfile {
  id: string;
  name: string;
  position: string;
  bio?: string;
  profile_image_id?: string;
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch article
  const { data: article, isLoading } = useQuery({
    queryKey: ['blog-article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug
  });

  // Fetch author profile
  const { data: author } = useQuery({
    queryKey: ['article-author', article?.author_id],
    queryFn: async () => {
      if (!article?.author_id) return null;
      
      const { data, error } = await supabase
        .from('leadership_profiles')
        .select('*')
        .eq('id', article.author_id)
        .eq('status', 'published')
        .single();
      
      if (error) return null;
      return data as AuthorProfile;
    },
    enabled: !!article?.author_id
  });

  // Fetch related articles
  const { data: relatedArticles } = useQuery({
    queryKey: ['related-articles', article?.id, article?.tags],
    queryFn: async () => {
      if (!article) return [];
      
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, published_at, read_time, tags')
        .eq('status', 'published')
        .neq('id', article.id)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) return [];
      return data;
    },
    enabled: !!article
  });

  // Handle social sharing
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  // Extract executive summary from content (first paragraph or first 200 chars)
  const getExecutiveSummary = (content: string): string[] => {
    if (!content) return [];
    const firstParagraph = content.split('\n\n')[0];
    if (firstParagraph.length > 50) {
      return [firstParagraph];
    }
    return [content.substring(0, 200) + '...'];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="aspect-video bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  // Set document title and meta
  React.useEffect(() => {
    if (article) {
      document.title = article.seo_title || article.title;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.seo_description || article.excerpt);
      }
    }
  }, [article]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
          
          <div className="space-y-4">
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {article.read_time && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.read_time} min read
                </div>
              )}
              {author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  By {author.name}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-marcellus text-4xl lg:text-5xl font-normal text-foreground leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {article.excerpt}
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
              >
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('linkedin')}
              >
                LinkedIn
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('facebook')}
              >
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Image */}
        <div className="aspect-video bg-muted rounded-lg mb-12"></div>

        {/* Executive Summary */}
        <ExecutiveSummary points={getExecutiveSummary(article.content)} />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-foreground">
          <div className="whitespace-pre-wrap leading-relaxed">
            {article.content}
          </div>
        </div>

        {/* Author Bio */}
        {author && (
          <Card className="mt-16">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-muted rounded-full flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {author.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {author.position}
                  </p>
                  {author.bio && (
                    <p className="text-muted-foreground leading-relaxed">
                      {author.bio}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="mt-20">
            <h2 className="font-marcellus text-3xl font-normal text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="card-enhanced">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(relatedArticle.published_at).toLocaleDateString()}</span>
                      {relatedArticle.read_time && (
                        <span>{relatedArticle.read_time} min read</span>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-4"
                      onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="mt-20 bg-muted rounded-lg p-8 text-center">
          <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for more insights on business excellence and strategic partnerships.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;