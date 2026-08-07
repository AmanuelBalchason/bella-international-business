import bhVideo1 from '@/assets/bh-video-1.mp4.asset.json';
import bhVideo2 from '@/assets/bh-video-2.mp4.asset.json';
import bhVideo3 from '@/assets/bh-video-3.mp4.asset.json';
import bhPoster1 from '@/assets/bh-poster-1.jpg.asset.json';
import bhPoster2 from '@/assets/bh-poster-2.jpg.asset.json';
import bhPoster3 from '@/assets/bh-poster-3.jpg.asset.json';

export interface SectorImage {
  src: string;
  title: string;
  description: string;
}

export interface Sector {
  slug: string;
  path: string;
  title: string;
  tagline: string;
  description: string;
  overviewHeading?: string;
  content: string;
  vision: string;
  mission: string;
  resources: string[];
  stats: Record<string, string>;
  heroImage: string;
  heroImages?: string[];
  images: SectorImage[];
  processSteps: { step: string; description: string; duration: string; benefit?: string }[];
  certifications: string[];
  partnerships: string[];
  dataMetrics: {
    production: { year: string; value: number }[];
    quality: { metric: string; score: number }[];
  };
  locations: { name: string; projects: number; coords: number[] }[];
  videos: { title: string; thumbnail: string; duration: string }[];
  videoFiles?: { title: string; src: string; poster: string }[];
  solutions?: { title: string; description: string }[];
  advantages?: { title: string; description: string }[];
  partnerStrip?: { label: string; names: string[] }[];
}

