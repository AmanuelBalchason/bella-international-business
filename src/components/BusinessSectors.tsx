
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBusinessSectors } from '@/hooks/useBusinessSectors';
import { Skeleton } from '@/components/ui/skeleton';

const sectorImages = [
  'photo-1560518883-ce09059eeffa',
  'photo-1576091160399-112ba8d25d1f',
  'photo-1618160702438-9b02ab6515c9',
  'photo-1449824913935-59a10b8d2000',
];

const fallbackSectors = [
  { id: '1', title: 'Real Estate', description: 'Premium property development and strategic real estate investment solutions across Horn of Africa.', slug: 'real-estate', icon_code: '01', sort_order: 1 },
  { id: '2', title: 'Healthcare', description: 'Leading importer and distributor of essential pharmaceuticals and medical supplies in the Ethiopian market', slug: 'healthcare', icon_code: '02', sort_order: 2 },
  { id: '3', title: 'Acha Forest Coffee', description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.', slug: 'acha-forest-coffee', icon_code: '03', sort_order: 3 },
  { id: '4', title: 'Automotives', description: 'Premier importer of vehicles and CKD parts, providing regional assembly and automotive solutions.', slug: 'automotives', icon_code: '04', sort_order: 4 },
];

const BusinessSectors = () => {
  const { data: sectors, isLoading, error } = useBusinessSectors();
  const displaySectors = sectors && sectors.length > 0 ? sectors : fallbackSectors;

  if (error) console.error('Error loading business sectors:', error);

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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white border border-border">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))
          ) : (
            displaySectors.map((sector, index) => (
              <Link
                key={sector.id}
                to={`/sectors/${sector.slug}`}
                className="bg-white border border-border group hover:shadow-xl transition-all duration-500 block overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image with gradient overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/${sectorImages[index % sectorImages.length]}?auto=format&fit=crop&w=600&q=80)`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-marcellus text-xl text-white">{sector.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6">
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-4">
                    {sector.description}
                  </p>
                  <span className="inline-flex items-center text-primary font-inter text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessSectors;
