import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Linkedin } from 'lucide-react';

const Leadership = () => {
  const leaders = [
    {
      name: 'Abel Yeshitila',
      position: 'CEO, Bella International Business',
      bio: 'With over 15 years of experience in strategic business development, Abel has been instrumental in establishing Bella International as a leading business conglomerate in the Horn of Africa.',
      expertise: ['Strategic Planning', 'Business Development', 'Market Expansion', 'Partnership Development'],
      email: 'ceo@bellainter.com',
      image: '/leaders/abel.png',
    },
    {
      name: 'Mulugeta Demissie',
      position: 'Senior Advisor to the CEO',
      bio: 'Mulugeta brings exceptional operational expertise and has overseen the successful integration of our diverse business units.',
      expertise: ['Operations Management', 'Process Optimization', 'Quality Assurance', 'Team Leadership'],
      email: 'mulugeta@bellainter.com',
      image: '/leaders/mulugeta.png',
    },
    {
      name: 'Chirotaw Assefa',
      position: 'CFO and COO, Bella International',
      bio: 'As our CFO and COO, Chirotaw has established robust financial frameworks that support our ambitious growth plans.',
      expertise: ['Financial Planning', 'Risk Management', 'Investment Strategy', 'Corporate Finance'],
      email: 'chirotaw@bellainter.com',
      image: '/leaders/chirotaw.png',
    },
    {
      name: 'Temesgen Wubayehu',
      position: 'Managing Director, Bella Healthcare',
      bio: 'Temesgen leads our healthcare initiatives and manages all healthcare operations with an innovative approach.',
      expertise: ['Healthcare Management', 'Medical Operations', 'Healthcare Innovation', 'Strategic Healthcare Planning'],
      email: 'temesgen@bellainter.com',
      image: '/leaders/temesgen.png',
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero with gradient overlay */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80" 
            alt="Leadership Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="font-marcellus text-5xl font-normal text-white leading-tight mb-6">
              Leadership Team
            </h1>
            <p className="text-white/80 font-inter text-xl leading-relaxed">
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
                  Bella International Business is a company with a clear vision, now operating under a new name. "Bella" comes from Latin and means beautiful, reflecting our focus on beauty within our diverse portfolio.
                </p>
                <p>
                  Our amazing journey started at a family-run historic coffee farm, nestled close to the place where the legendary Khaldi first discovered coffee beans.
                </p>
              </div>
              <div className="space-y-6 text-muted-foreground font-inter leading-relaxed">
                <p>
                  With an initial capital of Birr 4,563,630, we delved into the world of car imports, real estate, and pharmaceutical business.
                </p>
                <p>
                  Throughout the past 13 years, we've not only garnered valuable experience but also fostered strategic alliances across multiple sectors, resulting in the creation of job opportunities for over 400 permanent and contract employees.
                </p>
              </div>
            </div>
            <div className="mt-12">
              <a 
                href="/our-story"
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none transition-colors duration-200"
              >
                Learn More About Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Cards */}
      <section className="bg-card py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leaders.map((leader, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border bg-card animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative h-80 overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${leader.image})` }}
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
