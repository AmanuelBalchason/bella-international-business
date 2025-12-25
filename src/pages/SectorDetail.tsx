import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageSlideshow from '../components/ImageSlideshow';
import LocationMapDialog from '../components/LocationMapDialog';
import { Download, Play, MapPin, Calendar, TrendingUp, Award, Users, Leaf, Mail, Phone, Send, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const SectorDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    inquiryType: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    coords: number[];
    projects: number;
  } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{src: string; title: string; thumbnail?: string} | null>(null);

  const sectorData = {
    'real-estate': {
      title: 'Real Estate',
      locationName: 'Development Areas',
      description: 'Premium property development and strategic real estate investment solutions across Horn of Africa.',
      content: 'Our real estate division is committed to developing premium properties that meet international standards while addressing the unique needs of local markets. We focus on sustainable development practices and innovative architectural solutions that enhance community value.',
      vision: 'Shaping the Future of Urban Development',
      mission: 'To create sustainable, innovative, and community-focused real estate solutions that enhance quality of life while delivering exceptional returns to our partners.',
      resources: ['Property Investment Guide', 'Market Analysis Report', 'Development Portfolio', 'Sustainability Whitepaper'],
      stats: { projects: '25+', value: '$50M+', locations: '5 Cities' },
      images: [
        { 
          src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 
          title: 'Modern Residential Complex', 
          description: 'State-of-the-art residential development in Addis Ababa' 
        },
        { 
          src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 
          title: 'Commercial Properties', 
          description: 'Prime commercial real estate locations' 
        },
        { 
          src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80', 
          title: 'Sustainable Development', 
          description: 'Eco-friendly building practices and green spaces' 
        }
      ],
      processSteps: [
        { step: 'Site Analysis', description: 'Comprehensive land assessment and feasibility studies', duration: '2-3 months' },
        { step: 'Design & Planning', description: 'Architectural design and regulatory approvals', duration: '3-4 months' },
        { step: 'Construction', description: 'Quality construction with sustainable practices', duration: '12-18 months' },
        { step: 'Marketing & Sales', description: 'Strategic marketing and client acquisition', duration: '6-12 months' }
      ],
      certifications: ['LEED Certified', 'ISO 9001:2015', 'Green Building Council', 'Local Housing Authority'],
      partnerships: ['Local Contractors', 'International Architects', 'Government Bodies', 'Financial Institutions'],
      dataMetrics: {
        production: [
          { year: '2020', value: 8 },
          { year: '2021', value: 12 },
          { year: '2022', value: 18 },
          { year: '2023', value: 25 }
        ],
        quality: [
          { metric: 'Client Satisfaction', score: 95 },
          { metric: 'On-Time Delivery', score: 88 },
          { metric: 'Sustainability Rating', score: 92 },
          { metric: 'Cost Efficiency', score: 85 }
        ]
      },
      locations: [
        { name: 'Addis Ababa', projects: 12, coords: [38.7469, 9.0320] },
        { name: 'Sheger City', projects: 5, coords: [41.8661, 9.5928] },
        { name: 'Butajira', projects: 4, coords: [38.4762, 7.0469] },
      ],
      videos: [
        { 
          title: 'Project Showcase', 
          src: '/realstate/video/realstate-1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
          duration: '3:45'
        },
        { 
          title: 'Construction Process', 
          src: '/realstate/video/realstate-2.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          duration: '2:30'
        },
        { 
          title: 'Sustainable Development', 
          src: '/realstate/video/realstate-1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
          duration: '4:15'
        }
      ]
    },
    'healthcare': {
      title: 'Healthcare',
      locationName: 'Our Locations',
      description: 'Leading importer and distributor of essential pharmaceuticals and medical supplies in the Ethiopian market.',
      content: 'We provide comprehensive pharmaceutical import and distribution solutions, including supply chain management, product sourcing, and logistics. Our commitment to quality and integrity drives everything we do, ensuring timely and reliable access to essential medicines for pharmacies and healthcare facilities across the Horn of Africa.',
      vision: 'Accessible Healthcare for All Communities',
      mission: 'To provide exceptional healthcare services through innovative solutions, qualified professionals, and state-of-the-art facilities that serve the diverse needs of our communities.',
      resources: ['Healthcare Excellence Report', 'Medical Equipment Catalog', 'Quality Standards Guide', 'Community Health Impact'],
      stats: { facilities: '12', patients: '10K+', specialists: '50+' },
      images: [
        { 
          src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80', 
          title: 'Modern Medical Facilities', 
          description: 'State-of-the-art healthcare facilities with advanced equipment' 
        },
        { 
          src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80', 
          title: 'Healthcare Professionals', 
          description: 'Dedicated medical professionals providing quality care' 
        },
        { 
          src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80', 
          title: 'Community Health Programs', 
          description: 'Comprehensive community health initiatives' 
        }
      ],
      processSteps: [
        { step: 'Patient Registration', description: 'Comprehensive patient intake and medical history', duration: '15-30 min' },
        { step: 'Consultation', description: 'Expert medical consultation and diagnosis', duration: '30-45 min' },
        { step: 'Treatment', description: 'Personalized treatment plans and procedures', duration: 'Varies' },
        { step: 'Follow-up', description: 'Continued care and monitoring', duration: 'Ongoing' }
      ],
      certifications: ['WHO Standards', 'ISO 15189', 'Joint Commission', 'Ministry of Health Accreditation'],
      partnerships: ['Medical Universities', 'International Health Organizations', 'Pharmaceutical Companies', 'Insurance Providers'],
      dataMetrics: {
        production: [
          { year: '2020', value: 8000 },
          { year: '2021', value: 9500 },
          { year: '2022', value: 12000 },
          { year: '2023', value: 15000 }
        ],
        quality: [
          { metric: 'Patient Satisfaction', score: 96 },
          { metric: 'Treatment Success Rate', score: 94 },
          { metric: 'Wait Time Efficiency', score: 87 },
          { metric: 'Safety Standards', score: 98 }
        ]
      },
      locations: [
        { name: 'Addis Ababa', projects: 5, coords: [38.7469, 9.0320] },
        { name: 'Dire Dawa', projects: 2, coords: [41.8661, 9.5928] },
        { name: 'Hawassa', projects: 2, coords: [38.4762, 7.0469] },
        { name: 'Bahir Dar', projects: 2, coords: [37.3957, 11.5942] },
        { name: 'Mekelle', projects: 1, coords: [39.4753, 13.4967] }
      ],
      videos: [
        { 
          title: 'Facility Tour', 
          src: 'https://example.com/healthcare-video-1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
          duration: '5:20'
        },
        { 
          title: 'Medical Team', 
          src: 'https://example.com/healthcare-video-2.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
          duration: '3:15'
        },
        { 
          title: 'Patient Stories', 
          src: 'https://example.com/healthcare-video-3.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
          duration: '4:45'
        }
      ]
    },
    'acha-forest-coffee': {
      title: 'Acha Forest Coffee',
      locationName: 'Collection Areas',
      description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.',
      content: 'Our coffee operations focus on sustainable agricultural practices, innovative farming techniques, and supply chain optimization to deliver premium Ethiopian coffee to global markets. We work directly with local farmers to ensure fair trade practices and environmental sustainability.',
      vision: 'Premium Ethiopian Coffee for Global Markets',
      mission: 'To cultivate and deliver the finest Ethiopian coffee while supporting local communities through sustainable farming practices and fair trade partnerships.',
      resources: ['Coffee Quality Report', 'Sustainability Practices', 'Export Documentation', 'Farmer Partnership Guide'],
      stats: { farms: '8', tons: '500+ Annually', export: '15 Countries' },
      images: [
        { 
          src: '/acha-images/acha-farm-1.JPG', 
          title: 'Coffee Plantations', 
          description: 'Lush coffee farms in the Ethiopian highlands' 
        },
        { 
          src: '/acha-images/acha-farm-2.jpg', 
          title: 'Coffee Processing', 
          description: 'Traditional and modern coffee processing methods' 
        },
        { 
          src: '/acha-images/acha-farm-3.JPG', 
          title: 'Quality Control', 
          description: 'Rigorous quality testing and certification processes' 
        },
        { 
          src: '/acha-images/acha-farm-4.JPG', 
          title: 'Quality Control', 
          description: 'Rigorous quality testing and certification processes' 
        },
        { 
          src: '/acha-images/acha-5.jpg', 
          title: 'Quality Control', 
          description: 'Rigorous quality testing and certification processes' 
        }
      ],
      processSteps: [
        { step: 'Pre Harvesting', description: 'Sustainable farming practices in forest conditions', duration: '9-12 months' },
        { step: 'Harvesting', description: 'Hand-picked selection of ripe cherries', duration: '3-4 months' },
        { step: 'Processing', description: 'Wet and dry processing methods', duration: '2-4 weeks' },
        { step: 'Export', description: 'Quality control and international shipping', duration: '1-2 weeks' }
      ],
      certifications: ['Organic Certified', 'Fair Trade', 'Rainforest Alliance', 'UTZ Certified'],
      partnerships: ['Local Farmers', 'Export Cooperatives', 'International Buyers', 'Certification Bodies'],
      dataMetrics: {
        production: [
          { year: '2020', value: 320 },
          { year: '2021', value: 380 },
          { year: '2022', value: 450 },
          { year: '2023', value: 500 }
        ],
        quality: [
          { metric: 'Bean Quality Score', score: 94 },
          { metric: 'Farmer Satisfaction', score: 91 },
          { metric: 'Export Success Rate', score: 98 },
          { metric: 'Sustainability Rating', score: 96 }
        ]
      },
      locations: [
        { name: 'Kaffa Zone', projects: 3, coords: [36.2399, 7.2672] },
        { name: 'Jimma Zone', projects: 2, coords: [36.8344, 7.6773] },
        { name: 'Illubabor Zone', projects: 2, coords: [35.9342, 8.5569] },
        { name: 'Sidama Zone', projects: 1, coords: [38.4762, 6.8453] }
      ],
      videos: [
        { 
          title: 'Farm to Cup Journey', 
          src: 'https://example.com/coffee-video-1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
          duration: '6:30'
        },
        { 
          title: 'Farmer Testimonials', 
          src: 'https://example.com/coffee-video-2.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
          duration: '4:20'
        },
        { 
          title: 'Processing Methods', 
          src: 'https://example.com/coffee-video-3.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
          duration: '3:45'
        }
      ]
    },
    'automotives': {
      title: 'Automotives',
      locationName: 'Our Locations',
      description: 'Premier importer of vehicles and CKD parts, providing regional assembly and automotive solutions.',
      content: 'We specialize in comprehensive automotive import and assembly solutions, including vehicle distribution, CKD part sourcing, and local assembly operations. Our commitment to quality, reliability, and local value addition drives everything we do, ensuring modern mobility and supporting automotive industry growth across the Horn of Africa.',
      vision: 'Driving Regional Mobility and Growth',
      mission: 'To provide comprehensive automotive solutions that enhance transportation efficiency, support economic development, and contribute to regional connectivity.',
      resources: ['Fleet Management Guide', 'Vehicle Specifications', 'Maintenance Protocols', 'Transportation Analysis'],
      stats: { vehicles: '200+', routes: '25', clients: '80+' },
      images: [
        { 
          src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80', 
          title: 'Fleet Management', 
          description: 'Comprehensive fleet management solutions' 
        },
        { 
          src: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80', 
          title: 'Vehicle Maintenance', 
          description: 'Professional automotive maintenance services' 
        },
        { 
          src: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=800&q=80', 
          title: 'Transportation Infrastructure', 
          description: 'Supporting regional transportation development' 
        }
      ],
      processSteps: [
        { step: 'Assessment', description: 'Client needs analysis and fleet evaluation', duration: '1-2 weeks' },
        { step: 'Planning', description: 'Route optimization and vehicle selection', duration: '2-3 weeks' },
        { step: 'Implementation', description: 'Fleet deployment and system integration', duration: '1-2 months' },
        { step: 'Monitoring', description: 'Ongoing maintenance and performance tracking', duration: 'Ongoing' }
      ],
      certifications: ['ISO 9001:2015', 'Transport Authority License', 'Safety Standards Compliance', 'Environmental Certification'],
      partnerships: ['Vehicle Manufacturers', 'Insurance Companies', 'Fuel Suppliers', 'Maintenance Centers'],
      dataMetrics: {
        production: [
          { year: '2020', value: 120 },
          { year: '2021', value: 150 },
          { year: '2022', value: 180 },
          { year: '2023', value: 200 }
        ],
        quality: [
          { metric: 'Fleet Uptime', score: 96 },
          { metric: 'Client Satisfaction', score: 93 },
          { metric: 'Safety Record', score: 98 },
          { metric: 'Cost Efficiency', score: 89 }
        ]
      },
      locations: [
        { name: 'Addis Ababa', projects: 8, coords: [38.7469, 9.0320] },
        { name: 'Dire Dawa', projects: 5, coords: [41.8661, 9.5928] },
        { name: 'Hawassa', projects: 4, coords: [38.4762, 7.0469] },
        { name: 'Bahir Dar', projects: 4, coords: [37.3957, 11.5942] },
        { name: 'Mekelle', projects: 4, coords: [39.4753, 13.4967] }
      ],
      videos: [
        { 
          title: 'Fleet Operations', 
          src: 'https://example.com/automotive-video-1.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
          duration: '4:15'
        },
        { 
          title: 'Maintenance Excellence', 
          src: 'https://example.com/automotive-video-2.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
          duration: '3:30'
        },
        { 
          title: 'Client Success Stories', 
          src: 'https://example.com/automotive-video-3.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=800&q=80',
          duration: '5:00'
        }
      ]
    }
  };

  const sector = sectorData[slug as keyof typeof sectorData];

  if (!sector) {
    return <div>Sector not found</div>;
  }

  const handleDownloadPDF = (resourceName: string) => {
    console.log(`Downloading ${resourceName}...`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      company: '',
      message: '',
      inquiryType: ''
    });
  };

  const maxValue = Math.max(...sector.dataMetrics.production.map(d => d.value));

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

      {/* Enhanced Content Sections */}
      <section className="bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{sector.vision}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{sector.mission}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sector.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Key Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {sector.partnerships.map((partner, index) => (
                    <Badge key={index} variant="outline">{partner}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Process Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {sector.processSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-foreground mb-2">{step.step}</h4>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <Badge variant="secondary">{step.duration}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select value={contactForm.inquiryType} onValueChange={(value) => setContactForm({...contactForm, inquiryType: value})}>
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
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                      <span>achaforestcoffee.com</span>
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
                  <h4 className="font-semibold text-foreground mb-2">Newsletter Subscription</h4>
                  <p className="text-muted-foreground text-sm mb-3">Stay updated with our latest developments and opportunities.</p>
                  <div className="flex gap-2">
                    <Input placeholder="Your email address" className="flex-1" />
                    <Button variant="outline">Subscribe</Button>
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
              </CardContent>
            </Card>
          </div>

          {/* Media Section - Moved outside tabs */}
          <div className="space-y-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-primary" />
                  Video Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sector.videos.map((video, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVideo(video)}
                      className="group text-left w-full"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <div className="w-full h-48 relative overflow-hidden bg-gray-100">
                          {video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <Play className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <Play className="w-6 h-6 text-primary" fill="currentColor" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {video.title}
                      </h4>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources Section - Commented out as requested */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Resources & Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sector.resources.map((resource, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownloadPDF(resource)}
                      className="border border-border p-4 hover:shadow-md transition-all duration-200 text-left group rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">{resource}</h4>
                          <p className="text-muted-foreground text-sm">Download PDF resource</p>
                        </div>
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Locations Section - Updated to use dynamic locationName */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {sector.locationName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sector.locations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedLocation(location)}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">{location.name}</h4>
                      <p className="text-muted-foreground text-sm mb-2">{location.projects} active projects</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{location.coords[1].toFixed(4)}, {location.coords[0].toFixed(4)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Location Map Dialog */}
      {selectedLocation && (
        <LocationMapDialog
          isOpen={!!selectedLocation}
          onClose={() => setSelectedLocation(null)}
          location={selectedLocation}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video">
              <video
                controls
                autoPlay
                className="w-full h-full"
                poster={selectedVideo.thumbnail}
              >
                <source src={selectedVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4 bg-black">
              <h3 className="text-white text-xl font-semibold">{selectedVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorDetail;