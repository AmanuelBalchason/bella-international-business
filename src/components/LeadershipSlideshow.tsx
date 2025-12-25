import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StaticDotPattern from './StaticDotPattern';
import { useLeadershipProfiles } from '@/hooks/useLeadership';

const LeadershipSlideshow = () => {
  const { data: leaders, isLoading, error } = useLeadershipProfiles();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback data for when database data is not available
  const fallbackLeaders = [
    {
      id: 'fallback-1',
      name: "Leadership Team",
      job_position: "Bella International Business",
      quote: "Our success is measured by the value we bring to our employees, partners, and clients. We foster strategic partnerships based on trust, transparency, and mutual benefit.",
      bio: "Experienced leadership driving innovation and growth",
      expertise: ["Strategy", "Business Development"],
      years_experience: 20,
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profile_image_id: null,
      status: 'published'
    }
  ];

  const displayLeaders = leaders && leaders.length > 0 ? leaders : fallbackLeaders;

  useEffect(() => {
    if (displayLeaders.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayLeaders.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [displayLeaders.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayLeaders.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayLeaders.length) % displayLeaders.length);
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <StaticDotPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || displayLeaders.length === 0) {
    return (
      <section className="py-24 bg-white relative overflow-hidden">
        <StaticDotPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-marcellus text-4xl font-normal text-foreground mb-8">Leadership Team</h2>
          <p className="text-muted-foreground">Leadership information will be available soon.</p>
        </div>
      </section>
    );
  }

  const currentLeader = displayLeaders[currentIndex];
  const initials = currentLeader.name.split(' ').map(n => n[0]).join('').substring(0, 2);

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
                  backgroundImage: currentLeader.profile_image_id 
                    ? `url(/path/to/image/${currentLeader.profile_image_id})` 
                    : `url(/leaders/abel.png)`  // Changed from Unsplash to Abel's photo
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white transform transition-all duration-500 group-hover:translate-y-[-4px]">
                {/* <div className="w-16 h-16 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-full border border-white/30 mb-3">
                  <span className="text-white font-marcellus text-2xl">{initials}</span>
                </div> */}
                <p className="text-white/90 font-inter text-sm font-medium">Abel Yeshitila</p>
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
                "{currentLeader.quote || 'Leading with vision and commitment to excellence.'}"
              </blockquote>
            </div>
            
            <div className="border-t border-border pt-8 transform transition-all duration-300 hover:translate-x-1">
              <h4 className="font-inter font-semibold text-foreground text-lg mb-1 transition-colors duration-300 hover:text-primary">
                {currentLeader.name}
              </h4>
              <p className="text-muted-foreground font-inter mb-2">{currentLeader.job_position}</p>
              {currentLeader.years_experience && (
                <p className="text-sm text-muted-foreground">
                  {currentLeader.years_experience}+ years of experience
                </p>
              )}
            </div>

            {/* Navigation Controls - Only show if multiple leaders */}
            {displayLeaders.length > 1 && (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 border border-border hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-300" />
                </button>
                
                <div className="flex space-x-2">
                  {displayLeaders.map((_, index) => (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSlideshow;