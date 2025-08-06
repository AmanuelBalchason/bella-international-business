
import React from 'react';

const ClientLogos = () => {
  const partners = [
    { name: 'EthioTelecom', logo: 'https://via.placeholder.com/120x60/1a365d/ffffff?text=EthioTelecom' },
    { name: 'Commercial Bank of Ethiopia', logo: 'https://via.placeholder.com/120x60/2563eb/ffffff?text=CBE' },
    { name: 'Ethiopian Airlines', logo: 'https://via.placeholder.com/120x60/059669/ffffff?text=Ethiopian+Airlines' },
    { name: 'Dangote Industries', logo: 'https://via.placeholder.com/120x60/dc2626/ffffff?text=Dangote' },
    { name: 'Awash Bank', logo: 'https://via.placeholder.com/120x60/7c3aed/ffffff?text=Awash+Bank' },
    { name: 'East African Holdings', logo: 'https://via.placeholder.com/120x60/4338ca/ffffff?text=EAH' },
    { name: 'Horn Petroleum', logo: 'https://via.placeholder.com/120x60/d97706/ffffff?text=Horn+Petroleum' },
    { name: 'Midroc Group', logo: 'https://via.placeholder.com/120x60/0891b2/ffffff?text=Midroc' }
  ];

  return (
    <section className="bg-secondary py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4 animate-fade-in">Trusted By</p>
          <h2 className="font-marcellus text-3xl font-normal text-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>Our Strategic Partners</h2>
        </div>
        
        <div className="relative">
          <div className="flex animate-scroll">
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="flex-shrink-0 mx-8">
                <div className="w-32 h-20 bg-white border border-border hover:border-primary/30 hover:shadow-lg flex items-center justify-center transition-all duration-300 group transform hover:scale-110 p-2">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                  />
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
