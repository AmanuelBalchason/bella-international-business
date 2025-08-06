import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Badge } from './ui/badge';
import type { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  index?: number;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false, index = 0 }) => {
  if (featured) {
    return (
      <Link to={`/articles/${article.slug}`}>
        <Card className="group hover:shadow-xl transition-all duration-300 border-border bg-white animate-fade-in overflow-hidden hover:-translate-y-1 cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="relative h-48 overflow-hidden">
            <div 
              className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
              style={{ backgroundImage: `url(https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=600&q=80)` }}
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">
                {article.category}
              </Badge>
            </div>
            {article.executiveSummary && (
              <div className="absolute bottom-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  <Tag className="w-3 h-3 mr-1" />
                  Executive Summary
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
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
    );
  }

  return (
    <Link to={`/articles/${article.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-white animate-fade-in hover:-translate-y-1 cursor-pointer" style={{ animationDelay: `${index * 0.1}s` }}>
        <CardContent className="p-0">
          <div className="flex">
            <div className="flex-1 p-6">
              <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-3">
                <Badge variant="secondary">
                  {article.category}
                </Badge>
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
                  <span>{article.author.name}</span>
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
  );
};