
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const AnimatedAboutSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // Core values structure matching content workbook format
  // Each value has title (≤30 chars) and description (≤150 chars)
  const values = [
    {
      title: 'Research-Driven Excellence', // 26 chars (matches workbook)
      description: 'Our comprehensive research methodology ensures informed decision-making and strategic market positioning for sustainable success.' // 142 chars
    },
    {
      title: 'Strategic Partnership', // 20 chars (matches workbook)
      description: 'We build lasting relationships that transcend traditional business boundaries, creating value through collaborative innovation.' // 136 chars
    },
    {
      title: 'Local Market Mastery', // 20 chars (matches workbook)
      description: 'Deep understanding of Ethiopian and regional markets enables us to navigate complexities and unlock unique opportunities.' // 122 chars
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleItems([0]), 500);
    const timer2 = setTimeout(() => setVisibleItems([0, 1]), 1000);
    const timer3 = setTimeout(() => setVisibleItems([0, 1, 2]), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">About Us</p>
              <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight mb-6">
                Driving Growth Across Eastern Africa
              </h2>
              <p className="text-muted-foreground font-inter text-lg leading-relaxed">
                We are the premier business solutions provider in the Horn of Africa, connecting global opportunities with local expertise across four dynamic sectors.
              </p>
            </div>
            
            <div>
              <Link to="/our-story">
                <Button 
                  variant="outline" 
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background font-inter font-medium px-8 py-3 rounded-none"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right side - Animated Values */}
          <div className="space-y-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`flex items-start space-x-6 group transition-all duration-500 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                  <span className="text-primary font-marcellus text-lg">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-inter font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground font-inter leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedAboutSection;
