
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Leadership = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-marcellus text-5xl font-normal text-foreground leading-tight mb-6">
              Leadership
            </h1>
            <p className="text-muted-foreground font-inter text-xl leading-relaxed">
              Meet the visionary leaders driving Bella International's success.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leadership;
