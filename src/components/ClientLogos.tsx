
import React from 'react';

const ClientLogos = () => {
  const partners = [
    { name: 'EthioTelecom', logo: 'ET' },
    { name: 'Commercial Bank of Ethiopia', logo: 'CBE' },
    { name: 'Ethiopian Airlines', logo: 'EA' },
    { name: 'Dangote Industries', logo: 'DI' },
    { name: 'Awash Bank', logo: 'AB' },
    { name: 'East African Holdings', logo: 'EAH' },
    { name: 'Horn Petroleum', logo: 'HP' },
    { name: 'Midroc Group', logo: 'MG' }
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
                <div className="w-32 h-20 bg-white border border-border flex items-center justify-center transition-colors duration-200 group">
                  <div className="text-center">
                    <div className="font-marcellus text-primary text-lg font-bold mb-1">{partner.logo}</div>
                    <span className="text-muted-foreground font-inter text-xs leading-tight">
                      {partner.name}
                    </span>
                  </div>
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
