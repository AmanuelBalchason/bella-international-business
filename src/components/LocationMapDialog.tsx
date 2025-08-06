import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface LocationMapDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    name: string;
    coords: number[];
    projects: number;
  };
}

const LocationMapDialog = ({ isOpen, onClose, location }: LocationMapDialogProps) => {
  // Generate Google Maps embed URL with the location coordinates
  const generateMapUrl = (coords: number[]) => {
    const [lng, lat] = coords;
    return `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.855468811491!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2set!4v1751109689891!5m2!1sen!2set`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-marcellus text-2xl">{location.name}</DialogTitle>
          <p className="text-muted-foreground">{location.projects} active projects</p>
        </DialogHeader>
        <div className="w-full">
          <iframe 
            src={generateMapUrl(location.coords)}
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
  );
};

export default LocationMapDialog;