
import React, { useState, useEffect } from 'react';

const DynamicHeroImage = () => {
  const images = [
    {
      placeholder: "Strategic Partnership",
      icon: "SP"
    },
    {
      placeholder: "Market Leadership", 
      icon: "ML"
    },
    {
      placeholder: "Business Excellence",
      icon: "BE"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="relative">
      <div 
        key={currentIndex}
        className="w-full h-[600px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center animate-fade-in"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
            <span className="text-primary font-marcellus text-2xl">{currentImage.icon}</span>
          </div>
          <p className="text-muted-foreground font-inter text-sm">{currentImage.placeholder}</p>
        </div>
      </div>
    </div>
  );
};

export default DynamicHeroImage;
