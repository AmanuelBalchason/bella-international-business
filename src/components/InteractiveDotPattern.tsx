import React, { useEffect, useRef } from 'react';

interface InteractiveDotPatternProps {
  className?: string;
  dotSize?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
}

const InteractiveDotPattern: React.FC<InteractiveDotPatternProps> = ({
  className = "",
  dotSize = 1.4,
  spacing = 26,
  color = "hsl(var(--primary))",
  opacity = 0.12
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resolveColor = () => {
      if (color.startsWith('hsl(var(')) {
        const varName = color.slice(color.indexOf('--'), color.indexOf(')'));
        const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return value ? `hsl(${value} / ` : 'hsla(134, 20%, 40%, ';
      }
      return null;
    };

    let colorPrefix = resolveColor();

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const fill = (alpha: number) =>
      colorPrefix ? `${colorPrefix}${alpha})` : `hsla(134, 20%, 40%, ${alpha})`;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const radius = 140;
      const { x: mx, y: my } = mouse.current;

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = reduced ? 0 : Math.max(0, 1 - dist / radius);
          const eased = influence * influence;

          ctx.beginPath();
          ctx.arc(x, y, dotSize + eased * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = fill(opacity + eased * 0.4);
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    colorPrefix = resolveColor();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotSize, spacing, color, opacity]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
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