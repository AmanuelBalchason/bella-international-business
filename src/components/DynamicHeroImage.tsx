
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
    }, 3000); // Changed to 3 seconds for smoother automatic slideshow

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="relative overflow-hidden group">
      <div 
        key={currentIndex}
        className="w-full h-[600px] relative transition-all duration-1000 ease-in-out transform hover:scale-105"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/${currentImage.image}?auto=format&fit=crop&w=1200&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/60 transition-opacity duration-1000" />
        

        {/* Slideshow Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicHeroImage;
