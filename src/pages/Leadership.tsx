
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Phone, Linkedin } from 'lucide-react';

const Leadership = () => {
  const leaders = [
    {
      name: 'Abel Yeshitila',
      position: 'CEO, Bella International Business',
      bio: 'With over 15 years of experience in strategic business development, Abel has been instrumental in establishing Bella International as a leading business conglomerate in the Horn of Africa. His visionary leadership and commitment to excellence have driven the company\'s expansion across multiple sectors.',
      expertise: ['Strategic Planning', 'Business Development', 'Market Expansion', 'Partnership Development'],
      email: 'ceo@bellainter.com',
      image: 'photo-1472099645785-5658abf4ff4e',
      hoverImage: 'photo-1560250097-0b93528c311a' // Office/at-work photo
    },
    {
      name: 'Mulugeta Demissie',
      position: 'Senior Advisor to the CEO',
      bio: 'Mulugeta brings exceptional operational expertise and has overseen the successful integration of our diverse business units. His focus on operational excellence and process optimization has been crucial to our sustained growth and market leadership.',
      expertise: ['Operations Management', 'Process Optimization', 'Quality Assurance', 'Team Leadership'],
      email: 'mulugeta@bellainter.com',
      image: 'photo-1507003211169-0a1dd7228f2d',
      hoverImage: 'photo-1521737604893-d14cc237f11d' // Conference room photo
    },
    {
      name: 'Chirotaw Assefa',
      position: 'CFO and COO, Bella International',
      bio: 'As our CFO and COO, Chirotaw has established robust financial frameworks that support our ambitious growth plans. His expertise in financial planning and risk management has been fundamental to our successful expansion across the Horn of Africa.',
      expertise: ['Financial Planning', 'Risk Management', 'Investment Strategy', 'Corporate Finance'],
      email: 'chirotaw@bellainter.com',
      image: 'photo-1519085360753-af0119f7cbe7',
      hoverImage: 'photo-1556157382-97eda2d62296' // Office workspace photo
    },
    {
      name: 'Temesgen Wubayehu',
      position: 'Managing Director, Bella Healthcare',
      bio: 'Temesgen leads our healthcare initiatives and manages all healthcare operations. His innovative approach to healthcare delivery and deep understanding of regional healthcare needs have been key to establishing Bella International\'s strong healthcare presence.',
      expertise: ['Healthcare Management', 'Medical Operations', 'Healthcare Innovation', 'Strategic Healthcare Planning'],
      email: 'temesgen@bellainter.com',
      image: 'photo-1494790108755-2616b612b786',
      hoverImage: 'photo-1559757148-5c350d0d3c56' // Healthcare facility photo
    }
  ];

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Leadership Team
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed">
              Meet the visionary leaders driving Bella International's success across the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="bg-secondary py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-marcellus text-4xl font-normal text-foreground mb-12">
              Our Team's Combined Experience
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto text-left">
              <div className="space-y-6 text-muted-foreground font-inter leading-relaxed">
                <p>
                  Bella International Business is a company with a clear vision, now operating under a new name. "Bella" comes from Latin and means beautiful, reflecting our focus on beauty within our diverse portfolio. The Bella Group encompasses import-export, agro-industry, and real estate development.
                </p>
                <p>
                  Our amazing journey started at a family-run historic coffee farm, nestled close to the place where the legendary Khaldi first discovered coffee beans. This inspired the birth of Bella International Business in 2013.
                </p>
              </div>
              <div className="space-y-6 text-muted-foreground font-inter leading-relaxed">
                <p>
                  With an initial capital of Birr 4,563,630, we delved into the world of car imports, real estate, and pharmaceutical business.
                </p>
                <p>
                  Throughout the past 13 years, we've not only garnered valuable experience but also fostered strategic alliances across multiple sectors, resulting in the creation of job opportunities for over 400 permanent and contract employees as we continue to expand our horizons. Our agro-industry not only holds economic significance but also emphasizes natural beauty, while our real estate projects prioritize both strength and beauty.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <a 
                href="/our-story"
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none transition-colors duration-200 hover-underline"
              >
                Learn More About Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Cards */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leaders.map((leader, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border bg-white animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative h-80 overflow-hidden">
                  {/* Default image */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0"
                    style={{ backgroundImage: `url(https://images.unsplash.com/${leader.image}?auto=format&fit=crop&w=600&q=80)` }}
                  />
                  {/* Hover image */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundImage: `url(https://images.unsplash.com/${leader.hoverImage}?auto=format&fit=crop&w=600&q=80)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-marcellus text-2xl font-normal mb-1">{leader.name}</h3>
                    <p className="font-inter text-sm opacity-90">{leader.position}</p>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <p className="text-muted-foreground font-inter leading-relaxed mb-6">
                    {leader.bio}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-inter font-semibold text-foreground mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-secondary text-secondary-foreground px-3 py-1 text-xs font-inter">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <a href={`mailto:${leader.email}`} className="text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Mail className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leadership;
