
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SectorDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const sectorData = {
    'real-estate': {
      title: 'Real Estate',
      description: 'Premium property development and strategic real estate investment solutions across Horn of Africa.',
      content: 'Our real estate division is committed to developing premium properties that meet international standards while addressing the unique needs of local markets. We focus on sustainable development practices and innovative architectural solutions that enhance community value.',
      vision: 'Shaping the Future of Urban Development',
      mission: 'To create sustainable, innovative, and community-focused real estate solutions that enhance quality of life while delivering exceptional returns to our partners.',
      services: ['Residential Development', 'Commercial Properties', 'Property Management', 'Real Estate Investment'],
      stats: { projects: '25+', value: '$50M+', locations: '5 Cities' }
    },
    'healthcare': {
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.',
      content: 'We provide comprehensive healthcare solutions including medical facility management, healthcare service delivery, and medical equipment procurement. Our commitment to quality care drives everything we do, ensuring accessible and affordable healthcare for communities across the Horn of Africa.',
      vision: 'Accessible Healthcare for All Communities',
      mission: 'To provide exceptional healthcare services through innovative solutions, qualified professionals, and state-of-the-art facilities that serve the diverse needs of our communities.',
      services: ['Medical Facilities', 'Healthcare Management', 'Medical Equipment', 'Healthcare Consulting'],
      stats: { facilities: '12', patients: '10K+', specialists: '50+' }
    },
    'acha-forest-coffee': {
      title: 'Acha Forest Coffee',
      description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.',
      content: 'Our coffee operations focus on sustainable agricultural practices, innovative farming techniques, and supply chain optimization to deliver premium Ethiopian coffee to global markets. We work directly with local farmers to ensure fair trade practices and environmental sustainability.',
      vision: 'Premium Ethiopian Coffee for Global Markets',
      mission: 'To cultivate and deliver the finest Ethiopian coffee while supporting local communities through sustainable farming practices and fair trade partnerships.',
      services: ['Coffee Cultivation', 'Processing & Roasting', 'Export Services', 'Quality Assurance'],
      stats: { farms: '8', tons: '500+ Annually', export: '15 Countries' }
    },
    'automotives': {
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.',
      content: 'We offer comprehensive automotive services including vehicle sales, fleet management solutions, maintenance services, and transportation infrastructure development to support regional mobility and economic growth across the Horn of Africa.',
      vision: 'Driving Regional Mobility and Growth',
      mission: 'To provide comprehensive automotive solutions that enhance transportation efficiency, support economic development, and contribute to regional connectivity.',
      services: ['Vehicle Sales', 'Fleet Management', 'Maintenance Services', 'Infrastructure Development'],
      stats: { vehicles: '200+', routes: '25', clients: '80+' }
    }
  };

  const sector = sectorData[slug as keyof typeof sectorData];

  if (!sector) {
    return <div>Sector not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
                {sector.title}
              </h1>
              <p className="text-muted-foreground font-inter text-xl leading-relaxed mb-8">
                {sector.description}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(sector.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className="font-marcellus text-2xl text-primary mb-1">{value}</div>
                    <p className="text-muted-foreground font-inter text-sm capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full h-[400px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <span className="text-primary font-marcellus text-2xl">B</span>
                </div>
                <p className="text-muted-foreground font-inter text-sm">{sector.title} Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">{sector.vision}</p>
            </div>
            <div>
              <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">{sector.mission}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content & Services */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto mb-16">
            <p className="text-muted-foreground font-inter text-lg leading-relaxed">
              {sector.content}
            </p>
          </div>

          <div>
            <h3 className="font-marcellus text-2xl font-normal text-foreground mb-8 text-center">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sector.services.map((service, index) => (
                <div key={index} className="bg-secondary border border-border p-6">
                  <h4 className="font-inter font-semibold text-foreground mb-2">{service}</h4>
                  <p className="text-muted-foreground font-inter text-sm">Comprehensive solutions tailored to your needs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SectorDetail;
