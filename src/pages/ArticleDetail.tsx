
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();

  // Sample article data - in a real app, this would come from an API
  const articles = [
    {
      id: 1,
      title: 'The Future of Real Estate Development in Ethiopia',
      content: `
        <p>Ethiopia's real estate sector is experiencing unprecedented growth, driven by urbanization, foreign investment, and government initiatives to modernize infrastructure. As one of Africa's fastest-growing economies, Ethiopia presents unique opportunities for sustainable development practices that balance economic growth with environmental responsibility.</p>
        
        <h2>Current Market Trends</h2>
        <p>The Ethiopian real estate market has seen significant transformation over the past decade. With a growing middle class and increasing urban population, demand for quality housing and commercial spaces continues to rise. Addis Ababa, the capital city, serves as the epicenter of this growth, with new developments reshaping the city's skyline.</p>
        
        <p>Key drivers of this growth include:</p>
        <ul>
          <li>Government housing programs aimed at addressing urban housing shortages</li>
          <li>Foreign direct investment in construction and development</li>
          <li>Improved access to financing for both developers and buyers</li>
          <li>Growing demand for modern commercial and residential spaces</li>
        </ul>
        
        <h2>Sustainable Development Practices</h2>
        <p>At Bella International, we believe that sustainable development is not just an option—it's a necessity. Our approach to real estate development incorporates green building technologies, energy-efficient systems, and environmentally conscious design principles.</p>
        
        <p>We focus on creating developments that serve the community while preserving the natural beauty of Ethiopia. This includes using locally sourced materials, implementing water conservation systems, and designing spaces that promote community interaction and well-being.</p>
        
        <h2>Future Outlook</h2>
        <p>The future of Ethiopian real estate looks promising, with continued government support for infrastructure development and growing international interest in the market. We anticipate increased focus on mixed-use developments, smart city initiatives, and sustainable construction practices.</p>
        
        <p>As we move forward, Bella International remains committed to leading by example, demonstrating that profitable development and environmental stewardship can go hand in hand.</p>
      `,
      category: 'Real Estate',
      author: 'Abel Yeshitila',
      date: '2024-01-15',
      readTime: '5 min read',
      image: 'photo-1560518883-ce09059eeffa',
      excerpt: 'Exploring emerging trends and opportunities in Ethiopian real estate markets, with focus on sustainable development practices.'
    },
    {
      id: 2,
      title: 'Healthcare Innovation in the Horn of Africa',
      content: `
        <p>The healthcare landscape in the Horn of Africa is undergoing a revolutionary transformation, driven by technological advancement, innovative delivery models, and a renewed focus on accessible, quality care for all populations.</p>
        
        <h2>Technological Revolution</h2>
        <p>Digital health solutions are breaking down traditional barriers to healthcare access across Eastern Africa. Telemedicine platforms, mobile health applications, and electronic health records are making quality healthcare more accessible to remote and underserved communities.</p>
        
        <p>Key innovations include:</p>
        <ul>
          <li>Mobile diagnostic units reaching rural communities</li>
          <li>Telemedicine consultations reducing travel barriers</li>
          <li>Digital health records improving care coordination</li>
          <li>AI-powered diagnostic tools enhancing accuracy</li>
        </ul>
        
        <h2>Community-Centered Care</h2>
        <p>At Bella Healthcare, we've pioneered community-centered care models that prioritize prevention, education, and local empowerment. Our approach recognizes that sustainable healthcare improvements require deep community engagement and culturally appropriate solutions.</p>
        
        <p>Our initiatives focus on training local healthcare workers, establishing community health centers, and creating sustainable supply chains for essential medicines and equipment.</p>
        
        <h2>Regional Impact</h2>
        <p>The impact of healthcare innovation extends beyond individual patient care. Improved health outcomes contribute to economic development, educational achievement, and overall quality of life across the region.</p>
        
        <p>We're seeing remarkable progress in maternal and child health, infectious disease management, and chronic disease prevention through these innovative approaches.</p>
      `,
      category: 'Healthcare',
      author: 'Temesgen Wubayehu',
      date: '2024-01-10',
      readTime: '7 min read',
      image: 'photo-1576091160399-112ba8d25d1f',
      excerpt: 'How technological advancement is revolutionizing healthcare delivery across Eastern Africa.'
    },
    {
      id: 3,
      title: 'Ethiopian Coffee: From Heritage to Global Markets',
      content: `
        <p>Ethiopia, the birthplace of coffee, continues to play a pivotal role in the global coffee industry. The journey from the ancient coffee forests to modern international markets represents both a celebration of heritage and an embrace of innovation.</p>
        
        <h2>The Acha Forest Legacy</h2>
        <p>Our story begins in the Acha Forest, where legend says the shepherd Kaldi first discovered coffee's energizing properties. This historical connection runs deep in our approach to coffee cultivation and trade.</p>
        
        <p>The Acha Forest Coffee project represents our commitment to:</p>
        <ul>
          <li>Preserving traditional cultivation methods</li>
          <li>Supporting local farming communities</li>
          <li>Maintaining genetic diversity of coffee varieties</li>
          <li>Promoting sustainable harvesting practices</li>
        </ul>
        
        <h2>Sustainable Farming Practices</h2>
        <p>Sustainability in coffee production goes beyond environmental considerations—it encompasses social, economic, and cultural sustainability. Our approach ensures that coffee farming remains viable for future generations while preserving the unique characteristics that make Ethiopian coffee world-renowned.</p>
        
        <p>We work directly with farmers to implement organic farming methods, improve crop yields, and establish fair trade relationships that benefit everyone in the supply chain.</p>
        
        <h2>Global Market Positioning</h2>
        <p>Ethiopian coffee commands premium prices in international markets due to its unique flavor profiles and quality. Our role is to bridge the gap between local producers and global consumers, ensuring that the value created benefits Ethiopian communities.</p>
        
        <p>Through strategic partnerships and direct trade relationships, we're building sustainable pathways for Ethiopian coffee to reach discerning consumers worldwide while maintaining the authenticity and quality that makes it special.</p>
      `,
      category: 'Coffee',
      author: 'Chirotaw Assefa',
      date: '2024-01-05',
      readTime: '6 min read',
      image: 'photo-1447933601403-0c6688de566e',
      excerpt: 'The journey of Acha Forest Coffee and sustainable farming practices in Ethiopia.'
    }
  ];

  const article = articles.find(a => a.id === parseInt(id || '1'));

  if (!article) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-marcellus text-4xl font-normal text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/articles">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none">
                Back to Articles
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=1200&q=80)` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="text-white animate-fade-in">
              <span className="bg-primary text-primary-foreground px-3 py-1 text-sm font-inter font-medium mb-4 inline-block">
                {article.category}
              </span>
              <h1 className="font-marcellus text-4xl md:text-5xl font-normal leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-white/80 font-inter text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation & Actions */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-border animate-fade-in">
            <Link to="/articles" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 hover-underline">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-inter text-sm">Back to Articles</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="rounded-none border-border">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="rounded-none border-border">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div 
              className="font-inter leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.8',
              }}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-8 bg-secondary border border-border animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-marcellus text-xl font-bold">
                  {article.author.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-marcellus text-xl font-normal text-foreground">{article.author}</h3>
                <p className="text-muted-foreground font-inter text-sm">
                  {article.category === 'Real Estate' ? 'CEO, Bella International Business' :
                   article.category === 'Healthcare' ? 'Managing Director, Bella Healthcare' :
                   'CFO and COO, Bella International'}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground font-inter leading-relaxed">
              {article.category === 'Real Estate' 
                ? 'With over 15 years of experience in strategic business development, Abel has been instrumental in establishing Bella International as a leading business conglomerate in the Horn of Africa.'
                : article.category === 'Healthcare'
                ? 'Temesgen leads our healthcare initiatives and manages all healthcare operations with innovative approaches to healthcare delivery.'
                : 'As our CFO and COO, Chirotaw has established robust financial frameworks that support our ambitious growth plans across multiple sectors.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-marcellus text-3xl font-normal text-foreground mb-12 text-center animate-fade-in">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.filter(a => a.id !== article.id).slice(0, 3).map((relatedArticle, index) => (
              <Link 
                key={relatedArticle.id} 
                to={`/articles/${relatedArticle.id}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(https://images.unsplash.com/${relatedArticle.image}?auto=format&fit=crop&w=600&q=80)` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-inter font-medium">
                        {relatedArticle.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-muted-foreground font-inter text-sm mb-3">
                      <span>{new Date(relatedArticle.date).toLocaleDateString()}</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                    <h3 className="font-marcellus text-lg font-normal text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
