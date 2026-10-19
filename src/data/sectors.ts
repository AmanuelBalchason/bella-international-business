import bellaRiversideHero from '@/assets/bella-riverside-hero.webp.asset.json';
import bhVideo1 from '@/assets/bh-video-1-opt.mp4.asset.json';
import bhVideo2 from '@/assets/bh-video-2-opt.mp4.asset.json';
import bhVideo3 from '@/assets/bh-video-3-opt.mp4.asset.json';
import bhPoster1 from '@/assets/bh-poster-1-opt.webp.asset.json';
import bhPoster2 from '@/assets/bh-poster-2-opt.webp.asset.json';
import bhPoster3 from '@/assets/bh-poster-3-opt.webp.asset.json';
import achaHeroHighlands from '@/assets/acha-hero-highlands.webp.asset.json';
import achaCherriesBranch from '@/assets/acha-cherries-branch.webp.asset.json';
import achaPicking from '@/assets/acha-picking.webp.asset.json';
import achaForestWalk from '@/assets/acha-forest-walk.webp.asset.json';
import achaSorting from '@/assets/acha-sorting.webp.asset.json';
import achaDryingAerial from '@/assets/acha-drying-aerial.webp.asset.json';
import achaDryingDiscussion from '@/assets/acha-drying-discussion.webp.asset.json';
import achaBasket from '@/assets/acha-basket.webp.asset.json';
import achaPickerSmile from '@/assets/acha-picker-smile.webp.asset.json';
import achaPickerPortrait from '@/assets/acha-picker-portrait.webp.asset.json';

export const achaMedia = {
  heroHighlands: achaHeroHighlands.url,
  cherriesBranch: achaCherriesBranch.url,
  picking: achaPicking.url,
  forestWalk: achaForestWalk.url,
  sorting: achaSorting.url,
  dryingAerial: achaDryingAerial.url,
  dryingDiscussion: achaDryingDiscussion.url,
  basket: achaBasket.url,
  pickerSmile: achaPickerSmile.url,
  pickerPortrait: achaPickerPortrait.url,
};

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
  heroSlides?: { image: string; title: string; body: string }[];
  images: SectorImage[];
  processSteps: { step: string; description: string; duration: string; benefit?: string; image?: string }[];
  certifications: string[];
  partnerships: string[];
  dataMetrics: {
    production: { year: string; value: number }[];
    quality: { metric: string; score: number }[];
  };
  locations: { name: string; projects: number; coords: number[] }[];
  videos: { title: string; thumbnail: string; duration: string }[];
  videoFiles?: { title: string; src: string; poster: string; category?: string }[];
  solutions?: { title: string; description: string }[];
  advantages?: { title: string; description: string }[];
  partnerStrip?: { label: string; names: string[] }[];
}

