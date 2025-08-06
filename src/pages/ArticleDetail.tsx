import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Tag, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import DOMPurify from 'dompurify';
import { allArticles } from '../data/articles';
import { ExecutiveSummary } from '../components/ExecutiveSummary';

const ArticleDetail = () => {
  const { slug } = useParams();

  const article = allArticles.find(article => article.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative">
            {/* Square Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="grid grid-cols-8 gap-2 opacity-10">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 border border-primary/20 rounded-sm animate-pulse"
                      style={{
                        animationDelay: `${(i % 8) * 0.1}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <h1 className="font-marcellus text-4xl font-normal text-foreground mb-4 relative z-10">
              Article Not Found
            </h1>
            <p className="text-muted-foreground font-inter mb-8 relative z-10">
              The article you're looking for doesn't exist.
            </p>
            <div className="relative z-10">
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
    const paragraphs = article.content.split('\n\n');
    let paragraphCount = 0;

    return paragraphs.map((paragraph, index) => {
      const elements = [];
      
      if (paragraph.startsWith('##')) {
        elements.push(
          <h2 key={`h2-${index}`} className="font-marcellus text-4xl font-normal text-foreground mt-16 mb-8 first:mt-0 leading-tight">
            {paragraph.replace(/^##\s*/, '')}
          </h2>
        );
      } else if (paragraph.startsWith('###')) {
        elements.push(
          <h3 key={`h3-${index}`} className="font-marcellus text-3xl font-normal text-foreground mt-12 mb-6 leading-tight">
            {paragraph.replace(/^###\s*/, '')}
          </h3>
        );
      } else if (paragraph.startsWith('- ')) {
        const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
        elements.push(
          <ul key={`ul-${index}`} className="space-y-4 mb-8 pl-6">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-muted-foreground leading-relaxed text-lg relative">
                <span className="absolute -left-6 top-0 text-primary font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.replace('- **', '<strong>').replace('**:', ':</strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')) }} />
              </li>
            ))}
          </ul>
        );
      } else if (paragraph.match(/^\d+\./)) {
        const listItems = paragraph.split('\n').filter(item => item.match(/^\d+\./));
        elements.push(
          <ol key={`ol-${index}`} className="space-y-4 mb-8 pl-6">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-muted-foreground leading-relaxed text-lg">
                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.replace(/^\d+\. \*\*(.*?)\*\*/, '<strong>$1</strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')) }} />
              </li>
            ))}
          </ol>
        );
      } else if (paragraph.trim()) {
        paragraphCount++;
        elements.push(
          <p key={`p-${index}`} className="text-muted-foreground leading-relaxed mb-8 text-lg font-inter">
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')) }} />
          </p>
        );

        // Add contextual imagery for certain sections
        if (paragraphCount === 3 || paragraphCount === 7 || paragraphCount === 12) {
          elements.push(
            <div key={`img-${index}`} className="my-12 animate-fade-in">
              <div className="relative overflow-hidden rounded-lg shadow-lg group">
                <img
                  src={`https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=1200&q=80&sig=${paragraphCount}`}
                  alt={`Illustration for ${article.category} content`}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-center text-muted-foreground font-inter text-sm mt-4 italic">
                {article.category} sector insights and analysis
              </p>
            </div>
          );
        }
      }
      
      return elements;
    }).flat();
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-12 animate-fade-in">
            <Link 
              to="/articles" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-inter"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </div>

          {/* Article Header */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-6">
              <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                {article.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-muted-foreground font-inter text-xl leading-relaxed mb-12">
              {article.excerpt}
            </p>

            {/* Share Button */}
            <div className="flex items-center gap-4 mb-12">
              <Button 
                variant="outline" 
                className="font-inter rounded-none border-border hover:bg-secondary"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
              <Button 
                variant="outline" 
                className="font-inter rounded-none border-border hover:bg-secondary"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Save for Later
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src={`https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=1200&q=80`}
                alt={article.title}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-secondary py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white p-12 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {article.executiveSummary && (
              <ExecutiveSummary points={article.executiveSummary} />
            )}
            <div className="prose prose-lg max-w-none">
              {renderArticleContent()}
            </div>
          </article>

          {/* Author Bio */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-marcellus text-xl font-bold">
                  {article.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-marcellus text-xl font-normal text-foreground mb-2">
                  {article.author.name}
                </h3>
                <p className="text-muted-foreground font-inter text-sm mb-1">
                  {article.author.title}
                </p>
                <p className="text-muted-foreground font-inter text-xs">
                  {article.author.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-16 flex justify-between items-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Link to="/articles">
              <Button 
                variant="outline" 
                className="font-inter rounded-none border-border hover:bg-secondary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Articles
              </Button>
            </Link>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="font-inter rounded-none border-border hover:bg-secondary"
              >
                Previous Article
              </Button>
              <Button 
                variant="outline" 
                className="font-inter rounded-none border-border hover:bg-secondary"
              >
                Next Article
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
