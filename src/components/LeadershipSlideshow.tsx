
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StaticDotPattern from './StaticDotPattern';

const LeadershipSlideshow = () => {
  const leaders = [
    {
      name: "Abel Yeshitila",
      title: "CEO, Bella International Business",
      email: "ceo@bellainter.com",
      quote: "Our success is measured by the value we bring to our employees, partners, and clients. We foster strategic partnerships based on trust, transparency, and mutual benefit.",
      initials: "AY",
      image: "photo-1472099645785-5658abf4ff4e"
    },
    {
      name: "Mulugeta Demissie", 
      title: "Senior Advisor to the CEO",
      email: "mulugeta@bellainter.com",
      quote: "Innovation and strategic thinking drive our approach to business development. We continuously adapt to market changes while maintaining our core values.",
      initials: "MD",
      image: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Chirotaw Assefa",
      title: "CFO and COO, Bella International",
      email: "chirotaw@bellainter.com", 
      quote: "Financial excellence and operational efficiency are the foundations of sustainable growth. We ensure every investment creates lasting value.",
      initials: "CA",
      image: "photo-1519085360753-af0119f7cbe7"
    },
    {
      name: "Temesgen Wubayehu",
      title: "Managing Director, Bella Healthcare",
      email: "temesgen@bellainter.com",
      quote: "Healthcare is not just about business—it's about improving lives. Our commitment to quality healthcare drives everything we do in this sector.",
      initials: "TW",
      image: "photo-1494790108755-2616b612b786"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % leaders.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + leaders.length) % leaders.length);
  };

  const currentLeader = leaders[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <StaticDotPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Professional Image */}
          <div className="relative overflow-hidden group">
            <div 
              key={currentIndex}
              className="w-full h-[500px] relative transition-all duration-700 ease-out transform hover:scale-105"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ 
                  backgroundImage: `url(https://images.unsplash.com/${currentLeader.image}?auto=format&fit=crop&w=800&q=80)` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white transform transition-all duration-500 group-hover:translate-y-[-4px]">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-full border border-white/30 mb-3">
                  <span className="text-white font-marcellus text-2xl">{currentLeader.initials}</span>
                </div>
                <p className="text-white/90 font-inter text-sm font-medium">Leadership Portrait</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-8 relative">
            <div 
              key={currentIndex}
              className="animate-fade-in"
            >
              <blockquote className="font-marcellus text-2xl font-normal text-foreground leading-relaxed mb-8 transition-all duration-500 hover:text-primary/90">
                "{currentLeader.quote}"
              </blockquote>
            </div>
            
            <div className="border-t border-border pt-8 transform transition-all duration-300 hover:translate-x-1">
              <h4 className="font-inter font-semibold text-foreground text-lg mb-1 transition-colors duration-300 hover:text-primary">{currentLeader.name}</h4>
              <p className="text-muted-foreground font-inter mb-2">{currentLeader.title}</p>
              <a 
                href={`mailto:${currentLeader.email}`}
                className="text-primary font-inter text-sm hover:text-primary/80 transition-all duration-300 hover:underline"
              >
                {currentLeader.email}
              </a>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 border border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
              </button>
              
              <div className="flex space-x-2">
                {leaders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 transition-all duration-300 transform hover:scale-125 ${
                      index === currentIndex 
                        ? 'bg-primary shadow-lg' 
                        : 'bg-border hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="w-12 h-12 border border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSlideshow;
