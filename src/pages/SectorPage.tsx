import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import SectorCarousel from '../components/SectorCarousel';
import InteractiveDotPattern from '../components/InteractiveDotPattern';
import VideoShowcaseCarousel from '../components/VideoShowcaseCarousel';
import ProcessCarousel from '../components/ProcessCarousel';
import { Calendar, Mail, Phone, Send, Play, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sector, sectorList } from '@/data/sectors';
import { usePrefersReducedMotion } from '@/hooks/useInView';
import { useT } from '@/i18n/LanguageProvider';

interface SectorPageProps {
  sector: Sector;
}

const SectorPage = ({ sector }: SectorPageProps) => {
  const t = useT();
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    inquiryType: '',
  });
  const [scrollY, setScrollY] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [nextProgress, setNextProgress] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();
  const heroSlides =
    sector.heroSlides ??
    (sector.heroImages ?? [sector.heroImage]).map((image) => ({ image, title: '', body: sector.tagline }));

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setHeroIndex(0);
    setStepIndex(0);
  }, [sector.slug]);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setNextProgress(Math.max(0, Math.min(1, (700 - remaining) / 700)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sectorIndex = sectorList.findIndex((item) => item.slug === sector.slug);
  const nextSector = sectorIndex >= 0 ? sectorList[sectorIndex + 1] : undefined;

  useEffect(() => {
    if (!nextSector) return;
    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStartY.current;
      const end = event.changedTouches[0]?.clientY;
      touchStartY.current = null;
      const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      if (start !== null && end !== undefined && start - end > 90 && remaining < 8 && window.matchMedia('(max-width: 767px)').matches) {
        navigate(nextSector.path);
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [navigate, nextSector]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactForm({ name: '', email: '', company: '', message: '', inquiryType: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${sector.title} | Bella International Business`}
        description={sector.tagline}
        path={sector.path}
      />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[620px] h-[85vh] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 -top-24 bg-cover bg-center will-change-transform transition-opacity duration-1000 ${
              i === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: reduced ? undefined : `translateY(${Math.min(scrollY * 0.25, 240)}px) scale(1.1)`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-20">
          <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.25em] text-background/80 mb-4 sm:mb-5 animate-fade-in">
            {t('Bella International Business')}
          </p>
          <h1 className="font-marcellus text-4xl sm:text-5xl md:text-7xl text-background leading-[1.05] max-w-4xl animate-fade-in">
             {t(sector.title)}
          </h1>
          {heroSlides[heroIndex]?.title && (
            <p
              key={`ht-${heroIndex}`}
              className="font-inter text-xs sm:text-sm uppercase tracking-[0.22em] text-background/70 mt-5 animate-fade-in"
            >
               {t(heroSlides[heroIndex].title)}
            </p>
          )}
          <p
            key={`hb-${heroIndex}`}
            className="font-inter text-base sm:text-lg md:text-2xl text-background/85 max-w-2xl mt-3 sm:mt-4 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
             {t(heroSlides[heroIndex]?.body ?? sector.tagline)}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#sector-contact">
              <Button size="lg" className="rounded-none px-6 sm:px-8 hover:scale-105 transition-transform duration-200">
                 {t('Start a Conversation')}
              </Button>
            </a>
            <a href="#sector-overview">
              <Button
                size="lg"
                variant="outline"
                className="rounded-none px-6 sm:px-8 bg-transparent text-background border-background/60 hover:bg-background hover:text-foreground"
              >
                 {t('Explore the Sector')}
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {heroSlides.length > 1 && (
            <div className="flex gap-2 mt-8 sm:mt-10">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.image}
                  aria-label={`Show hero slide ${i + 1}`}
                  onClick={() => setHeroIndex(i)}
                  className={`h-1 transition-all duration-300 ${
                    i === heroIndex ? 'w-10 bg-background' : 'w-5 bg-background/40 hover:bg-background/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {Object.entries(sector.stats).map(([key, value], index) => (
            <Reveal key={key} delay={index * 120} className="text-center sm:text-left">
              <CountUp value={value} className="font-marcellus text-4xl md:text-5xl block mb-2" />
               <p className="font-inter text-sm uppercase tracking-wider text-primary-foreground/70 capitalize">{t(key)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Overview */}
      {sector.partnerStrip && (
        <section className="border-b border-border py-12 overflow-hidden">
          <p className="font-inter text-xs uppercase tracking-[0.25em] text-muted-foreground text-center mb-8">
             {t('Trusted Partners & Institutions Served')}
          </p>
          <div className="marquee-mask">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                  {sector.partnerStrip!.flatMap((group) =>
                    group.names.map((name) => (
                      <span
                        key={`${copy}-${group.label}-${name}`}
                        className="font-marcellus text-xl md:text-2xl text-muted-foreground/60 hover:text-primary transition-colors duration-300 whitespace-nowrap px-8 md:px-12"
                      >
                        {name}
                      </span>
                    )),
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="sector-overview" className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
        <InteractiveDotPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <Reveal className={sector.videoFiles ? 'lg:col-span-5' : 'lg:col-span-5'}>
             <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">{t('Overview')}</p>
            <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground leading-tight">
               {t(sector.overviewHeading ?? sector.description)}
            </h2>
            {sector.videoFiles && (
              <p className="font-inter text-base sm:text-lg text-muted-foreground leading-relaxed mt-6">
                 {t(sector.content)}
              </p>
            )}
          </Reveal>
          {sector.videoFiles ? (
            <Reveal delay={140} className="lg:col-span-7">
              <VideoShowcaseCarousel videos={sector.videoFiles} />
            </Reveal>
          ) : (
            <Reveal delay={140} className="lg:col-span-7">
               <p className="font-inter text-lg text-muted-foreground leading-relaxed">{t(sector.content)}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Gallery carousel */}
      <section className="bg-secondary py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">
               {t(sector.solutions ? 'What We Offer' : 'In Focus')}
            </p>
            <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground">
               {sector.solutions ? t('Comprehensive Healthcare Solutions') : `${t('Inside')} ${t(sector.title)}`}
            </h2>
          </Reveal>
          {sector.solutions ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sector.solutions.map((solution, index) => (
                <Reveal key={solution.title} delay={index * 100}>
                  <div className="h-full bg-card border border-border p-8 md:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <span className="font-marcellus text-3xl text-primary/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                     <h3 className="font-marcellus text-2xl text-foreground mt-5 mb-3">{t(solution.title)}</h3>
                     <p className="font-inter text-muted-foreground leading-relaxed">{t(solution.description)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={120}>
              <SectorCarousel images={sector.images} />
            </Reveal>
          )}
        </div>
      </section>

      {/* Bella Advantage */}
      {sector.advantages && (
        <section className="py-20 sm:py-28 relative overflow-hidden">
          <InteractiveDotPattern />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-12 sm:mb-14">
               <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">{t('Why Partner With Us')}</p>
               <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground">{t('The Bella Advantage')}</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sector.advantages.map((advantage, index) => (
                <Reveal key={advantage.title} delay={index * 120}>
                  <div className="h-full border-t-2 border-primary bg-card p-8 md:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                     <h3 className="font-marcellus text-2xl text-foreground mb-4">{t(advantage.title)}</h3>
                     <p className="font-inter text-muted-foreground leading-relaxed">{t(advantage.description)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process timeline */}
      <section className="bg-secondary py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 sm:mb-14">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
               <Calendar className="w-4 h-4" /> {t('How We Partner')}
            </p>
             <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground">{t('How We Partner')}</h2>
          </Reveal>
          {sector.processSteps.length > 4 ? (
            <Reveal>
              <ProcessCarousel steps={sector.processSteps} />
            </Reveal>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sector.processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 120}>
                <div className="h-full bg-card border border-border p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="font-marcellus text-3xl text-primary/50">{String(index + 1).padStart(2, '0')}</span>
                   <h3 className="font-inter text-lg font-semibold text-foreground mt-6 mb-3">{t(step.step)}</h3>
                   <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-5">{t(step.description)}</p>
                  <Badge variant="secondary" className="rounded-none">{step.duration}</Badge>
                </div>
              </Reveal>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Media */}
      {!sector.videoFiles && sector.videos.length > 0 && (
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 sm:mb-14">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
              <Play className="w-4 h-4" /> Media
            </p>
            <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground">Video Content</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sector.videos.map((video, index) => (
              <Reveal key={video.title} delay={index * 120}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/${video.thumbnail}?auto=format&fit=crop&w=600&q=80`}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-12 h-12 text-background" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs px-2 py-1">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-inter font-semibold text-foreground mt-4">{video.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Contact */}
      <section id="sector-contact" className="bg-secondary py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal>
            <Card className="rounded-none border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-marcellus text-2xl font-normal">
                  <Mail className="w-5 h-5 text-primary" />
                   {t('Get In Touch')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <Label htmlFor="name">{t('Name')}</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                       <Label htmlFor="email">{t('Email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                     <Label htmlFor="company">{t('Company')}</Label>
                    <Input
                      id="company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                     <Label htmlFor="inquiryType">{t('Inquiry Type (optional)')}</Label>
                    <Select
                      value={contactForm.inquiryType}
                      onValueChange={(value) => setContactForm({ ...contactForm, inquiryType: value })}
                    >
                      <SelectTrigger>
                         <SelectValue placeholder={t('Select inquiry type')} />
                      </SelectTrigger>
                      <SelectContent>
                        {sector.slug === 'healthcare' ? (
                          <>
                             <SelectItem value="pharmaceuticals">{t('Pharmaceuticals')}</SelectItem>
                             <SelectItem value="medical-devices">{t('Medical Devices & Equipment')}</SelectItem>
                             <SelectItem value="clinical-consumables">{t('Clinical Consumables')}</SelectItem>
                             <SelectItem value="technical-services">{t('Technical Services & Training')}</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            <SelectItem value="investment">Investment Inquiry</SelectItem>
                            <SelectItem value="consultation">Consultation Request</SelectItem>
                            <SelectItem value="general">General Information</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                     <Label htmlFor="message">{t('Message (optional)')}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-none">
                    <Send className="w-4 h-4 mr-2" />
                     {t('Send Message')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={140}>
            <Card className="rounded-none border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-marcellus text-2xl font-normal">
                  <Phone className="w-5 h-5 text-primary" />
                   {t('Contact Information')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                   <h4 className="font-semibold text-foreground mb-2">{t('Direct Contact')}</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{sector.slug === 'healthcare' ? 'info@bella-healthcare.com' : 'info@bellainter.com'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{sector.slug === 'healthcare' ? '+251—933—38—1818' : '+251 913 328000'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{sector.slug === 'healthcare' ? '+251—913—94—1530' : '+251 911 827024'}</span>
                    </div>
                  </div>
                </div>
                <div>
                   <h4 className="font-semibold text-foreground mb-2">{t('Office Hours')}</h4>
                  <div className="text-muted-foreground text-sm space-y-1">
                     <p>{t('Monday - Friday: 8:00 AM - 6:00 PM')}</p>
                     <p>{t('Saturday: 9:00 AM - 2:00 PM')}</p>
                     <p>{t('Sunday: Closed')}</p>
                  </div>
                </div>
                <div>
                   <h4 className="font-semibold text-foreground mb-2">{t('General Enquiries')}</h4>
                  {sector.slug === 'healthcare' ? (
                    <a
                      href="https://www.bella-healthcare.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#145C9E] hover:bg-[#145C9E]/90 text-white font-inter font-medium px-6 py-3 transition-colors"
                    >
                       {t('Learn More about Bella Healthcare')}
                    </a>
                  ) : (
                    <Link to="/contact" className="text-primary font-inter font-medium story-link">
                       {t('Visit our contact page')}
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {nextSector && (
        <section className="relative min-h-[34vh] bg-primary text-primary-foreground overflow-hidden">
          <Link
            to={nextSector.path}
            aria-label={`${t('Continue to')} ${t(nextSector.title)}`}
            className="group min-h-[34vh] flex flex-col items-center justify-center px-6 text-center touch-manipulation"
          >
            <span className="font-inter text-xs uppercase tracking-[0.24em] opacity-70">{t('Next Sector')}</span>
            <span className="font-marcellus text-3xl sm:text-5xl mt-4">{t(nextSector.title)}</span>
            <span
              className="mt-7 w-14 h-14 border border-primary-foreground/50 flex items-center justify-center transition-transform duration-150 group-hover:translate-y-1"
              style={{ transform: `scale(${0.78 + nextProgress * 0.42})` }}
            >
              <ArrowDown className="w-6 h-6" />
            </span>
            <span className="md:hidden mt-5 font-inter text-xs uppercase tracking-wider opacity-60">{t('Keep scrolling')}</span>
          </Link>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default SectorPage;