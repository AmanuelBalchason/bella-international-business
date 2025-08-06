import React from 'react';

interface StaticDotPatternProps {
  className?: string;
  opacity?: number;
}

const StaticDotPattern: React.FC<StaticDotPatternProps> = ({ 
  className = "", 
  opacity = 0.1 
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 1 }}>
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) ${opacity}, transparent ${opacity})`,
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 40%, black 60%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 40%, black 60%, transparent 80%)'
        }}
      />
    </div>
  );
};

export default StaticDotPattern;