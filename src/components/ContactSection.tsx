
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { TestimonialsGrid } from './TestimonialsSection';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Required fields missing", description: "Please fill in name, email, and message.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([{
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim(),
        form_type: 'homepage_contact',
        status: 'new',
      }]);
      if (error) throw error;
      toast({ title: "Message sent!", description: "We'll get back to you shortly." });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({ title: "Failed to send", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Success Stories</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight">
            Client Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Testimonials - 2 columns */}
          <div className="lg:col-span-2">
            <TestimonialsGrid />
          </div>

          {/* Contact Form Card */}
          <div className="bg-primary p-8 text-primary-foreground">
            <h3 className="font-marcellus text-2xl mb-2">Get In Touch</h3>
            <p className="font-inter text-sm text-primary-foreground/70 mb-6">
              Send us a message and we'll respond promptly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 font-inter rounded-none"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 font-inter rounded-none"
                required
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 font-inter rounded-none"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 font-inter rounded-none resize-none"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-primary hover:bg-white/90 font-inter font-medium rounded-none"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
