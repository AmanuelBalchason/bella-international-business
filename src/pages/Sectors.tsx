import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';

const sectorImages: Record<string, string> = {
  'real-estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  'healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
  'acha-forest-coffee': 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
  'automotives': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0484?auto=format&fit=crop&w=800&q=80',
};

const Sectors = () => {
  const sectors = [
    { title: 'Real Estate', slug: 'real-estate', description: 'Comprehensive real estate development and property management solutions across the Horn of Africa.', details: 'From residential complexes to commercial developments, we create spaces that combine functionality with aesthetic appeal.' },
    { title: 'Healthcare', slug: 'healthcare', description: 'Leading importer and distributor of essential pharmaceuticals and medical supplies in the Ethiopian market.', details: 'We provide comprehensive pharmaceutical import and distribution solutions, including supply chain management, product sourcing, and logistics.' },
    { title: 'Acha Forest Coffee', slug: 'acha-forest-coffee', description: 'Premium coffee production and export services celebrating Ethiopia\'s rich coffee heritage.', details: 'From farm to cup, we ensure quality at every step while supporting sustainable farming practices.' },
    { title: 'Automotives', slug: 'automotives', description: 'Premier importer of vehicles and CKD parts, providing regional assembly and automotive solutions.', details: 'We specialize in comprehensive automotive import and assembly solutions, including vehicle distribution, CKD part sourcing, and local assembly operations.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero with gradient overlay */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80" 
            alt="Our Sectors" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="text-center mb-12">
            <h1 className="font-marcellus text-5xl font-normal text-white leading-tight mb-6">
              Our Sectors
            </h1>
            <p className="text-white/80 font-inter text-xl leading-relaxed max-w-3xl mx-auto">
              Discover how Bella International creates value across four key business sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-marcellus text-3xl text-white mb-2">15+</div>
              <p className="text-white/60 font-inter text-sm">Years of Growth</p>
            </div>
            <div className="text-center">
              <div className="font-marcellus text-3xl text-white mb-2">4</div>
              <p className="text-white/60 font-inter text-sm">Business Sectors</p>
            </div>
            <div className="text-center">
              <div className="font-marcellus text-3xl text-white mb-2">100+</div>
              <p className="text-white/60 font-inter text-sm">Strategic Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectors.map((sector, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border bg-card animate-fade-in overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={sectorImages[sector.slug]} 
                    alt={sector.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="font-marcellus text-2xl font-normal text-white">{sector.title}</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-muted-foreground font-inter leading-relaxed mb-4">
                    {sector.description}
                  </p>
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-6">
                    {sector.details}
                  </p>
                  <Link 
                    to={`/sectors/${sector.slug}`}
                    className="inline-flex items-center text-primary font-inter font-medium hover:text-primary/80 transition-colors duration-200 relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                  >
                    Learn More
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-marcellus text-4xl font-normal text-primary-foreground mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-primary-foreground/80 font-inter text-lg leading-relaxed mb-8">
            Join our network of strategic partners and discover opportunities across our diverse business sectors.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-white hover:bg-cape-cod-50 text-primary font-inter font-medium px-8 py-4 transition-all duration-200 hover:scale-105"
          >
            Get In Touch
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Sectors;
