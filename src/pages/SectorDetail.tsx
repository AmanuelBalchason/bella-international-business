import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageSlideshow from '../components/ImageSlideshow';
import { Download } from 'lucide-react';
import { Button } from '../components/ui/button';

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
      stats: { projects: '25+', value: '$50M+', locations: '5 Cities' },
      images: [
        { src: 'photo-1560518883-ce09059eeffa', title: 'Modern Residential Complex', description: 'State-of-the-art residential development in Addis Ababa' },
        { src: 'photo-1545324418-cc1a3fa10c00', title: 'Commercial Properties', description: 'Prime commercial real estate locations' },
        { src: 'photo-1582407947304-fd86f028f716', title: 'Sustainable Development', description: 'Eco-friendly building practices and green spaces' }
      ]
    },
    'healthcare': {
      title: 'Healthcare',
      description: 'Comprehensive healthcare services and medical facility management with focus on quality care.',
      content: 'We provide comprehensive healthcare solutions including medical facility management, healthcare service delivery, and medical equipment procurement. Our commitment to quality care drives everything we do, ensuring accessible and affordable healthcare for communities across the Horn of Africa.',
      vision: 'Accessible Healthcare for All Communities',
      mission: 'To provide exceptional healthcare services through innovative solutions, qualified professionals, and state-of-the-art facilities that serve the diverse needs of our communities.',
      services: ['Medical Facilities', 'Healthcare Management', 'Medical Equipment', 'Healthcare Consulting'],
      stats: { facilities: '12', patients: '10K+', specialists: '50+' },
      images: [
        { src: 'photo-1576091160399-112ba8d25d1f', title: 'Modern Medical Facilities', description: 'State-of-the-art healthcare facilities with advanced equipment' },
        { src: 'photo-1559757148-5c350d0d3c56', title: 'Healthcare Professionals', description: 'Dedicated medical professionals providing quality care' },
        { src: 'photo-1538108149393-fbbd81895907', title: 'Community Health Programs', description: 'Comprehensive community health initiatives' }
      ]
    },
    'acha-forest-coffee': {
      title: 'Acha Forest Coffee',
      description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.',
      content: 'Our coffee operations focus on sustainable agricultural practices, innovative farming techniques, and supply chain optimization to deliver premium Ethiopian coffee to global markets. We work directly with local farmers to ensure fair trade practices and environmental sustainability.',
      vision: 'Premium Ethiopian Coffee for Global Markets',
      mission: 'To cultivate and deliver the finest Ethiopian coffee while supporting local communities through sustainable farming practices and fair trade partnerships.',
      services: ['Coffee Cultivation', 'Processing & Roasting', 'Export Services', 'Quality Assurance'],
      stats: { farms: '8', tons: '500+ Annually', export: '15 Countries' },
      images: [
        { src: 'photo-1447933601403-0c6688de566e', title: 'Coffee Plantations', description: 'Lush coffee farms in the Ethiopian highlands' },
        { src: 'photo-1498804103079-a6351b050096', title: 'Coffee Processing', description: 'Traditional and modern coffee processing methods' },
        { src: 'photo-1509042239860-f550ce710b93', title: 'Quality Control', description: 'Rigorous quality testing and certification processes' }
      ]
    },
    'automotives': {
      title: 'Automotives',
      description: 'Automotive solutions, fleet management, and transportation infrastructure development.',
      content: 'We offer comprehensive automotive services including vehicle sales, fleet management solutions, maintenance services, and transportation infrastructure development to support regional mobility and economic growth across the Horn of Africa.',
      vision: 'Driving Regional Mobility and Growth',
      mission: 'To provide comprehensive automotive solutions that enhance transportation efficiency, support economic development, and contribute to regional connectivity.',
      services: ['Vehicle Sales', 'Fleet Management', 'Maintenance Services', 'Infrastructure Development'],
      stats: { vehicles: '200+', routes: '25', clients: '80+' },
      images: [
        { src: 'photo-1449824913935-59a10b8d2000', title: 'Fleet Management', description: 'Comprehensive fleet management solutions' },
        { src: 'photo-1550355291-bbee04a92027', title: 'Vehicle Maintenance', description: 'Professional automotive maintenance services' },
        { src: 'photo-1486754735734-325b5831c3ad', title: 'Transportation Infrastructure', description: 'Supporting regional transportation development' }
      ]
    }
  };

  const sector = sectorData[slug as keyof typeof sectorData];

  if (!sector) {
    return <div>Sector not found</div>;
  }

  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    console.log(`Downloading ${sector.title} company profile...`);
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
                {sector.title}
              </h1>
              <p className="text-muted-foreground font-inter text-xl leading-relaxed mb-8">
                {sector.description}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {Object.entries(sector.stats).map(([key, value]) => (
                  <div key={key} className="parallax-slow">
                    <div className="font-marcellus text-2xl text-primary mb-1">{value}</div>
                    <p className="text-muted-foreground font-inter text-sm capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <ImageSlideshow images={sector.images} />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-fade-in parallax-medium">
              <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">Vision</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">{sector.vision}</p>
            </div>
            <div className="animate-fade-in parallax-slow" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-marcellus text-2xl font-normal text-foreground mb-4">Mission</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">{sector.mission}</p>
            </div>
          </div>

          {/* Download Section */}
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-8 py-3 rounded-none inline-flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              Download Company Profile
            </Button>
          </div>
        </div>
      </section>
      
      {/* Content & Services */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto mb-16 animate-fade-in">
            <p className="text-muted-foreground font-inter text-lg leading-relaxed">
              {sector.content}
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-marcellus text-2xl font-normal text-foreground mb-8 text-center">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sector.services.map((service, index) => (
                <div key={index} className="bg-secondary border border-border p-6 hover:border-primary/30 transition-all duration-200 hover:shadow-lg parallax-fast" style={{ animationDelay: `${index * 0.1}s` }}>
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