export const sectorData: Record<string, Sector> = {
  'real-estate': {
    slug: 'real-estate',
    path: '/bella-real-estate',
    title: 'Bella Real Estate',
    tagline: 'Bella Riverside Apartment in the prime location of Downtown Bole, Wollo Sefer.',
    description: 'Discover Bella Riverside Apartment in Downtown Bole, Wollo Sefer, Addis Ababa.',
    overviewHeading: 'One address. Bella Riverside Apartment.',
    content:
      'Our focus is Bella Riverside Apartment, located in Downtown Bole, Wollo Sefer. Connect directly with Rahel Tsegaye to discuss the property, ask about current availability, and arrange a tour. Our sales team is your point of contact throughout your enquiry.',
    vision: 'Shaping the Future of Urban Development',
    mission:
      'To create sustainable, innovative, and community-focused real estate solutions that enhance quality of life while delivering exceptional returns to our partners.',
    resources: ['Property Investment Guide', 'Market Analysis Report', 'Development Portfolio', 'Sustainability Whitepaper'],
    stats: {},
    heroImage: bellaRiversideHero.url,
    images: [],
    processSteps: [
      { step: 'Meet Your Sales Contact', description: 'Contact Rahel to discuss Bella Riverside Apartment and your requirements.', duration: '' },
      { step: 'Arrange a Tour', description: 'Agree on a convenient viewing time directly with our sales team.', duration: '' },
      { step: 'Explore the Details', description: 'Discuss current availability, apartment details, and purchase terms with your sales contact.', duration: '' },
      { step: 'Discuss Next Steps', description: 'Ask our sales team about the documentation and next steps for your enquiry.', duration: '' },
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
    locations: [],
    videos: [],
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
    heroSlides: [
      {
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80',
        title: 'Medical Devices & Equipment',
        body: 'Sourcing advanced diagnostics, including Mindray ultrasound systems, for hospitals and clinics across Ethiopia.',
      },
      {
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
        title: 'Clinical Consumables',
        body: 'High-volume essentials including syringes, SriTrang gloves, and Tedia blood collection tubes, always in stock.',
      },
      {
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1920&q=80',
        title: 'Pharmaceuticals',
        body: 'Importation and distribution of essential medicines, delivered through a compliant, nationwide supply chain.',
      },
      {
        image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1920&q=80',
        title: 'Technical Services',
        body: 'Expert installation, calibration, training and preventive maintenance by licensed biomedical engineers.',
      },
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
      { step: 'Consult', description: 'Assess your clinical and operational needs', duration: '', benefit: 'The right solution from the start', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80' },
      { step: 'Recommend', description: 'Design fit-for-purpose solutions', duration: '', benefit: 'Reduced investment risk', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
      { step: 'Finance', description: 'Arrange flexible financing', duration: '', benefit: 'Affordable technology access', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80' },
      { step: 'Supply', description: 'Deliver quality clinical technology', duration: '', benefit: 'Reliable product availability', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
      { step: 'Install', description: 'Install, commission, and validate', duration: '', benefit: 'Ready for clinical use', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
      { step: 'Train', description: 'Train clinical and technical teams', duration: '', benefit: 'Confident equipment utilization', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
      { step: 'Support', description: 'Maintain, support, and respond', duration: '', benefit: 'Maximum equipment uptime', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
      { step: 'Grow', description: 'Upgrade and optimize solutions', duration: '', benefit: 'Future-ready healthcare facilities', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80' },
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
      { title: 'Inside Bella Healthcare', src: bhVideo1.url, poster: bhPoster1.url, category: 'Our Company' },
      { title: 'Medical Equipment in Action', src: bhVideo2.url, poster: bhPoster2.url, category: 'Clinical Technology' },
      { title: 'Serving Ethiopian Healthcare', src: bhVideo3.url, poster: bhPoster3.url, category: 'Partnerships' },
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
          'Expert installation, calibration, training and preventive maintenance by licensed biomedical engineers.',
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
    heroImage: achaMedia.heroHighlands,
    heroSlides: [
      {
        image: achaMedia.heroHighlands,
        title: 'Forest-Grown Origin',
        body: 'Coffee cultivated under the natural canopy of Ethiopia\u2019s highland forests.',
      },
      {
        image: achaMedia.picking,
        title: 'Hand-Picked Harvest',
        body: 'Ripe cherries selected by hand, one branch at a time, by our partner farmers.',
      },
      {
        image: achaMedia.sorting,
        title: 'Processed with Care',
        body: 'Sun-dried on raised beds and meticulously sorted before export.',
      },
    ],
    images: [
      { src: achaMedia.forestWalk, title: 'Forest Plantations', description: 'Coffee growing wild under the highland forest canopy' },
      { src: achaMedia.dryingAerial, title: 'Raised Drying Beds', description: 'Cherries sun-drying on raised beds at the washing station' },
      { src: achaMedia.dryingDiscussion, title: 'Quality Control', description: 'Our team reviewing parchment coffee with partner farmers' },
      { src: achaMedia.pickerSmile, title: 'Harvest Season', description: 'A partner farmer with her hand-picked cherries' },
      { src: achaMedia.basket, title: 'Export Ready', description: 'Ripe cherries gathered and prepared for processing' },
    ],
    processSteps: [
      { step: 'Pre Harvesting', description: 'Sustainable farming practices in forest conditions', duration: '9-12 months', image: achaMedia.cherriesBranch },
      { step: 'Harvesting', description: 'Hand-picked selection of ripe cherries', duration: '3-4 months', image: achaMedia.picking },
      { step: 'Processing', description: 'Wet and dry processing methods', duration: '2-4 weeks', image: achaMedia.sorting },
      { step: 'Export', description: 'Quality control and international shipping', duration: '1-2 weeks', image: achaMedia.basket },
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
    videos: [],
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