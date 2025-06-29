
import React, { useState, useEffect } from 'react';

const DynamicHeroImage = () => {
  const images = [
    {
      placeholder: "Strategic Partnership",
      icon: "SP",
      image: "photo-1560472354-b33ff0c44a43"
    },
    {
      placeholder: "Market Leadership", 
      icon: "ML",
      image: "photo-1486406146926-c627a92ad1ab"
    },
    {
      placeholder: "Business Excellence",
      icon: "BE",
      image: "photo-1497366216548-37526070297c"
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
    <div className="relative overflow-hidden group">
      <div 
        key={currentIndex}
        className="w-full h-[600px] relative transition-all duration-1000 ease-out transform hover:scale-105"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/${currentImage.image}?auto=format&fit=crop&w=1200&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/60 transition-opacity duration-700" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 text-white transform transition-all duration-700 group-hover:scale-110">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm mx-auto flex items-center justify-center rounded-full border border-white/30 transition-all duration-500 hover:bg-white/30">
              <span className="text-white font-marcellus text-2xl">{currentImage.icon}</span>
            </div>
            <p className="text-white/90 font-inter text-sm font-medium tracking-wide">{currentImage.placeholder}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicHeroImage;
