
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Sectors = () => {
  const sectors = [
    {
      number: '01',
      title: 'Real Estate',
      description: 'Premium property development and strategic real estate investment solutions across Eastern Africa.',
      slug: 'real-estate',
      details: 'Our real estate division focuses on developing premium properties that meet international standards while addressing local market needs.'
    },
    {
      number: '02', 
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.',
      slug: 'healthcare',
      details: 'We provide comprehensive healthcare solutions including medical facility management and healthcare service delivery.'
    },
    {
      number: '03',
      title: 'Agri-Business', 
      description: 'Sustainable agricultural practices and supply chain optimization for food security.',
      slug: 'agri-business',
      details: 'Our agri-business operations focus on sustainable practices and innovative supply chain solutions for enhanced food security.'
    },
    {
      number: '04',
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.',
      slug: 'automotives',
      details: 'We offer comprehensive automotive services including fleet management and transportation infrastructure development.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Our Expertise</p>
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Business Sectors
            </h1>
            <p className="text-muted-foreground font-inter text-lg max-w-3xl mx-auto">
              Bella International operates across four core business sectors, delivering excellence and innovation in each area.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sectors.map((sector, index) => (
              <Link 
                key={index} 
                to={`/sectors/${sector.slug}`}
                className="bg-secondary border border-border p-8 group hover:border-primary/30 transition-all duration-200 block"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-marcellus text-4xl text-primary">{sector.number}</span>
                </div>
                
                <h2 className="font-marcellus text-2xl font-normal text-foreground mb-4">
                  {sector.title}
                </h2>
                
                <p className="text-muted-foreground font-inter text-base leading-relaxed mb-4">
                  {sector.description}
                </p>
                
                <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                  {sector.details}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Sectors;
