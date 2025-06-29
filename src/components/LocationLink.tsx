
import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';

const LocationLink = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowMap(true)}
        className="text-left text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 hover-underline"
      >
        Ethio-China Street, Addis Ababa, Ethiopia
      </button>

      {/* Map Overlay */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-marcellus text-xl font-normal text-foreground">
                  Bella International Headquarters
                </h3>
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-left text-muted-foreground font-inter text-sm mb-4">
                Ethio-China Street, Addis Ababa, Ethiopia
              </p>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.855468811491!2d38.767563976057204!3d8.985444391074173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2set!4v1751109689891!5m2!1sen!2set"
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationLink;
