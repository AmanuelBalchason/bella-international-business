
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedCounter from '../components/AnimatedCounter';
import { Mail, Phone, MapPin } from 'lucide-react';

const Leadership = () => {
  const leaders = [
    {
      name: "Abel Yeshitila",
      title: "CEO, Bella International Business",
      email: "ceo@bellainter.com",
      quote: "Our success is measured by the value we bring to our employees, partners, and clients. We foster strategic partnerships based on trust, transparency, and mutual benefit.",
      description: "Abel founded Bella International with a vision to create lasting value across multiple sectors. With over 15 years of experience in strategic business development, he has led the company from its humble beginnings to becoming a regional leader in the Horn of Africa.",
      achievements: ["Founded Bella International in 2008", "Established strategic partnerships across 4 key sectors", "Created employment for 400+ individuals"],
      initials: "AY"
    },
    {
      name: "Mulugeta Demissie", 
      title: "Senior Advisor to the CEO",
      email: "mulugeta@bellainter.com",
      quote: "Innovation and strategic thinking drive our approach to business development. We continuously adapt to market changes while maintaining our core values.",
      description: "Mulugeta brings decades of experience in business strategy and market development. His expertise in identifying emerging opportunities has been instrumental in Bella's expansion across the Horn of Africa.",
      achievements: ["30+ years in strategic business development", "Led market expansion initiatives", "Architect of strategic partnerships"],
      initials: "MD"
    },
    {
      name: "Chirotaw Assefa",
      title: "CFO and COO, Bella International",
      email: "chirotaw@bellainter.com", 
      quote: "Financial excellence and operational efficiency are the foundations of sustainable growth. We ensure every investment creates lasting value.",
      description: "Chirotaw oversees both financial operations and day-to-day management at Bella International. His dual role ensures seamless integration between financial planning and operational execution.",
      achievements: ["Managed initial capital of Birr 4,563,630", "Oversees operations across 4 business sectors", "Implemented financial systems for sustainable growth"],
      initials: "CA"
    },
    {
      name: "Temesgen Wubayehu",
      title: "Managing Director, Bella Healthcare",
      email: "temesgen@bellainter.com",
      quote: "Healthcare is not just about business—it's about improving lives. Our commitment to quality healthcare drives everything we do in this sector.",
      description: "Temesgen leads Bella's healthcare division with a focus on providing accessible, high-quality medical services. His leadership has established Bella Healthcare as a trusted name in the region.",
      achievements: ["Established Bella Healthcare division", "Launched multiple medical facilities", "Pioneered healthcare partnerships"],
      initials: "TW"
    }
  ];

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Leadership
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed max-w-3xl mx-auto">
              Meet the visionary leaders driving Bella International's success across the Horn of Africa. 
              Our leadership team combines decades of experience with innovative thinking to create lasting value.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <AnimatedCounter end={15} suffix="+" delay={200} duration={2000} />
              <p className="text-muted-foreground font-inter text-sm">Years of Growth</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={4} delay={200} duration={2000} />
              <p className="text-muted-foreground font-inter text-sm">Business Sectors</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={100} suffix="+" delay={200} duration={2000} />
              <p className="text-muted-foreground font-inter text-sm">Strategic Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profiles */}
      {leaders.map((leader, index) => (
        <section key={index} className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-secondary'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              
              {/* Image */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="w-full h-[500px] bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/10 mx-auto flex items-center justify-center">
                      <span className="text-primary font-marcellus text-3xl">{leader.initials}</span>
                    </div>
                    <p className="text-muted-foreground font-inter text-sm">Leadership Portrait</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div>
                  <h2 className="font-marcellus text-3xl font-normal text-foreground mb-2">{leader.name}</h2>
                  <p className="text-primary font-inter font-medium text-lg mb-4">{leader.title}</p>
                  <div className="flex items-center space-x-2 mb-6">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-muted-foreground font-inter text-sm">{leader.email}</p>
                  </div>
                </div>
                
                <blockquote className="font-marcellus text-xl font-normal text-foreground leading-relaxed border-l-4 border-primary pl-6">
                  "{leader.quote}"
                </blockquote>
                
                <p className="text-muted-foreground font-inter leading-relaxed">
                  {leader.description}
                </p>
                
                <div>
                  <h4 className="font-inter font-semibold text-foreground mb-4">Key Achievements</h4>
                  <ul className="space-y-2">
                    {leader.achievements.map((achievement, i) => (
                      <li key={i} className="text-muted-foreground font-inter text-sm flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Company Heritage */}
      <section className="bg-primary py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-marcellus text-4xl font-normal text-primary-foreground mb-8">
            34 Years of Experience
          </h2>
          <p className="text-primary-foreground/80 font-inter text-lg leading-relaxed">
            Our amazing journey started at a family-run historic coffee farm, nestled close to the place where 
            the legendary Khaldi first discovered coffee beans. This inspired the birth of Bella International Business, 
            and throughout our journey, we've created job opportunities for over 400 permanent and contract employees 
            as we continue to expand our horizons across the Horn of Africa.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leadership;
