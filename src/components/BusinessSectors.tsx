
import React from 'react';

const BusinessSectors = () => {
  const sectors = [
    {
      number: '01',
      title: 'Real Estate',
      description: 'Premium property development and strategic real estate investment solutions across Eastern Africa.'
    },
    {
      number: '02', 
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.'
    },
    {
      number: '03',
      title: 'Agri-Business', 
      description: 'Sustainable agricultural practices and supply chain optimization for food security.'
    },
    {
      number: '04',
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.'
    }
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Our Expertise</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight">
            Core Business Sectors
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, index) => (
            <div key={index} className="bg-white border border-border p-8 group hover:border-primary/30 transition-all duration-200">
              <div className="text-right mb-6">
                <span className="font-marcellus text-2xl text-primary">{sector.number}</span>
              </div>
              
              <h3 className="font-marcellus text-xl font-normal text-foreground mb-4">
                {sector.title}
              </h3>
              
              <p className="text-muted-foreground font-inter text-sm leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSectors;
