
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import LocationLink from '../components/LocationLink';
import { useCreateContactSubmission } from '../hooks/useContactSubmissions';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const createSubmission = useCreateContactSubmission();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubmission.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        form_type: 'contact_page'
      });
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon at info@bellainter.com",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly at info@bellainter.com",
        variant: "destructive",
      });
    }
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
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Contact Us
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed">
              Get in touch with our team for strategic business partnerships and opportunities across the Horn of Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="animate-fade-in">
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
                  disabled={createSubmission.isPending}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium px-12 py-4 rounded-none w-full"
                >
                  {createSubmission.isPending ? 'Sending...' : 'Send'}
                </Button>
              </form>
            </div>
            
            {/* Contact Map & Info */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-full h-[400px] rounded-lg overflow-hidden border border-border">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.855468811491!2d38.767563976057204!3d8.985444091074173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2set!4v1751109689891!5m2!1sen!2set" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-inter font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground font-inter text-sm">+251 962 777777</p>
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
                    <LocationLink />
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