export const sectorData: Record<string, Sector> = {
  'real-estate': {
    slug: 'real-estate',
    path: '/bella-real-estate',
    title: 'Bella Real Estate',
    tagline: 'Shaping skylines across the Horn of Africa.',
    description: 'Premium property development and strategic real estate investment solutions across Horn of Africa.',
    content:
      'Our real estate division is committed to developing premium properties that meet international standards while addressing the unique needs of local markets. We focus on sustainable development practices and innovative architectural solutions that enhance community value.',
    vision: 'Shaping the Future of Urban Development',
    mission:
      'To create sustainable, innovative, and community-focused real estate solutions that enhance quality of life while delivering exceptional returns to our partners.',
    resources: ['Property Investment Guide', 'Market Analysis Report', 'Development Portfolio', 'Sustainability Whitepaper'],
    stats: { projects: '25+', value: '$50M+', locations: '5 Cities' },
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        title: 'Modern Residential Complex',
        description: 'State-of-the-art residential development in Addis Ababa',
      },
      {
        src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        title: 'Commercial Properties',
        description: 'Prime commercial real estate locations',
      },
      {
        src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
        title: 'Sustainable Development',
        description: 'Eco-friendly building practices and green spaces',
      },
    ],
    processSteps: [
      { step: 'Site Analysis', description: 'Comprehensive land assessment and feasibility studies', duration: '2-3 months' },
      { step: 'Design & Planning', description: 'Architectural design and regulatory approvals', duration: '3-4 months' },
      { step: 'Construction', description: 'Quality construction with sustainable practices', duration: '12-18 months' },
      { step: 'Marketing & Sales', description: 'Strategic marketing and client acquisition', duration: '6-12 months' },
    ],
    certifications: ['LEED Certified', 'ISO 9001:2015', 'Green Building Council', 'Local Housing Authority'],
    partnerships: ['Local Contractors', 'International Architects', 'Government Bodies', 'Financial Institutions'],
    dataMetrics: {
      production: [
        { year: '2020', value: 8 },
        { year: '2021', value: 12 },
        { year: '2022', value: 18 },
        { year: '2023', value: 25 },
      ],
      quality: [
        { metric: 'Client Satisfaction', score: 95 },
        { metric: 'On-Time Delivery', score: 88 },
        { metric: 'Sustainability Rating', score: 92 },
        { metric: 'Cost Efficiency', score: 85 },
      ],
    },
    locations: [
      { name: 'Addis Ababa', projects: 12, coords: [38.7469, 9.032] },
      { name: 'Sheger City', projects: 5, coords: [41.8661, 9.5928] },
      { name: 'Butajira', projects: 4, coords: [38.4762, 7.0469] },
    ],
    videos: [
      { title: 'Project Showcase', thumbnail: 'photo-1560518883-ce09059eeffa', duration: '3:45' },
      { title: 'Construction Process', thumbnail: 'photo-1545324418-cc1a3fa10c00', duration: '2:30' },
      { title: 'Client Testimonials', thumbnail: 'photo-1582407947304-fd86f028f716', duration: '4:15' },
    ],
  },
  healthcare: {
    slug: 'healthcare',
    path: '/bella-healthcare',
    title: 'Bella Healthcare',
    tagline: 'Reliable medical devices and healthcare solutions, expertly curated for the Ethiopian market.',
    description: 'Leading importer and distributor of essential pharmaceuticals and medical supplies in the Ethiopian market.',
    overviewHeading: 'Your End-to-End Clinical Technology & Pharmaceutical Partner.',
    content:
      "Backed by the 50+ year heritage of Bella International Business, we bridge the gap in Ethiopia's healthcare sector. We provide comprehensive import and distribution solutions, balancing essential pharmaceutical supply chains with advanced clinical technology. By combining trusted global partnerships, local clinical expertise, and flexible financing, we make world-class healthcare accessible across the Horn of Africa.",
    vision: 'Accessible Healthcare for All Communities',
    mission:
      'To provide exceptional healthcare services through innovative solutions, qualified professionals, and state-of-the-art facilities that serve the diverse needs of our communities.',
    resources: ['Healthcare Excellence Report', 'Medical Equipment Catalog', 'Quality Standards Guide', 'Community Health Impact'],
    stats: {
      'Strategic Partnerships': '200+',
      'Client Retention Rate': '90%',
      'Distribution Network': 'Nationwide',
    },
    heroImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1920&q=80',
    heroImages: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
    ],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
        title: 'Modern Medical Facilities',
        description: 'State-of-the-art healthcare facilities with advanced equipment',
      },
      {
        src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
        title: 'Healthcare Professionals',
        description: 'Dedicated medical professionals providing quality care',
      },
      {
        src: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
        title: 'Community Health Programs',
        description: 'Comprehensive community health initiatives',
      },
    ],
    processSteps: [
      { step: 'Consult', description: 'Assess your clinical and operational needs', duration: '', benefit: 'The right solution from the start' },
      { step: 'Recommend', description: 'Design fit-for-purpose solutions', duration: '', benefit: 'Reduced investment risk' },
      { step: 'Finance', description: 'Arrange flexible financing', duration: '', benefit: 'Affordable technology access' },
      { step: 'Supply', description: 'Deliver quality clinical technology', duration: '', benefit: 'Reliable product availability' },
      { step: 'Install', description: 'Install, commission, and validate', duration: '', benefit: 'Ready for clinical use' },
      { step: 'Train', description: 'Train clinical and technical teams', duration: '', benefit: 'Confident equipment utilization' },
      { step: 'Support', description: 'Maintain, support, and respond', duration: '', benefit: 'Maximum equipment uptime' },
      { step: 'Grow', description: 'Upgrade and optimize solutions', duration: '', benefit: 'Future-ready healthcare facilities' },
    ],
    certifications: ['WHO Standards', 'ISO 15189', 'Joint Commission', 'Ministry of Health Accreditation'],
    partnerships: ['Medical Universities', 'International Health Organizations', 'Pharmaceutical Companies', 'Insurance Providers'],
    dataMetrics: {
      production: [
        { year: '2020', value: 8000 },
        { year: '2021', value: 9500 },
        { year: '2022', value: 12000 },
        { year: '2023', value: 15000 },
      ],
      quality: [
        { metric: 'Patient Satisfaction', score: 96 },
        { metric: 'Treatment Success Rate', score: 94 },
        { metric: 'Wait Time Efficiency', score: 87 },
        { metric: 'Safety Standards', score: 98 },
      ],
    },
    locations: [
      { name: 'Addis Ababa', projects: 5, coords: [38.7469, 9.032] },
      { name: 'Dire Dawa', projects: 2, coords: [41.8661, 9.5928] },
      { name: 'Hawassa', projects: 2, coords: [38.4762, 7.0469] },
      { name: 'Bahir Dar', projects: 2, coords: [37.3957, 11.5942] },
      { name: 'Mekelle', projects: 1, coords: [39.4753, 13.4967] },
    ],
    videos: [],
    videoFiles: [
      { title: 'Inside Bella Healthcare', src: bhVideo1.url, poster: bhPoster1.url },
      { title: 'Medical Equipment in Action', src: bhVideo2.url, poster: bhPoster2.url },
      { title: 'Serving Ethiopian Healthcare', src: bhVideo3.url, poster: bhPoster3.url },
    ],
    solutions: [
      {
        title: 'Pharmaceuticals',
        description: 'Importation and distribution of essential medicines.',
      },
      {
        title: 'Medical Devices & Equipment',
        description: 'Sourcing advanced diagnostics, including Mindray ultrasound systems.',
      },
      {
        title: 'Clinical Consumables',
        description:
          'High-volume essentials including syringes, SriTrang gloves, and Tedia blood collection tubes.',
      },
      {
        title: 'Technical Services',
        description:
          'Expert installation, calibration, and preventive maintenance by licensed biomedical engineers.',
      },
    ],
    advantages: [
      {
        title: 'Flexible Financing',
        description:
          'In partnership with Hibret Bank and Siinqee Lease, we structure financing and leasing options that reduce upfront investment risk for hospitals and clinics.',
      },
      {
        title: 'Guaranteed FX & Supply',
        description:
          'Our parent group\u2019s export arm, Acha Forest Coffee, secures the foreign exchange behind every order \u2014 enabling reliable, uninterrupted imports.',
      },
      {
        title: 'Unmatched After-Sales SLA',
        description:
          'Guaranteed 1-hour remote support and 48-hour on-site technical response, backed by locally stocked spare parts and certified biomedical engineers.',
      },
    ],
    partnerStrip: [
      { label: 'Technology Partners', names: ['Mindray', 'SriTrang', 'Tedia'] },
      { label: 'Pharmaceutical Suppliers', names: ['Cipla', 'Hetero Healthcare', 'Julphar'] },
      {
        label: 'Institutions Served',
        names: ['Lancet Health Services', 'MCM General Hospital', 'Hallelujah General Hospital', 'Kadisco General Hospital'],
      },
    ],
  },
  'acha-forest-coffee': {
    slug: 'acha-forest-coffee',
    path: '/acha-forest-coffee',
    title: 'Acha Forest Coffee',
    tagline: 'Forest-grown Ethiopian coffee, from origin to the world.',
    description: 'Sustainable coffee cultivation and supply chain optimization for premium Ethiopian coffee.',
    content:
      'Our coffee operations focus on sustainable agricultural practices, innovative farming techniques, and supply chain optimization to deliver premium Ethiopian coffee to global markets. We work directly with local farmers to ensure fair trade practices and environmental sustainability.',
    vision: 'Premium Ethiopian Coffee for Global Markets',
    mission:
      'To cultivate and deliver the finest Ethiopian coffee while supporting local communities through sustainable farming practices and fair trade partnerships.',
    resources: ['Coffee Quality Report', 'Sustainability Practices', 'Export Documentation', 'Farmer Partnership Guide'],
    stats: { farms: '8', tons: '500+ Annually', export: '15 Countries' },
    heroImage: '/acha-images/acha-1.jpg',
    images: [
      { src: '/acha-images/acha-1.jpg', title: 'Coffee Plantations', description: 'Lush coffee farms in the Ethiopian highlands' },
      { src: '/acha-images/acha-2.jpg', title: 'Coffee Processing', description: 'Traditional and modern coffee processing methods' },
      { src: '/acha-images/acha-3.jpg', title: 'Quality Control', description: 'Rigorous quality testing and certification processes' },
      { src: '/acha-images/acha-4.jpg', title: 'Sorting & Grading', description: 'Careful sorting and grading of every batch' },
      { src: '/acha-images/acha-5.jpg', title: 'Export Ready', description: 'Packed and prepared for international shipment' },
    ],
    processSteps: [
      { step: 'Pre Harvesting', description: 'Sustainable farming practices in forest conditions', duration: '9-12 months' },
      { step: 'Harvesting', description: 'Hand-picked selection of ripe cherries', duration: '3-4 months' },
      { step: 'Processing', description: 'Wet and dry processing methods', duration: '2-4 weeks' },
      { step: 'Export', description: 'Quality control and international shipping', duration: '1-2 weeks' },
    ],
    certifications: ['Organic Certified', 'Fair Trade', 'Rainforest Alliance', 'UTZ Certified'],
    partnerships: ['Local Farmers', 'Export Cooperatives', 'International Buyers', 'Certification Bodies'],
    dataMetrics: {
      production: [
        { year: '2020', value: 320 },
        { year: '2021', value: 380 },
        { year: '2022', value: 450 },
        { year: '2023', value: 500 },
      ],
      quality: [
        { metric: 'Bean Quality Score', score: 94 },
        { metric: 'Farmer Satisfaction', score: 91 },
        { metric: 'Export Success Rate', score: 98 },
        { metric: 'Sustainability Rating', score: 96 },
      ],
    },
    locations: [
      { name: 'Kaffa Zone', projects: 3, coords: [36.2399, 7.2672] },
      { name: 'Jimma Zone', projects: 2, coords: [36.8344, 7.6773] },
      { name: 'Illubabor Zone', projects: 2, coords: [35.9342, 8.5569] },
      { name: 'Sidama Zone', projects: 1, coords: [38.4762, 6.8453] },
    ],
    videos: [
      { title: 'Farm to Cup Journey', thumbnail: 'photo-1447933601403-0c6688de566e', duration: '6:30' },
      { title: 'Farmer Testimonials', thumbnail: 'photo-1498804103079-a6351b050096', duration: '4:20' },
      { title: 'Processing Methods', thumbnail: 'photo-1509042239860-f550ce710b93', duration: '3:45' },
    ],
  },
  automotives: {
    slug: 'automotives',
    path: '/bella-automotives',
    title: 'Bella Automotives',
    tagline: 'Vehicles, CKD parts and regional assembly.',
    description: 'Premier importer of vehicles and CKD parts, providing regional assembly and automotive solutions.',
    content:
      'We specialize in comprehensive automotive import and assembly solutions, including vehicle distribution, CKD part sourcing, and local assembly operations. Our commitment to quality, reliability, and local value addition drives everything we do, ensuring modern mobility and supporting automotive industry growth across the Horn of Africa.',
    vision: 'Driving Regional Mobility and Growth',
    mission:
      'To provide comprehensive automotive solutions that enhance transportation efficiency, support economic development, and contribute to regional connectivity.',
    resources: ['Fleet Management Guide', 'Vehicle Specifications', 'Maintenance Protocols', 'Transportation Analysis'],
    stats: { vehicles: '200+', routes: '25', clients: '80+' },
    heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
        title: 'Fleet Management',
        description: 'Comprehensive fleet management solutions',
      },
      {
        src: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
        title: 'Vehicle Maintenance',
        description: 'Professional automotive maintenance services',
      },
      {
        src: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=800&q=80',
        title: 'Transportation Infrastructure',
        description: 'Supporting regional transportation development',
      },
    ],
    processSteps: [
      { step: 'Assessment', description: 'Client needs analysis and fleet evaluation', duration: '1-2 weeks' },
      { step: 'Planning', description: 'Route optimization and vehicle selection', duration: '2-3 weeks' },
      { step: 'Implementation', description: 'Fleet deployment and system integration', duration: '1-2 months' },
      { step: 'Monitoring', description: 'Ongoing maintenance and performance tracking', duration: 'Ongoing' },
    ],
    certifications: ['ISO 9001:2015', 'Transport Authority License', 'Safety Standards Compliance', 'Environmental Certification'],
    partnerships: ['Vehicle Manufacturers', 'Insurance Companies', 'Fuel Suppliers', 'Maintenance Centers'],
    dataMetrics: {
      production: [
        { year: '2020', value: 120 },
        { year: '2021', value: 150 },
        { year: '2022', value: 180 },
        { year: '2023', value: 200 },
      ],
      quality: [
        { metric: 'Fleet Uptime', score: 96 },
        { metric: 'Client Satisfaction', score: 93 },
        { metric: 'Safety Record', score: 98 },
        { metric: 'Cost Efficiency', score: 89 },
      ],
    },
    locations: [
      { name: 'Addis Ababa', projects: 8, coords: [38.7469, 9.032] },
      { name: 'Dire Dawa', projects: 5, coords: [41.8661, 9.5928] },
      { name: 'Hawassa', projects: 4, coords: [38.4762, 7.0469] },
      { name: 'Bahir Dar', projects: 4, coords: [37.3957, 11.5942] },
      { name: 'Mekelle', projects: 4, coords: [39.4753, 13.4967] },
    ],
    videos: [
      { title: 'Fleet Operations', thumbnail: 'photo-1449824913935-59a10b8d2000', duration: '4:15' },
      { title: 'Maintenance Excellence', thumbnail: 'photo-1550355291-bbee04a92027', duration: '3:30' },
      { title: 'Client Success Stories', thumbnail: 'photo-1486754735734-325b5831c3ad', duration: '5:00' },
    ],
  },
};

export const sectorList: Sector[] = [
  sectorData['healthcare'],
  sectorData['real-estate'],
  sectorData['acha-forest-coffee'],
  sectorData['automotives'],
];

export const sectorPathBySlug = (slug: string): string => sectorData[slug]?.path ?? '/sectors';

export const sectorNavLinks = sectorList.map((sector) => ({
  path: sector.path,
  title: sector.title,
  tagline: sector.tagline,
}));