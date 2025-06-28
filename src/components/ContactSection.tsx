
import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-slate-700 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-32 h-4 bg-gray-300 rounded mx-auto mb-4"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">SECTION LABEL</span>
          
          <div className="w-1/3 h-10 bg-gray-200 rounded mx-auto mt-6"></div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">CONTACT TITLE</span>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex">
            <div className="flex-1 h-12 bg-gray-300 rounded-l-lg"></div>
            <div className="w-20 h-12 bg-gray-400 rounded-r-lg"></div>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">EMAIL INPUT</span>
            <span className="text-xs bg-gray-200 px-1 py-0.5 rounded ml-2">SEND BTN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
