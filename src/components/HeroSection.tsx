
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    title: "Strategic Business Solutions",
    subtitle: "Your premium gateway to Ethiopian market opportunities",
    description: "Unlock Ethiopia's potential with our comprehensive business expertise across Real Estate, Healthcare, Acha Forest Coffee, and Automotives.",
    image: "photo-1560472354-b33ff0c44a43"
  },
  {
    title: "Market Entry Excellence",
    subtitle: "Navigate Horn of Africa markets with confidence",
    description: "We provide unparalleled market intelligence and strategic partnerships to establish your presence in Ethiopia's growing economy.",
    image: "photo-1486406146926-c627a92ad1ab"
  },
  {
    title: "Trusted Business Partner",
    subtitle: "15+ years of proven success in Ethiopia",
    description: "Join 100+ strategic partners who trust us to deliver exceptional results through our research-focused approach and local expertise.",
    image: "photo-1497366216548-37526070297c"
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentIndex];

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background images */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(https://images.unsplash.com/${s.image}?auto=format&fit=crop&w=1920&q=80)`,
            opacity: i === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <p className="text-white/70 font-inter text-sm uppercase tracking-wider animate-fade-in">
            Horn of Africa's Premier
          </p>
          <h1
            key={currentIndex}
            className="font-marcellus text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight animate-fade-in"
          >
            {slide.title}
          </h1>
          <p
            key={`sub-${currentIndex}`}
            className="font-inter text-lg sm:text-xl text-white/80 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            {slide.subtitle}
          </p>
          <p
            key={`desc-${currentIndex}`}
            className="text-white/60 font-inter text-base leading-relaxed max-w-lg animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {slide.description}
          </p>

          <div className="pt-2">
            <Link to="/sectors">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-10 py-4 rounded-none text-base">
                Explore Our Impact
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 max-w-md">
            <div>
              <div className="font-marcellus text-3xl text-white mb-1">61+</div>
              <p className="text-white/60 font-inter text-xs">Years of Excellence</p>
            </div>
            <div>
              <div className="font-marcellus text-3xl text-white mb-1">4</div>
              <p className="text-white/60 font-inter text-xs">Core Business Sectors</p>
            </div>
            <div>
              <div className="font-marcellus text-3xl text-white mb-1">100+</div>
              <p className="text-white/60 font-inter text-xs">Strategic Partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
