
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const articles = [
    {
      id: 1,
      title: 'The Future of Real Estate Development in Ethiopia',
      excerpt: 'Exploring emerging trends and opportunities in Ethiopian real estate markets, with focus on sustainable development practices.',
      category: 'Real Estate',
      author: 'Abel Yeshitila',
      date: '2024-01-15',
      readTime: '5 min read',
      image: 'photo-1560518883-ce09059eeffa',
      featured: true
    },
    {
      id: 2,
      title: 'Healthcare Innovation in the Horn of Africa',
      excerpt: 'How technological advancement is revolutionizing healthcare delivery across Eastern Africa.',
      category: 'Healthcare',
      author: 'Mulugeta Demissie',
      date: '2024-01-10',
      readTime: '7 min read',
      image: 'photo-1576091160399-112ba8d25d1f',
      featured: true
    },
    {
      id: 3,
      title: 'Ethiopian Coffee: From Heritage to Global Markets',
      excerpt: 'The journey of Acha Forest Coffee and sustainable farming practices in Ethiopia.',
      category: 'Coffee',
      author: 'Henok Assefa',
      date: '2024-01-05',
      readTime: '6 min read',
      image: 'photo-1447933601403-0c6688de566e',
      featured: true
    },
    {
      id: 4,
      title: 'Transportation Infrastructure Development',
      excerpt: 'Building robust automotive solutions for regional connectivity and economic growth.',
      category: 'Automotive',
      author: 'Belaynesh Kinfu',
      date: '2023-12-28',
      readTime: '4 min read',
      image: 'photo-1449824913935-59a10b8d2000',
      featured: false
    },
    {
      id: 5,
      title: 'Strategic Business Partnerships in Africa',
      excerpt: 'Lessons learned from building successful partnerships across diverse sectors.',
      category: 'Business Strategy',
      author: 'Abel Yeshitila',
      date: '2023-12-20',
      readTime: '8 min read',
      image: 'photo-1521791136064-7986c2920216',
      featured: false
    },
    {
      id: 6,
      title: 'Sustainable Development Goals in Practice',
      excerpt: 'How Bella International integrates sustainability into all business operations.',
      category: 'Sustainability',
      author: 'Mulugeta Demissie',
      date: '2023-12-15',
      readTime: '6 min read',
      image: 'photo-1441974231531-c6227db76b6e',
      featured: false
    }
  ];

  const categories = ['All', 'Real Estate', 'Healthcare', 'Coffee', 'Automotive', 'Business Strategy', 'Sustainability'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
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

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-border font-inter rounded-none"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`font-inter rounded-none ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-white border-border hover:bg-secondary'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
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
                <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 border-border bg-white animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=600&q=80)` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-inter font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-marcellus text-xl font-normal text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-inter text-xs">
                        {article.readTime}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </CardContent>
                </Card>
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
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-3">
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium">
                          {article.category}
                        </span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      
                      <h3 className="font-marcellus text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground font-inter text-xs">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                    
                    <div className="w-32 h-32 flex-shrink-0">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=200&q=80)` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
