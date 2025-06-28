
import React from 'react';

const ClientLogos = () => {
  const partners = [
    'Strategic Partner 1',
    'Strategic Partner 2', 
    'Strategic Partner 3',
    'Strategic Partner 4',
    'Strategic Partner 5',
    'Strategic Partner 6',
    'Strategic Partner 7',
    'Strategic Partner 8'
  ];

  return (
    <section className="bg-secondary py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Trusted By</p>
          <h2 className="font-marcellus text-3xl font-normal text-foreground">Our Strategic Partners</h2>
        </div>
        
        <div className="relative">
          <div className="flex animate-scroll">
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <div className="w-32 h-20 bg-white border border-border flex items-center justify-center hover:border-primary/30 transition-colors duration-200">
                  <span className="text-muted-foreground font-inter text-xs text-center px-2">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
