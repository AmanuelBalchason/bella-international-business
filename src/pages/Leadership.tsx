import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Linkedin, ArrowLeft, ArrowRight } from 'lucide-react';

const leaders = [
  {
    name: 'Abel Yeshitila',
    position: 'CEO, Bella International Business',
    bio: 'With over 15 years in strategic business development, Abel has been instrumental in establishing Bella International as a leading conglomerate in the Horn of Africa.',
    email: 'ceo@bellainter.com',
    linkedin: '#',
    image: '/leaders/abel.png',
  },
  {
    name: 'Mulugeta Demissie',
    position: 'Senior Advisor to the CEO',
    bio: 'Mulugeta brings exceptional operational expertise, overseeing the successful integration of our diverse business units and driving operational excellence.',
    email: 'mulugeta@bellainter.com',
    linkedin: '#',
    image: '/leaders/mulugeta.png',
  },
  {
    name: 'Chirotaw Assefa',
    position: 'COO',
    bio: 'Chirotaw has established robust financial frameworks that support our ambitious growth plans across the Horn of Africa.',
    email: 'chirotaw@bellainter.com',
    linkedin: '#',
    image: '/leaders/chirotaw.png',
  },
  {
    name: 'Temesgen Wubayehu',
    position: 'Managing Director, Bella Healthcare',
    bio: 'Temesgen leads our healthcare initiatives with an innovative approach to healthcare delivery and a deep understanding of regional needs.',
    email: 'temesgen@bellainter.com',
    linkedin: '#',
    image: '/leaders/temesgen.png',
  },
  {
    name: 'Dr. Metasebia',
    position: 'Senior Consultant',
    bio: 'Dr. Metasebia advises on clinical strategy and quality standards, bringing deep medical expertise to our healthcare portfolio.',
    email: 'info@bellainter.com',
    linkedin: '#',
    image: '/placeholder.svg',
  },
  {
    name: 'Yonas Birhanu',
    position: 'Director, Medical Equipment Division',
    bio: 'Yonas leads the medical equipment division, overseeing sourcing, installation and technical service of advanced diagnostic systems.',
    email: 'info@bellainter.com',
    linkedin: 'https://www.linkedin.com/in/yonas-b-teferi/',
    image: '/placeholder.svg',
  },
];

const stats = [
  { figure: '13+', label: 'Years of Growth' },
  { figure: '400+', label: 'Permanent & Contract Employees' },
  { figure: '3', label: 'Core Sectors' },
  { figure: '2013', label: 'Founded in Ethiopia' },
];

const Leadership = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    const delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const trackLeft = track.getBoundingClientRect().left;
      let nearest = 0;
      let min = Infinity;
      children.forEach((child, i) => {
        const childStart = child.getBoundingClientRect().left - trackLeft;
        const dist = Math.abs(childStart);
        if (dist < min) {
          min = dist;
          nearest = i;
        }
      });
      setActiveIndex(nearest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-cycle through executives
  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % leaders.length;
        scrollToIndex(next);
        return next;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, scrollToIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-white pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in">
          <p className="font-inter text-xs tracking-[0.3em] uppercase text-primary mb-6">Bella International</p>
          <h1 className="font-marcellus text-5xl md:text-6xl font-normal text-foreground leading-tight mb-6">
            Leadership Team
          </h1>
          <p className="text-muted-foreground font-inter text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Meet the visionary leaders driving Bella International's success across the Horn of Africa.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-marcellus text-3xl md:text-4xl font-normal text-foreground mb-4">
              Our Team's Combined Experience
            </h2>
            <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
              From a family-run historic coffee farm to a diversified group spanning import-export,
              agro-industry and real estate development.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-border bg-white">
            {stats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-border p-8 md:p-10 text-center">
                <div className="font-marcellus text-4xl md:text-5xl text-primary mb-3">{stat.figure}</div>
                <div className="font-inter text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="/our-story"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium text-base md:text-lg px-12 py-5 transition-colors duration-200"
            >
              Learn More About Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="bg-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-inter text-xs tracking-[0.3em] uppercase text-primary mb-4">The People</p>
            <h2 className="font-marcellus text-3xl md:text-4xl font-normal text-foreground">
              Meet the Leadership
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Previous team member"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next team member"
              onClick={() => scrollToIndex(Math.min(leaders.length - 1, activeIndex + 1))}
              className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 px-6 max-w-7xl mx-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-[380px] bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={leader.image}
                  alt={`Portrait of ${leader.name}, ${leader.position}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-marcellus text-2xl text-foreground mb-2">{leader.name}</h3>
                <p className="font-inter text-sm text-primary mb-5">{leader.position}</p>
                <p className="font-inter text-muted-foreground leading-relaxed mb-8">{leader.bio}</p>
                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <a
                    href={`mailto:${leader.email}`}
                    aria-label={`Email ${leader.name}`}
                    className="w-11 h-11 border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={leader.linkedin}
                    aria-label={`${leader.name} on LinkedIn`}
                    className="w-11 h-11 border border-border flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-4">
          {leaders.map((leader, i) => (
            <button
              key={leader.name}
              aria-label={`Go to ${leader.name}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === activeIndex ? 'w-10 bg-primary' : 'w-4 bg-border hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;
