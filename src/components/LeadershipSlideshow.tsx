
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LeadershipSlideshow = () => {
  const leaders = [
    {
      name: "Abel Yeshitila",
      title: "CEO, Bella International Business",
      email: "ceo@bellainter.com",
      quote: "Our success is measured by the value we bring to our employees, partners, and clients. We foster strategic partnerships based on trust, transparency, and mutual benefit.",
      initials: "AY"
    },
    {
      name: "Mulugeta Demissie", 
      title: "Senior Advisor to the CEO",
      email: "mulugeta@bellainter.com",
      quote: "Innovation and strategic thinking drive our approach to business development. We continuously adapt to market changes while maintaining our core values.",
      initials: "MD"
    },
    {
      name: "Chirotaw Assefa",
      title: "CFO and COO, Bella International",
      email: "chirotaw@bellainter.com", 
      quote: "Financial excellence and operational efficiency are the foundations of sustainable growth. We ensure every investment creates lasting value.",
      initials: "CA"
    },
    {
      name: "Temesgen Wubayehu",
      title: "Managing Director, Bella Healthcare",
      email: "temesgen@bellainter.com",
      quote: "Healthcare is not just about business—it's about improving lives. Our commitment to quality healthcare drives everything we do in this sector.",
      initials: "TW"
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="w-full h-[500px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 mx-auto flex items-center justify-center">
                  <span className="text-primary font-marcellus text-3xl">{currentLeader.initials}</span>
                </div>
                <p className="text-muted-foreground font-inter text-sm">Leadership Portrait</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-8 relative">
            <div 
              key={currentIndex}
              className="animate-fade-in"
            >
              <blockquote className="font-marcellus text-2xl font-normal text-foreground leading-relaxed mb-8">
                "{currentLeader.quote}"
              </blockquote>
            </div>
            
            <div className="border-t border-border pt-8">
              <h4 className="font-inter font-semibold text-foreground text-lg">{currentLeader.name}</h4>
              <p className="text-muted-foreground font-inter mb-2">{currentLeader.title}</p>
              <p className="text-primary font-inter text-sm">{currentLeader.email}</p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 border border-border hover:border-primary/30 flex items-center justify-center transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <div className="flex space-x-2">
                {leaders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 transition-colors duration-200 ${
                      index === currentIndex ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="w-10 h-10 border border-border hover:border-primary/30 flex items-center justify-center transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSlideshow;
