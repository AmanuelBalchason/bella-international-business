
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: 'What sectors does Bella International Business operate in?',
      answer: 'We operate across four core sectors: Real Estate, Healthcare, Agri-Business, and Automotives, providing comprehensive solutions and strategic partnerships in each area.'
    },
    {
      question: 'How does Bella International approach strategic partnerships?',
      answer: 'Our partnerships are built on trust, transparency, and mutual benefit. We focus on cultivating long-term relationships that create value for all stakeholders involved.'
    },
    {
      question: 'What makes Bella International unique in Eastern Africa?',
      answer: 'Our research-focused approach, commitment to uncompromised quality, and ethical foundation set us apart. We combine entrepreneurial expertise with personalized service.'
    },
    {
      question: 'How can organizations partner with Bella International?',
      answer: 'We welcome strategic partnerships that align with our core values and vision. Contact us to discuss how we can create mutual value and long-lasting business relationships.'
    },
    {
      question: 'What is Bella International\'s approach to community engagement?',
      answer: 'We are dedicated to serving the communities where we operate, focusing on sustainable development and creating positive impact through our business activities.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-muted-foreground font-inter text-sm uppercase tracking-wider mb-4">Support</p>
          <h2 className="font-marcellus text-4xl font-normal text-foreground leading-tight">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
              <div className="border border-border">
                <CollapsibleTrigger className="w-full p-6 text-left flex justify-between items-center hover:bg-secondary/50 transition-colors duration-200">
                  <h3 className="font-inter font-medium text-foreground text-lg pr-8">{faq.question}</h3>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-inter text-xl">
                      {openItems.includes(index) ? '−' : '+'}
                    </span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <p className="text-muted-foreground font-inter leading-relaxed">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
