
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  // FAQ content matching workbook structure
  // Each question (≤100 chars) and answer (≤300 chars)
  const faqs = [
    {
      question: 'What makes Bella International unique in the Ethiopian market?', // 68 chars (matches workbook)
      answer: 'Our 15+ years of local expertise combined with international standards creates unmatched value. We understand both global business requirements and Ethiopian market dynamics.' // 190 chars
    },
    {
      question: 'How do you ensure quality across diverse business sectors?', // 64 chars (matches workbook)
      answer: 'We maintain rigorous quality standards through sector-specific expertise, continuous training, and strategic partnerships with international leaders in each field.' // 172 chars
    },
    {
      question: 'What is your approach to market entry assistance?', // 51 chars (matches workbook)
      answer: 'We provide comprehensive market intelligence, regulatory guidance, and strategic partnerships to ensure successful market entry and sustainable growth.' // 163 chars
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
