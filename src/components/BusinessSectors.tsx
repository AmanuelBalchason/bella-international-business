
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BusinessSectors = () => {
  const sectors = [
    {
      number: '01',
      title: 'Real Estate',
      description: 'Premium property development and strategic real estate investment solutions across Horn of Africa.',
      slug: 'real-estate',
      image: 'photo-1560518883-ce09059eeffa',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      number: '02', 
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.',
      slug: 'healthcare',
      image: 'photo-1576091160399-112ba8d25d1f',
      hoverColor: 'hover:bg-green-50'
    },
    {
      number: '03',
      title: 'Acha Forest Coffee', 
      description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.',
      slug: 'acha-forest-coffee',
      image: 'photo-1618160702438-9b02ab6515c9',
      hoverColor: 'hover:bg-amber-50'
    },
    {
      number: '04',
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.',
      slug: 'automotives',
      image: 'photo-1449824913935-59a10b8d2000',
      hoverColor: 'hover:bg-slate-50'
    }
  ];

  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4 animate-fade-in">Our Expertise</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Core Business Sectors
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, index) => (
            <Link 
              key={index} 
              to={`/sectors/${sector.slug}`}
              className={`bg-white border border-border group hover:border-primary/30 hover:shadow-xl transition-all duration-500 block relative overflow-hidden transform hover:scale-105 animate-fade-in ${sector.hoverColor}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(https://images.unsplash.com/${sector.image}?auto=format&fit=crop&w=600&q=80)` 
                  }}
                />
              </div>
              
              <div className="relative p-8 z-10">
                <div className="text-right mb-6 transform transition-all duration-300 group-hover:scale-110">
                  <span className="font-marcellus text-3xl text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300">{sector.number}</span>
                </div>
                
                <h3 className="font-inter text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {sector.title}
                </h3>
                
                <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                  {sector.description}
                </p>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSectors;
