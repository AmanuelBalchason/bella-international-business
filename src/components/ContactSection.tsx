
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ContactSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="bg-primary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary-foreground/80 font-inter text-sm uppercase tracking-wider mb-4">Stay Connected</p>
          <h2 className="font-marcellus text-4xl font-normal text-primary-foreground leading-tight mb-8">
            Let Us Reach You
          </h2>
          <p className="text-primary-foreground/80 font-inter text-lg max-w-2xl mx-auto">
            Subscribe to our newsletter for insights on business excellence, strategic partnerships, and industry developments across Eastern Africa.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-white text-foreground placeholder:text-muted-foreground font-inter rounded-none"
              required
            />
            <Button 
              type="submit"
              className="bg-foreground hover:bg-foreground/90 text-background font-inter font-medium px-8 rounded-none ml-0"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
