
import React from 'react';

const ClientLogos = () => {
  const partners = [
    { name: 'EthioTelecom', logo: 'ET', color: 'text-orange-600' },
    { name: 'Commercial Bank of Ethiopia', logo: 'CBE', color: 'text-blue-600' },
    { name: 'Ethiopian Airlines', logo: 'EA', color: 'text-green-600' },
    { name: 'Dangote Industries', logo: 'DI', color: 'text-red-600' },
    { name: 'Awash Bank', logo: 'AB', color: 'text-purple-600' },
    { name: 'East African Holdings', logo: 'EAH', color: 'text-indigo-600' },
    { name: 'Horn Petroleum', logo: 'HP', color: 'text-yellow-600' },
    { name: 'Midroc Group', logo: 'MG', color: 'text-teal-600' }
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
                <div className="w-32 h-20 bg-white border border-border hover:border-primary/30 hover:shadow-lg flex items-center justify-center transition-all duration-300 group transform hover:scale-110">
                  <div className="text-center">
                    <div className={`font-marcellus ${partner.color} text-lg font-bold mb-1 group-hover:scale-110 transition-transform duration-300`}>
                      {partner.logo}
                    </div>
                    <span className="text-muted-foreground font-inter text-xs leading-tight group-hover:text-foreground transition-colors duration-300">
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
