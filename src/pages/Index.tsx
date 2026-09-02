
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import EventBanner from '../components/EventBanner';
import ClientLogos from '../components/ClientLogos';
import AnimatedAboutSection from '../components/AnimatedAboutSection';
import BusinessSectors from '../components/BusinessSectors';
import LeadershipSlideshow from '../components/LeadershipSlideshow';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { Toaster } from '../components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="Bella International Business | Ethiopian Investment Group"
        description="Bella International Business builds value across healthcare, real estate, Acha Forest Coffee and automotives in Ethiopia and the Horn of Africa."
        path="/"
      />
      <Header />
      <HeroSection />
      <EventBanner />
      <ClientLogos />
      <TestimonialsSection />
      <BusinessSectors />
      <LeadershipSlideshow />
      <AnimatedAboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
