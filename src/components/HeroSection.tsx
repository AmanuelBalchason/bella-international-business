
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';
import DynamicHero from './DynamicHero';
import DynamicHeroImage from './DynamicHeroImage';

const HeroSection = () => {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Animated Square Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20">
          <div className="grid grid-cols-12 gap-3 opacity-5">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 border border-primary/30 rounded-sm animate-pulse"
                style={{
                  animationDelay: `${(i % 12) * 0.1}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Dynamic Content */}
          <div className="space-y-8">
            <DynamicHero />
            
            <div>
              <Link to="/sectors">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-10 py-4 rounded-none text-base">
                  Explore Our Impact
                </Button>
              </Link>
            </div>
            
            {/* Stats with counters - removed bobbing effects */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
              <div>
                <div className="font-marcellus text-3xl text-primary mb-2">15+</div>
                <p className="text-muted-foreground font-inter text-sm">Years of Excellence</p>
              </div>
              <div>
                <div className="font-marcellus text-3xl text-primary mb-2">4</div>
                <p className="text-muted-foreground font-inter text-sm">Core Business Sectors</p>
              </div>
              <div>
                <div className="font-marcellus text-3xl text-primary mb-2">100+</div>
                <p className="text-muted-foreground font-inter text-sm">Strategic Partners</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Dynamic Image */}
          <DynamicHeroImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
