
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Contact Us
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed">
              Get in touch with our team for strategic business partnerships and opportunities across the Horn of Africa.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
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

      {/* Main Contact Section */}
      <section className="bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <h2 className="font-marcellus text-3xl font-normal text-foreground mb-8">
                Leave Us A Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white border-border font-inter rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white border-border font-inter rounded-none"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white border-border font-inter min-h-[150px] rounded-none resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-12 py-4 rounded-none w-full"
                >
                  Send
                </Button>
              </form>
            </div>
            
            {/* Contact Image & Info */}
            <div className="space-y-8">
              <div className="w-full h-[400px] bg-gradient-to-br from-muted to-secondary border border-border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
                    <span className="text-primary font-marcellus text-2xl">B</span>
                  </div>
                  <p className="text-muted-foreground font-inter text-sm">Bella International Headquarters</p>
                </div>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground font-inter text-sm">+251 XXX XXX XXX</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground font-inter text-sm">info@bellainter.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground font-inter text-sm">Addis Ababa, Ethiopia<br />Horn of Africa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-marcellus text-3xl font-normal text-primary-foreground mb-4">
            Ready to Partner With Us?
          </h3>
          <p className="text-primary-foreground/80 font-inter text-lg">
            Join our network of strategic partners and unlock opportunities across the Horn of Africa.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
