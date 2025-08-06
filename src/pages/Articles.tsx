
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { allArticles, articleCategories } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Articles & Insights
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed">
              Stay informed with our latest industry insights, strategic perspectives, and thought leadership across our core business sectors.
            </p>
          </div>

          {/* Search Bar - Full Width and Centered */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles and insights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-center bg-white border-border font-inter rounded-none text-lg"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 flex-wrap animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {articleCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`font-inter rounded-none transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white border-border hover:bg-secondary hover:border-primary/30'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-marcellus text-3xl font-normal text-foreground mb-12 text-center">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  featured={true} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-marcellus text-3xl font-normal text-foreground mb-12 text-center">
            Latest Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                featured={false} 
                index={index} 
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-inter text-lg">
                No articles found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Articles;
