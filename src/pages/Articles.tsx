import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ArticleCard } from '../components/ArticleCard';
import { useArticles } from '@/hooks/useArticles';

const DEFAULT_UNSPLASH_ID = 'photo-1496180727794-817822f65950';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: articles = [], isLoading } = useArticles();

  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    (articles || []).forEach((a: any) => set.add(a.category?.name || 'Uncategorized'));
    return Array.from(set);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (articles || []).filter((a: any) => {
      const matchesSearch =
        (a.title || '').toLowerCase().includes(term) ||
        (a.excerpt || '').toLowerCase().includes(term) ||
        (Array.isArray(a.tags) ? a.tags : []).some((t: string) => t?.toLowerCase().includes(term));
      const matchesCategory = selectedCategory === 'All' || (a.category?.name || 'Uncategorized') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchTerm, selectedCategory]);

  const featuredArticles = filteredArticles.filter((a: any) => a.is_featured);
  const regularArticles = filteredArticles.filter((a: any) => !a.is_featured);

  const mapArticle = (a: any) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || '',
    category: a.category?.name || 'Uncategorized',
    date: a.published_at || a.created_at,
    author: { name: a.author?.name || 'Editorial Team' },
    readTime: a.read_time ? `${a.read_time} min read` : undefined,
    tags: Array.isArray(a.tags) ? a.tags : [],
    image: DEFAULT_UNSPLASH_ID,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero with gradient overlay */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1920&q=80" 
            alt="Articles & Insights" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-marcellus text-5xl font-normal text-white leading-tight mb-6">
              Articles & Insights
            </h1>
            <p className="text-white/80 font-inter text-xl leading-relaxed">
              Stay informed with our latest industry insights, strategic perspectives, and thought leadership.
            </p>
          </div>
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles and insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-center bg-white/95 border-border font-inter rounded-none text-lg"
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 flex-wrap animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`font-inter rounded-none transition-all duration-200 ${
                  selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-white/90 border-border hover:bg-secondary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {isLoading ? (
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {featuredArticles.length > 0 && (
            <section className="bg-secondary py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-marcellus text-3xl font-normal text-foreground mb-12 text-center">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredArticles.map((a: any, index: number) => (
                    <ArticleCard key={a.id} article={mapArticle(a)} featured index={index} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bg-card py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-marcellus text-3xl font-normal text-foreground mb-12 text-center">Latest Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularArticles.map((a: any, index: number) => (
                  <ArticleCard key={a.id} article={mapArticle(a)} index={index} />
                ))}
              </div>
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground font-inter text-lg">No articles found matching your search criteria.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Articles;
