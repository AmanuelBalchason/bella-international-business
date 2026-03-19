import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import DOMPurify from 'dompurify';
import { ExecutiveSummary } from '../components/ExecutiveSummary';
import { useArticleBySlug } from '@/hooks/useArticles';

const DEFAULT_UNSPLASH_ID = 'photo-1496180727794-817822f65950';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { data: article, isLoading } = useArticleBySlug(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative">
            <h1 className="font-marcellus text-4xl font-normal text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground font-inter mb-8">The article you're looking for doesn't exist.</p>
            <div>
              <Link to="/articles">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none">
                  Back to Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderArticleContent = () => {
    const paragraphs = (article.content || '').split('\n\n');
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('##')) {
        return (
          <h2 key={`h2-${index}`} className="font-marcellus text-4xl font-normal text-foreground mt-16 mb-8 first:mt-0 leading-tight">
            {paragraph.replace(/^##\s*/, '')}
          </h2>
        );
      } else if (paragraph.startsWith('###')) {
        return (
          <h3 key={`h3-${index}`} className="font-marcellus text-3xl font-normal text-foreground mt-12 mb-6 leading-tight">
            {paragraph.replace(/^###\s*/, '')}
          </h3>
        );
      } else if (paragraph.startsWith('- ')) {
        const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
        return (
          <ul key={`ul-${index}`} className="space-y-4 mb-8 pl-6">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-muted-foreground leading-relaxed text-lg relative">
                <span className="absolute -left-6 top-0 text-primary font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.replace('- **', '<strong>').replace('**:', ':</strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')) }} />
              </li>
            ))}
          </ul>
        );
      } else if (/^\d+\./.test(paragraph)) {
        const listItems = paragraph.split('\n').filter(item => /^\d+\./.test(item));
        return (
          <ol key={`ol-${index}`} className="space-y-4 mb-8 pl-6">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-muted-foreground leading-relaxed text-lg">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.replace(/^\d+\. \*\*(.*?)\*\*/, '<strong>$1</strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')) }} />
              </li>
            ))}
          </ol>
        );
      } else if (paragraph.trim()) {
        return (
          <p key={`p-${index}`} className="text-muted-foreground leading-relaxed mb-8 text-lg font-inter">
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class=\"text-foreground font-semibold\">$1</strong>')) }} />
          </p>
        );
      }
      return null;
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-fade-in">
            <Link to="/articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-inter">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-6">
              <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                {article.category?.name || 'Uncategorized'}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author?.name || 'Editorial Team'}</span>
              </div>
              {article.read_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.read_time} min read</span>
                </div>
              )}
            </div>
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">{article.title}</h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed mb-12">{article.excerpt}</p>
            <div className="flex items-center gap-4 mb-12">
              <Button variant="outline" className="font-inter rounded-none border-border hover:bg-secondary">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
              <Button variant="outline" className="font-inter rounded-none border-border hover:bg-secondary">
                <BookOpen className="w-4 h-4 mr-2" />
                Save for Later
              </Button>
            </div>
          </div>
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={`https://images.unsplash.com/${DEFAULT_UNSPLASH_ID}?auto=format&fit=crop&w=1200&q=80`}
                alt={article.title}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-secondary py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white p-12 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {Array.isArray(article.tags) && article.tags.length > 0 && (
              <div className="mb-6 flex gap-2 flex-wrap">
                {article.tags.map((t: string) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            )}
            <div className="prose prose-lg max-w-none">{renderArticleContent()}</div>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
