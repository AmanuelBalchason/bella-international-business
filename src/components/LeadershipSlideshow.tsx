import React from 'react';
import StaticDotPattern from './StaticDotPattern';
import abelImg from '@/assets/leader-abel.webp.asset.json';
import { useT } from '@/i18n/LanguageProvider';

const LeadershipSlideshow = () => {
  const t = useT();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <StaticDotPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - Professional Image */}
          <div className="relative overflow-hidden group">
            <div 
              className="w-full max-w-[440px] mx-auto aspect-[3/4] relative transition-all duration-700 ease-out transform hover:scale-[1.02]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${abelImg.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white transform transition-all duration-500 group-hover:translate-y-[-4px]">
                {/* <div className="w-16 h-16 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-full border border-white/30 mb-3">
                  <span className="text-white font-marcellus text-2xl">{initials}</span>
                </div> */}
                <p className="text-background/90 font-inter text-sm font-medium">Abel Yeshitila</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="space-y-8 relative">
            <div 
              className="animate-fade-in"
            >
              <blockquote className="font-marcellus text-2xl font-normal text-foreground leading-relaxed mb-8 transition-all duration-500 hover:text-primary/90">
                “{t('Our success is measured by the value we bring to our employees, partners, and clients. We foster strategic partnerships based on trust, transparency, and mutual benefit.')}”
              </blockquote>
            </div>
            
            <div className="border-t border-border pt-8 transform transition-all duration-300 hover:translate-x-1">
              <h4 className="font-inter font-semibold text-foreground text-lg mb-1 transition-colors duration-300 hover:text-primary">
                Abel Yeshitila
              </h4>
              <p className="text-muted-foreground font-inter mb-2">{t('CEO, Bella International Business')}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSlideshow;