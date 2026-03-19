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
    <section className="bg-secondary py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-2 animate-fade-in">Trusted By</p>
          <h2 className="font-marcellus text-2xl font-normal text-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>Our Strategic Partners</h2>
        </div>

        <div className="relative">
          <div className="flex animate-scroll">
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="flex-shrink-0 mx-6">
                <div className="w-40 h-24 bg-white rounded-sm shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-300 group p-4">
                  <img
                    src={`/${basePath}/${partner.file}`}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
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
