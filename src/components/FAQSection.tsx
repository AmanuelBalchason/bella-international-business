
import React from 'react';

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-48 h-4 bg-gray-400 rounded mx-auto mb-4"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">SECTION LABEL</span>
          
          <div className="w-1/3 h-10 bg-gray-500 rounded mx-auto mt-6"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">FAQ TITLE</span>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div className="w-3/4 h-5 bg-gray-500 rounded"></div>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </div>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">FAQ QUESTION {item}</span>
              <span className="text-xs bg-gray-200 px-1 py-0.5 rounded ml-2">+/-</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
