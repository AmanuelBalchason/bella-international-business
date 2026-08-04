
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useInView';

const slides = [
  {
    title: 'Strategic Business Solutions',
    subtitle: 'Your premium gateway to Ethiopian market opportunities',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1920&q=80',
  },
  {
    title: 'Market Entry Excellence',
    subtitle: 'Navigate Horn of Africa markets with confidence',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  },
  {
    title: 'Trusted Business Partner',
    subtitle: '61+ years of proven success in Ethiopia',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  },
];

const stats = [
  { value: '61+', label: 'Years of Excellence' },
  { value: '4', label: 'Core Business Sectors' },
  { value: '100+', label: 'Strategic Partners' },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <section className="relative h-[88vh] min-h-[580px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 -top-24 bg-cover bg-center will-change-transform transition-opacity duration-1000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            transform: reduced ? undefined : `translateY(${Math.min(scrollY * 0.25, 240)}px) scale(1.1)`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
        <p className="font-inter text-sm uppercase tracking-[0.25em] text-background/80 mb-5">
          Bella International Business
        </p>
        <h1
          key={`t-${index}`}
          className="font-marcellus text-5xl md:text-7xl text-background leading-[1.05] max-w-4xl animate-fade-in"
        >
          {slides[index].title}
        </h1>
        <p
          key={`s-${index}`}
          className="font-inter text-lg md:text-2xl text-background/85 max-w-2xl mt-6 animate-fade-in"
        >
          {slides[index].subtitle}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/bella-healthcare">
            <Button size="lg" className="rounded-none px-8 hover:scale-105 transition-transform duration-200">
              Explore Our Impact
            </Button>
          </Link>
          <a href="#about">
            <Button
              size="lg"
              variant="outline"
              className="rounded-none px-8 bg-transparent text-background border-background/60 hover:bg-background hover:text-foreground"
            >
              Who We Are
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-background/20 max-w-3xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-marcellus text-3xl text-background mb-1">{stat.value}</div>
              <p className="text-background/70 font-inter text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-10">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-300 ${
                i === index ? 'w-10 bg-background' : 'w-5 bg-background/40 hover:bg-background/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
