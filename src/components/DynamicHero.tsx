
import React, { useState, useEffect } from 'react';

const DynamicHero = () => {
  // Hero content structure matching the content workbook format
  // Each set has title (≤60 chars), subtitle (≤80 chars), description (≤200 chars)
  const headlines = [
    {
      title: "Strategic Business Solutions", // 27 chars
      subtitle: "Your premium gateway to Ethiopian market opportunities", // 56 chars
      description: "Unlock Ethiopia's potential with our comprehensive business expertise across Real Estate, Healthcare, Acha Forest Coffee, and Automotives.", // 140 chars
      imagePlaceholder: "Strategic Partnership"
    },
    {
      title: "Market Entry Excellence", // 23 chars
      subtitle: "Navigate Horn of Africa markets with confidence", // 47 chars
      description: "We provide unparalleled market intelligence and strategic partnerships to establish your presence in Ethiopia's growing economy.", // 127 chars
      imagePlaceholder: "Market Leadership"
    },
    {
      title: "Trusted Business Partner", // 25 chars
      subtitle: "15+ years of proven success in Ethiopia", // 39 chars
      description: "Join 100+ strategic partners who trust us to deliver exceptional results through our research-focused approach and local expertise.", // 131 chars
      imagePlaceholder: "Business Excellence"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentHeadline = headlines[currentIndex];

  return (
    <div className="space-y-8">
      <div className="min-h-[200px]">
        <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4 opacity-0 animate-fade-in">
          Horn of Africa's Premier
        </p>
        <h1 
          key={currentIndex} 
          className="font-marcellus text-5xl lg:text-6xl font-normal text-foreground leading-tight animate-fade-in"
        >
          {currentHeadline.title}
        </h1>
        <p 
          key={`subtitle-${currentIndex}`}
          className="font-inter text-xl text-primary mt-4 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {currentHeadline.subtitle}
        </p>
      </div>
      
      <p 
        key={`desc-${currentIndex}`}
        className="text-muted-foreground font-inter text-lg leading-relaxed max-w-lg animate-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        {currentHeadline.description}
      </p>
    </div>
  );
};

export default DynamicHero;
