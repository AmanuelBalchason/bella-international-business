import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import NewsletterForm from '@/features/newsletter/components/NewsletterForm';
import StaticDotPattern from '@/components/StaticDotPattern';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_id?: string;
  published_at: string;
  read_time?: number;
  tags?: string[];
  is_featured: boolean;
}

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const currentTag = searchParams.get('tag');

  const { data: articles, isLoading } = useQuery({
    queryKey: ['blog-articles', searchTerm, currentTag],
    queryFn: async () => {
      let query = supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
      }

      if (currentTag) {
        query = query.contains('tags', [currentTag]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Article[];
    }
  });

  const { data: featuredArticles } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data as Article[];
    }
  });

  const { data: allTags } = useQuery({
    queryKey: ['article-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('tags')
        .eq('status', 'published')
        .not('tags', 'is', null);
      
      if (error) throw error;
      
      const tagSet = new Set<string>();
      data?.forEach(article => {
        article.tags?.forEach(tag => tagSet.add(tag));
      });
      
      return Array.from(tagSet).sort();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag === currentTag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24 relative overflow-hidden">
        <StaticDotPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="font-marcellus text-5xl font-normal mb-6">
              Insights & Expertise
            </h1>
            <p className="font-inter text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-8">
              Discover strategic insights, industry trends, and expert perspectives 
              on business excellence across Eastern Africa.
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-background text-foreground"
              />
              <Button type="submit" variant="secondary">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h3 className="font-semibold text-foreground">Filter by topic:</h3>
            <div className="flex flex-wrap gap-2">
              {allTags?.map((tag) => (
                <Button
                  key={tag}
                  variant={currentTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagFilter(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
            {(currentTag || searchTerm) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles && featuredArticles.length > 0 && !currentTag && !searchTerm && (
          <section className="mb-16">
            <h2 className="font-marcellus text-3xl font-normal text-foreground mb-8">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="card-enhanced overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.published_at).toLocaleDateString()}
                      </div>
                      {article.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.read_time} min read
                        </div>
                      )}
                    </div>
                    <h3 className="font-marcellus text-xl font-normal text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="font-marcellus text-3xl font-normal text-foreground mb-8">
            {currentTag ? `Articles tagged with "${currentTag}"` : 
             searchTerm ? `Search results for "${searchTerm}"` : 
             'All Articles'}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-4"></div>
                    <div className="h-20 bg-muted rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="card-enhanced overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.published_at).toLocaleDateString()}
                      </div>
                      {article.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.read_time} min read
                        </div>
                      )}
                    </div>
                    <h3 className="font-marcellus text-xl font-normal text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {currentTag || searchTerm ? 'No articles found matching your criteria.' : 'No articles published yet.'}
              </p>
              {(currentTag || searchTerm) && (
                <Button onClick={clearFilters}>Clear filters</Button>
              )}
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-muted rounded-lg p-8 text-center relative overflow-hidden">
          <StaticDotPattern />
          <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">
            Stay Updated
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on business excellence, 
            strategic partnerships, and industry developments.
          </p>
          <div className="max-w-md mx-auto relative z-10">
            <NewsletterForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;