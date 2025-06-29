
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';

const ArticleDetail = () => {
  const { id } = useParams();

  // Sample article data (in a real app, this would come from an API)
  const articles: Record<string, {
    title: string;
    content: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    excerpt: string;
  }> = {
    '1': {
      title: 'The Future of Real Estate Development in Ethiopia',
      content: `Ethiopia's real estate sector is experiencing unprecedented growth, driven by rapid urbanization and economic development. As one of Africa's fastest-growing economies, the country presents unique opportunities and challenges for developers and investors alike.

      ## Current Market Dynamics

      The Ethiopian real estate market has shown remarkable resilience despite global economic uncertainties. Key factors driving this growth include:

      - **Urban Population Growth**: With over 20% annual urban population growth, demand for housing continues to outpace supply
      - **Economic Diversification**: Government initiatives to diversify beyond agriculture are creating new commercial opportunities
      - **Infrastructure Development**: Major infrastructure projects are opening up previously inaccessible areas for development

      ## Sustainable Development Practices

      At Bella International, we believe that sustainable development is not just an option—it's a necessity. Our approach to real estate development incorporates:

      ### Environmental Considerations
      We prioritize green building practices that reduce environmental impact while providing long-term cost savings for residents and businesses. This includes the use of locally-sourced materials, energy-efficient designs, and water conservation systems.

      ### Social Impact
      Our developments are designed to strengthen communities by providing not just housing, but also spaces for commerce, education, and recreation. We work closely with local communities to ensure our projects meet their needs and respect their cultural values.

      ### Economic Sustainability
      By partnering with local contractors and suppliers, we ensure that the economic benefits of our projects stay within the communities we serve. This approach creates jobs and builds local capacity in the construction industry.

      ## Emerging Trends

      Several trends are shaping the future of Ethiopian real estate:

      1. **Mixed-Use Developments**: Combining residential, commercial, and office spaces in single complexes
      2. **Smart Building Technology**: Integration of IoT and automation systems for improved efficiency
      3. **Affordable Housing Solutions**: Innovative financing and construction methods to address the housing deficit
      4. **Green Certification**: Increasing demand for environmentally certified buildings

      ## Challenges and Opportunities

      While the opportunities are significant, developers must navigate several challenges:

      - **Regulatory Environment**: Understanding and complying with evolving building codes and regulations
      - **Financing**: Securing appropriate financing structures for large-scale development projects
      - **Infrastructure**: Coordinating with infrastructure development to ensure adequate utilities and transportation
      - **Skills Gap**: Building local capacity in modern construction techniques and project management

      ## Looking Forward

      The future of real estate development in Ethiopia is bright. With continued economic growth, urbanization, and government support for the construction sector, we expect to see continued innovation and expansion in the coming years.

      Our commitment at Bella International is to be at the forefront of this growth, delivering projects that not only meet market demand but also contribute to the sustainable development of Ethiopian communities.`,
      category: 'Real Estate',
      author: 'Abel Yeshitila',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'photo-1560518883-ce09059eeffa',
      excerpt: 'Exploring emerging trends and opportunities in Ethiopian real estate markets, with focus on sustainable development practices.'
    },
    '2': {
      title: 'Healthcare Innovation in the Horn of Africa',
      content: `The healthcare landscape in the Horn of Africa is undergoing a dramatic transformation, driven by technological innovation and strategic investments in health infrastructure. This evolution presents both unprecedented opportunities and unique challenges that require innovative solutions.

      ## The Current Healthcare Landscape

      The Horn of Africa faces significant healthcare challenges, with many rural communities lacking access to basic medical services. However, this challenge is spurring innovation and creating opportunities for transformative solutions.

      ### Key Challenges
      - **Geographic Barriers**: Vast rural areas with limited transportation infrastructure
      - **Healthcare Worker Shortage**: Insufficient numbers of trained medical professionals
      - **Resource Constraints**: Limited medical equipment and pharmaceutical supplies
      - **Disease Burden**: High prevalence of both communicable and non-communicable diseases

      ## Technological Solutions

      Innovation is key to overcoming these challenges. Several technological solutions are making significant impact:

      ### Telemedicine
      Remote consultation services are revolutionizing healthcare delivery in remote areas. Through mobile technology and satellite internet, patients can now access specialist care without traveling hundreds of kilometers.

      ### Mobile Health Applications
      Smartphone apps are being used for:
      - Health education and awareness campaigns
      - Medication reminders and adherence tracking
      - Data collection for public health initiatives
      - Emergency response coordination

      ### Diagnostic Technology
      Portable diagnostic equipment is bringing laboratory services to remote locations, enabling early detection and treatment of diseases that previously went undiagnosed.

      ## Bella International's Healthcare Initiatives

      Our approach to healthcare development focuses on creating sustainable, community-centered solutions:

      ### Infrastructure Development
      We're building modern medical facilities that serve as hubs for regional healthcare delivery. These facilities are designed to be:
      - Energy efficient with solar power backup systems
      - Equipped with telemedicine capabilities
      - Staffed by local healthcare workers we help train
      - Connected to larger hospital networks for referrals

      ### Community Health Programs
      We support community health worker programs that bring basic healthcare services directly to villages and rural communities. These programs focus on:
      - Preventive care and health education
      - Maternal and child health services
      - Chronic disease management
      - Emergency response training

      ### Public-Private Partnerships
      We work closely with government health departments, international NGOs, and other private sector partners to maximize the impact of our healthcare investments.

      ## Success Stories

      Our healthcare initiatives have already shown significant impact:

      - **Rural Clinic Network**: Established 15 rural clinics serving over 50,000 people
      - **Telemedicine Program**: Connected remote areas to specialist care, reducing patient travel by 70%
      - **Health Worker Training**: Trained over 200 community health workers
      - **Maternal Health**: Reduced maternal mortality rates by 40% in served communities

      ## Future Directions

      Looking ahead, we see several key areas for continued innovation:

      ### Artificial Intelligence
      AI-powered diagnostic tools can help address the shortage of specialized medical professionals by providing decision support for healthcare workers.

      ### Drone Technology
      Drones are being tested for medical supply delivery to remote areas, potentially revolutionizing logistics for critical medications and blood products.

      ### Electronic Health Records
      Digital health record systems will improve continuity of care and enable better health system planning and management.

      ## Sustainable Healthcare Development

      Our vision extends beyond immediate healthcare delivery to building sustainable health systems that can continue to serve communities long-term. This includes:

      - Training local medical professionals
      - Building local pharmaceutical manufacturing capacity
      - Establishing maintenance and repair capabilities for medical equipment
      - Creating financial sustainability models for ongoing operations

      The future of healthcare in the Horn of Africa is one of innovation, partnership, and hope. Through continued investment in technology and human capital, we can build health systems that truly serve the needs of all communities.`,
      category: 'Healthcare',
      author: 'Temesgen Wubayehu',
      date: '2024-01-10',
      readTime: '10 min read',
      image: 'photo-1576091160399-112ba8d25d1f',
      excerpt: 'How technological advancement is revolutionizing healthcare delivery across Eastern Africa.'
    }
  };

  const article = id ? articles[id] : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-grid-pattern">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="font-marcellus text-4xl font-normal text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground font-inter mb-8">
              The article you're looking for doesn't exist.
            </p>
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
                <span>{article.author}</span>
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
            <div 
              className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg"
              style={{ backgroundImage: `url(https://images.unsplash.com/${article.image}?auto=format&fit=crop&w=1200&q=80)` }}
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-secondary py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="prose prose-lg max-w-none font-inter text-foreground">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="font-marcellus text-3xl font-normal text-foreground mt-12 mb-6 first:mt-0">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="font-marcellus text-2xl font-normal text-foreground mt-10 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
                      {listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  const listItems = paragraph.split('\n').filter(item => item.match(/^\d+\./));
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
                      {listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.replace(/^\d+\. /, '')}</li>
                      ))}
                    </ol>
                  );
                } else {
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-marcellus text-xl font-bold">
                  {article.author.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-marcellus text-xl font-normal text-foreground mb-2">
                  {article.author}
                </h3>
                <p className="text-muted-foreground font-inter text-sm">
                  Senior {article.category} Specialist at Bella International
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
