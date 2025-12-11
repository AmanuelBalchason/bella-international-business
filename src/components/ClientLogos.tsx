import React from 'react';

const partners = [
  { name: 'Ethio Telecom', file: 'ethio-telecom.png' },
  { name: 'Commercial Bank of Ethiopia', file: 'commercial-bank-of-ethiopia.png' },
  { name: 'Ethiopian Airlines', file: 'ethiopian_airlines.png' },
  { name: 'Dangote Industries', file: 'dangote-industries.png' },
  { name: 'Awash Bank', file: 'awash-bank.png' },
  { name: 'East Africa Holdings', file: 'east-africa-holdings.png' },
];

export default function ClientLogos() {
  const basePath = 'partner-logos';

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
                    src={`/${basePath}/${partner.file}`}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; console.warn('ClientLogos: missing', (e.currentTarget as HTMLImageElement).src); }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
