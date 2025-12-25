
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';

const Sectors = () => {
  const sectors = [
    {
      title: 'Real Estate',
      slug: 'real-estate',
      description: 'Comprehensive real estate development and property management solutions across the Horn of Africa.',
      details: 'From residential complexes to commercial developments, we create spaces that combine functionality with aesthetic appeal.',
      icon: 'RE'
    },
    {
      title: 'Healthcare',
      slug: 'healthcare',
      description: 'Leading importer and distributor of essential pharmaceuticals and medical supplies in the Ethiopian market.',
      details: 'We provide comprehensive pharmaceutical import and distribution solutions, including supply chain management, product sourcing, and logistics.',
      icon: 'HC'
    },
    {
      title: 'Acha Forest Coffee',
      slug: 'acha-forest-coffee',
      description: 'Premium coffee production and export services celebrating Ethiopia\'s rich coffee heritage.',
      details: 'From farm to cup, we ensure quality at every step while supporting sustainable farming practices.',
      icon: 'AC'
    },
    {
      title: 'Automotives',
      slug: 'automotives',
      description: 'Premier importer of vehicles and CKD parts, providing regional assembly and automotive solutions.',
      details: 'We specialize in comprehensive automotive import and assembly solutions, including vehicle distribution, CKD part sourcing, and local assembly operations.',
      icon: 'AU'
    }
  ];

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Our Sectors
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed max-w-3xl mx-auto">
              Discover how Bella International creates value across four key business sectors, 
              driving growth and innovation throughout the Horn of Africa.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-marcellus text-3xl text-primary mb-2">15+</div>
              <p className="text-muted-foreground font-inter text-sm">Years of Growth</p>
            </div>
            <div className="text-center">
              <div className="font-marcellus text-3xl text-primary mb-2">4</div>
              <p className="text-muted-foreground font-inter text-sm">Business Sectors</p>
            </div>
            <div className="text-center">
              <div className="font-marcellus text-3xl text-primary mb-2">100+</div>
              <p className="text-muted-foreground font-inter text-sm">Strategic Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectors.map((sector, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border bg-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-marcellus text-xl">{sector.icon}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">
                    {sector.title}
                  </h3>
                  
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
            className="inline-block bg-white hover:bg-white/90 text-primary font-inter font-medium px-8 py-4 transition-all duration-200 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent before:transition-all before:duration-500 hover:before:left-[100%] hover:scale-105"
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
