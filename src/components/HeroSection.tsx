
import React from 'react';
import { Button } from './ui/button';
import AnimatedCounter from './AnimatedCounter';

const HeroSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Eastern Africa's Premier</p>
              <h1 className="font-marcellus text-5xl lg:text-6xl font-normal text-foreground leading-tight">
                Strategic Business Solutions
              </h1>
            </div>
            
            <p className="text-muted-foreground font-inter text-lg leading-relaxed max-w-lg">
              Driving excellence across Real Estate, Healthcare, Agri-Business, and Automotives through strategic partnerships built on trust, transparency, and mutual benefit.
            </p>
            
            <div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-10 py-4 rounded-none text-base">
                Explore Our Services
              </Button>
            </div>
            
            {/* Stats with animated counters */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
              <div>
                <AnimatedCounter end={15} suffix="+" delay={500} duration={1500} />
                <p className="text-muted-foreground font-inter text-sm">Years of Excellence</p>
              </div>
              <div>
                <AnimatedCounter end={4} delay={2200} duration={800} />
                <p className="text-muted-foreground font-inter text-sm">Core Business Sectors</p>
              </div>
              <div>
                <AnimatedCounter end={100} suffix="+" delay={3200} duration={2000} />
                <p className="text-muted-foreground font-inter text-sm">Strategic Partners</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Image Placeholder */}
          <div className="relative">
            <div className="w-full h-[600px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
                  <span className="text-primary font-marcellus text-2xl">B</span>
                </div>
                <p className="text-muted-foreground font-inter text-sm">Professional Business Environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
