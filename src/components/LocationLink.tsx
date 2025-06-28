
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const LocationLink = ({ className = "" }: { className?: string }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMapOpen(true)}
        className={`text-muted-foreground font-inter text-sm hover:text-primary transition-colors duration-200 underline ${className}`}
      >
        Ethio-China Street, Addis Ababa, Ethiopia
      </button>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-marcellus text-2xl">Our Location</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.855468811491!2d38.767563976057204!3d8.985444391074173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2set!4v1751109689891!5m2!1sen!2set" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationLink;
