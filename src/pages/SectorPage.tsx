import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import SectorCarousel from '../components/SectorCarousel';
import InteractiveDotPattern from '../components/InteractiveDotPattern';
import { Calendar, Mail, Phone, Send, Play, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sector } from '@/data/sectors';
import { usePrefersReducedMotion } from '@/hooks/useInView';

interface SectorPageProps {
  sector: Sector;
}

const SectorPage = ({ sector }: SectorPageProps) => {
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
  const reduced = usePrefersReducedMotion();
  const heroImages = sector.heroImages ?? [sector.heroImage];

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setHeroIndex(0);
    setStepIndex(0);
  }, [sector.slug]);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(id);
  }, [heroImages.length]);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactForm({ name: '', email: '', company: '', message: '', inquiryType: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        {heroImages.map((image, i) => (
          <div
            key={image}
            className={`absolute inset-0 -top-24 bg-cover bg-center will-change-transform transition-opacity duration-1000 ${
              i === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              transform: reduced ? undefined : `translateY(${Math.min(scrollY * 0.25, 240)}px) scale(1.1)`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20">
          <p className="font-inter text-sm uppercase tracking-[0.25em] text-background/80 mb-5 animate-fade-in">
            Bella International Sector
          </p>
          <h1 className="font-marcellus text-5xl md:text-7xl text-background leading-[1.05] max-w-4xl animate-fade-in">
            {sector.title}
          </h1>
          <p
            className="font-inter text-lg md:text-2xl text-background/85 max-w-2xl mt-6 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
          >
            {sector.tagline}
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a href="#sector-contact">
              <Button size="lg" className="rounded-none px-8 hover:scale-105 transition-transform duration-200">
                Start a Conversation
              </Button>
            </a>
            <a href="#sector-overview">
              <Button
                size="lg"
                variant="outline"
                className="rounded-none px-8 bg-transparent text-background border-background/60 hover:bg-background hover:text-foreground"
              >
                Explore the Sector
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {heroImages.length > 1 && (
            <div className="flex gap-2 mt-10">
              {heroImages.map((image, i) => (
                <button
                  key={image}
                  aria-label={`Show hero image ${i + 1}`}
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
              <p className="font-inter text-sm uppercase tracking-wider text-primary-foreground/70 capitalize">{key}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section id="sector-overview" className="py-28 relative overflow-hidden">
        <InteractiveDotPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">Overview</p>
            <h2 className="font-marcellus text-4xl text-foreground leading-tight">{sector.description}</h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-7">
            <p className="font-inter text-lg text-muted-foreground leading-relaxed">{sector.content}</p>
          </Reveal>
        </div>
      </section>

      {/* Gallery carousel */}
      <section className="bg-secondary py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">
              {sector.solutions ? 'What We Offer' : 'In Focus'}
            </p>
            <h2 className="font-marcellus text-4xl text-foreground">
              {sector.solutions ? 'Comprehensive Healthcare Solutions' : `Inside ${sector.title}`}
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
                    <h3 className="font-marcellus text-2xl text-foreground mt-5 mb-3">{solution.title}</h3>
                    <p className="font-inter text-muted-foreground leading-relaxed">{solution.description}</p>
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

      {/* Process timeline */}
      <section className="bg-secondary py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> How We Partner
            </p>
            <h2 className="font-marcellus text-4xl text-foreground">How We Partner</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sector.processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 120}>
                <div className="h-full bg-card border border-border p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="font-marcellus text-3xl text-primary/50">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-inter text-lg font-semibold text-foreground mt-6 mb-3">{step.step}</h3>
                  <p className="text-muted-foreground font-inter text-sm leading-relaxed mb-5">{step.description}</p>
                  <Badge variant="secondary" className="rounded-none">{step.duration}</Badge>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
              <Play className="w-4 h-4" /> Media
            </p>
            <h2 className="font-marcellus text-4xl text-foreground">Video Content</h2>
          </Reveal>
          {sector.videoFiles ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl">
              {sector.videoFiles.map((video, index) => (
                <Reveal key={video.title} delay={index * 120}>
                  <div className="group">
                    <div className="relative overflow-hidden aspect-[9/16] bg-secondary">
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-inter font-semibold text-foreground mt-4">{video.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="sector-contact" className="bg-secondary py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal>
            <Card className="rounded-none border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-marcellus text-2xl font-normal">
                  <Mail className="w-5 h-5 text-primary" />
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select
                      value={contactForm.inquiryType}
                      onValueChange={(value) => setContactForm({ ...contactForm, inquiryType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="investment">Investment Inquiry</SelectItem>
                        <SelectItem value="consultation">Consultation Request</SelectItem>
                        <SelectItem value="general">General Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-none">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
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
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Direct Contact</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>info@bellainter.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+251 913 328000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+251 911 827024</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Office Hours</h4>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">General Enquiries</h4>
                  <Link to="/contact" className="text-primary font-inter font-medium story-link">
                    Visit our contact page
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SectorPage;