import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ExecutiveSummaryProps {
  points: string[];
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ points }) => {
  return (
    <div className="bg-secondary/50 border-l-4 border-primary p-8 mb-12 rounded-r-lg">
      <h3 className="font-marcellus text-2xl font-normal text-foreground mb-6 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-primary" />
        Executive Summary
      </h3>
      <ul className="space-y-4">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-foreground leading-relaxed">
            <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
            <span className="font-inter">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};