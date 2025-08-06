import React, { useEffect, useRef, useState } from 'react';

interface InteractiveDotPatternProps {
  className?: string;
  dotSize?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
}

const InteractiveDotPattern: React.FC<InteractiveDotPatternProps> = ({
  className = "",
  dotSize = 2,
  spacing = 20,
  color = "hsl(134, 20%, 40%)",
  opacity = 0.15
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<Array<{ x: number, y: number, timestamp: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setClicks(prev => [...prev, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: Date.now()
      }]);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw dots
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          
          // Calculate distance from mouse
          const distanceFromMouse = Math.sqrt(
            Math.pow(x - mousePos.x, 2) + Math.pow(y - mousePos.y, 2)
          );
          
          // Calculate distance from recent clicks
          let clickInfluence = 0;
          const currentTime = Date.now();
          clicks.forEach(click => {
            const age = currentTime - click.timestamp;
            if (age < 1000) { // Effect lasts 1 second
              const distanceFromClick = Math.sqrt(
                Math.pow(x - click.x, 2) + Math.pow(y - click.y, 2)
              );
              const influence = Math.max(0, 1 - (distanceFromClick / 100)) * (1 - age / 1000);
              clickInfluence = Math.max(clickInfluence, influence);
            }
          });
          
          // Mouse proximity effect
          const mouseInfluence = Math.max(0, 1 - (distanceFromMouse / 80));
          
          // Combine influences
          const totalInfluence = Math.max(mouseInfluence, clickInfluence);
          
          // Calculate dot properties
          const finalOpacity = opacity + (totalInfluence * 0.4);
          const finalSize = dotSize + (totalInfluence * 2);
          
          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, finalSize, 0, Math.PI * 2);
          ctx.fillStyle = color.includes('hsl') 
            ? color.replace(')', `, ${finalOpacity})`)
            : `${color}${Math.round(finalOpacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      }
      
      requestAnimationFrame(animate);
    };

    // Clean up old clicks
    const cleanupInterval = setInterval(() => {
      const currentTime = Date.now();
      setClicks(prev => prev.filter(click => currentTime - click.timestamp < 1000));
    }, 100);

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      clearInterval(cleanupInterval);
    };
  }, [mousePos, clicks, dotSize, spacing, color, opacity]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ zIndex: 1 }}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default InteractiveDotPattern;