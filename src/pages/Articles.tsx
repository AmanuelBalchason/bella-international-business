
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

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
      author: 'Temesgen Wubayehu',
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
      author: 'Chirotaw Assefa',
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
      author: 'Mulugeta Demissie',
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
      author: 'Temesgen Wubayehu',
      date: '2023-12-15',
      readTime: '6 min read',
      image: 'photo-1441974231531-c6227db76b6e',
      featured: false
    },
    {
      id: 7,
      title: 'Digital Transformation in Ethiopian Healthcare',
      excerpt: 'Implementing telemedicine and digital health solutions across rural communities.',
      category: 'Healthcare',
      author: 'Temesgen Wubayehu',
      date: '2023-12-10',
      readTime: '5 min read',
      image: 'photo-1559757148-5c350d0d3c56',
      featured: false
    },
    {
      id: 8,
      title: 'Coffee Export Markets: Opportunities and Challenges',
      excerpt: 'Analyzing global coffee trade dynamics and Ethiopian market positioning.',
      category: 'Coffee',
      author: 'Chirotaw Assefa',
      date: '2023-12-05',
      readTime: '7 min read',
      image: 'photo-1498804103079-a6351b050096',
      featured: false
    },
    {
      id: 9,
      title: 'Fleet Management Technology in East Africa',
      excerpt: 'How IoT and smart systems are revolutionizing transportation logistics.',
      category: 'Automotive',
      author: 'Mulugeta Demissie',
      date: '2023-11-28',
      readTime: '6 min read',
      image: 'photo-1550355291-bbee04a92027',
      featured: false
    },
    {
      id: 10,
      title: 'Sustainable Real Estate: Building for the Future',
      excerpt: 'Green building practices and sustainable architecture in Ethiopian construction.',
      category: 'Real Estate',
      author: 'Abel Yeshitila',
      date: '2023-11-20',
      readTime: '5 min read',
      image: 'photo-1582407947304-fd86f028f716',
      featured: false
    },
    {
      id: 11,
      title: 'Community Healthcare Initiatives in Rural Ethiopia',
      excerpt: 'Expanding healthcare access through mobile clinics and community programs.',
      category: 'Healthcare',
      author: 'Temesgen Wubayehu',
      date: '2023-11-15',
      readTime: '8 min read',
      image: 'photo-1538108149393-fbbd81895907',
      featured: false
    },
    {
      id: 12,
      title: 'The Economics of Ethiopian Coffee Production',
      excerpt: 'Understanding market dynamics, pricing, and farmer sustainability in coffee trade.',
      category: 'Coffee',
      author: 'Chirotaw Assefa',
      date: '2023-11-10',
      readTime: '9 min read',
      image: 'photo-1509042239860-f550ce710b93',
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
            {categories.map((category) => (
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
                <Link key={article.id} to={`/articles/${article.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 border-border bg-white animate-fade-in overflow-hidden hover:-translate-y-1 cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
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
                </Link>
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
              <Link key={article.id} to={`/articles/${article.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-white animate-fade-in hover:-translate-y-1 cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
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
              </Link>
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
