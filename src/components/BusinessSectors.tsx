
import React from 'react';
import { Link } from 'react-router-dom';
import { useBusinessSectors } from '@/hooks/useBusinessSectors';
import { Skeleton } from '@/components/ui/skeleton';

const BusinessSectors = () => {
  const { data: sectors, isLoading, error } = useBusinessSectors();

  // Fallback data matching content workbook structure
  // Each sector has title (≤40 chars) and description (≤150 chars)
  const fallbackSectors = [
    {
      id: '1',
      title: 'Real Estate Development', // 23 chars (matches workbook)
      description: 'Premium property development and strategic real estate investment solutions across residential and commercial sectors.', // 146 chars
      slug: 'real-estate',
      icon_code: '01',
      sort_order: 1
    },
    {
      id: '2',
      title: 'Healthcare Solutions', // 19 chars (matches workbook)
      description: 'Comprehensive healthcare services and medical technology solutions improving access and quality of care.', // 111 chars
      slug: 'healthcare',
      icon_code: '02',
      sort_order: 2
    },
    {
      id: '3',
      title: 'Acha Forest Coffee', // 18 chars (matches workbook)
      description: 'Premium Ethiopian coffee production and export, connecting traditional farming excellence with global markets.', // 121 chars
      slug: 'acha-forest-coffee',
      icon_code: '03',
      sort_order: 3
    },
    {
      id: '4',
      title: 'Automotive Solutions', // 19 chars (matches workbook)
      description: 'Complete automotive ecosystem including sales, service, and parts distribution for leading international brands.', // 128 chars
      slug: 'automotives',
      icon_code: '04',
      sort_order: 4
    }
  ];

  const displaySectors = sectors && sectors.length > 0 ? sectors : fallbackSectors;
  const hoverColors = ['hover:bg-blue-50', 'hover:bg-green-50', 'hover:bg-amber-50', 'hover:bg-slate-50'];
  const imageIds = ['photo-1560518883-ce09059eeffa', 'photo-1576091160399-112ba8d25d1f', 'photo-1618160702438-9b02ab6515c9', 'photo-1449824913935-59a10b8d2000'];

  if (error) {
    console.error('Error loading business sectors:', error);
  }

  return (
    <section className="bg-secondary py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4 animate-fade-in">Our Expertise</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Four Pillars of Excellence
          </h2>
          <p className="text-muted-foreground font-inter text-lg leading-relaxed mt-4 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Our diversified portfolio spans critical sectors driving Ethiopia's economic transformation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white border border-border p-8">
                <div className="text-right mb-6">
                  <Skeleton className="h-8 w-12 ml-auto" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : (
            displaySectors.map((sector, index) => {
              const hoverColor = hoverColors[index % hoverColors.length];
              const imageId = imageIds[index % imageIds.length];
              const displayNumber = sector.icon_code || String(index + 1).padStart(2, '0');

              return (
                <Link 
                  key={sector.id}
                  to={`/sectors/${sector.slug}`}
                  className={`bg-white border border-border group hover:border-primary/30 hover:shadow-xl transition-all duration-500 block relative overflow-hidden transform hover:scale-105 animate-fade-in ${hoverColor}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=600&q=80)` 
                      }}
                    />
                  </div>
                  
                  <div className="relative p-8 z-10">
                    <div className="text-right mb-6 transform transition-all duration-300 group-hover:scale-110">
                      <span className="font-marcellus text-3xl text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        {displayNumber}
                      </span>
                    </div>
                    
                    <h3 className="font-inter text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-transform after:duration-300">
                      {sector.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                      {sector.description}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessSectors;
