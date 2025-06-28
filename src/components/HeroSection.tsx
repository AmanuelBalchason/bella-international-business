
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';
import DynamicHero from './DynamicHero';
import DynamicHeroImage from './DynamicHeroImage';

const HeroSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            {/* Stats with animated counters - synchronized timing */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
              <div>
                <AnimatedCounter end={15} suffix="+" delay={200} duration={2000} />
                <p className="text-muted-foreground font-inter text-sm">Years of Excellence</p>
              </div>
              <div>
                <AnimatedCounter end={4} delay={200} duration={2000} />
                <p className="text-muted-foreground font-inter text-sm">Core Business Sectors</p>
              </div>
              <div>
                <AnimatedCounter end={100} suffix="+" delay={200} duration={2000} />
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
