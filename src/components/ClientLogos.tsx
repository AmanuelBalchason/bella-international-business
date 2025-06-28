
import React from 'react';

const ClientLogos = () => {
  const partners = [
    'Strategic Partner 1',
    'Strategic Partner 2', 
    'Strategic Partner 3',
    'Strategic Partner 4',
    'Strategic Partner 5'
  ];

  return (
    <section className="bg-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Trusted By</p>
          <h2 className="font-marcellus text-3xl font-normal text-foreground">Our Strategic Partners</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-24 h-16 bg-white border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-200">
                <span className="text-muted-foreground font-inter text-xs text-center px-2">
                  {partner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
