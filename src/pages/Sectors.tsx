
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Sectors = () => {
  const sectors = [
    {
      number: '01',
      title: 'Real Estate',
      description: 'Premium property development and strategic real estate investment solutions across Horn of Africa.',
      slug: 'real-estate',
      details: 'Our real estate division focuses on developing premium properties that meet international standards while addressing local market needs.',
      stats: { projects: '25+', value: '$50M+', locations: '5' }
    },
    {
      number: '02', 
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.',
      slug: 'healthcare',
      details: 'We provide comprehensive healthcare solutions including medical facility management and healthcare service delivery.',
      stats: { facilities: '12', patients: '10K+', specialists: '50+' }
    },
    {
      number: '03',
      title: 'Acha Forest Coffee', 
      description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.',
      slug: 'acha-forest-coffee',
      details: 'Our coffee operations focus on sustainable practices and innovative supply chain solutions for premium Ethiopian coffee.',
      stats: { farms: '8', tons: '500+', export: '15 Countries' }
    },
    {
      number: '04',
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.',
      slug: 'automotives',
      details: 'We offer comprehensive automotive services including fleet management and transportation infrastructure development.',
      stats: { vehicles: '200+', routes: '25', clients: '80+' }
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Our Expertise</p>
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Business Sectors
            </h1>
            <p className="text-muted-foreground font-inter text-lg max-w-3xl mx-auto">
              Bella International operates across four core business sectors, delivering excellence and innovation in each area across the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-marcellus text-4xl text-primary mb-2">15+</div>
              <p className="text-muted-foreground font-inter text-sm">Years of Experience</p>
            </div>
            <div>
              <div className="font-marcellus text-4xl text-primary mb-2">4</div>
              <p className="text-muted-foreground font-inter text-sm">Core Sectors</p>
            </div>
            <div>
              <div className="font-marcellus text-4xl text-primary mb-2">100+</div>
              <p className="text-muted-foreground font-inter text-sm">Strategic Partners</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sectors Grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sectors.map((sector, index) => (
              <div 
                key={index} 
                className="bg-white border border-border group hover:border-primary/30 transition-all duration-200"
              >
                {/* Image Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 mx-auto flex items-center justify-center mb-3">
                      <span className="text-primary font-marcellus text-xl">{sector.number}</span>
                    </div>
                    <p className="text-muted-foreground font-inter text-sm">{sector.title} Operations</p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-marcellus text-3xl text-primary">{sector.number}</span>
                  </div>
                  
                  <h2 className="font-marcellus text-2xl font-normal text-foreground mb-4">
                    {sector.title}
                  </h2>
                  
                  <p className="text-muted-foreground font-inter text-base leading-relaxed mb-4">
                    {sector.description}
                  </p>
                  
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6">
                    {sector.details}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(sector.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-marcellus text-lg text-primary">{value}</div>
                        <p className="text-muted-foreground font-inter text-xs capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={`/sectors/${sector.slug}`}
                    className="inline-block bg-primary text-primary-foreground font-inter font-medium px-6 py-3 rounded-none hover:bg-primary/90 transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Sectors;
