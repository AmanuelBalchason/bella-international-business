import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useInView';

export interface ProcessStep {
  step: string;
  description: string;
  duration: string;
  benefit?: string;
  image?: string;
}

const DURATION = 7000;

const ProcessCarousel = ({ steps }: { steps: ProcessStep[] }) => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || steps.length < 2) return;
    setProgress(0);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const pct = Math.min((now - start) / DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setIndex((i) => (i + 1) % steps.length);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, paused, reduced, steps.length]);

  const go = (next: number) => setIndex((next + steps.length) % steps.length);
  const step = steps[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
        {steps.map((item, i) => (
          <button
            key={item.step}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Step ${i + 1}: ${item.step}`}
            className={`font-inter text-[11px] sm:text-xs tracking-wider px-3 sm:px-4 py-2 border transition-colors duration-200 ${
              i === index
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary'
            }`}
          >
            {String(i + 1).padStart(2, '0')} {item.step}
          </button>
        ))}
      </div>

      <div className="relative bg-card border border-border overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-border z-10">
          <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="relative md:col-span-1 h-56 sm:h-72 md:h-auto md:min-h-[420px] bg-secondary overflow-hidden">
            {step.image && (
              <img
                key={step.image}
                src={step.image}
                alt={`${step.step} — Bella Healthcare partnership step`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover animate-fade-in"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            <span className="absolute bottom-4 left-5 font-marcellus text-4xl md:text-5xl text-primary-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div key={index} className="md:col-span-2 p-7 sm:p-10 md:p-14 animate-fade-in">
            <p className="font-inter text-[11px] uppercase tracking-[0.22em] text-primary mb-3">
              Step {index + 1} of {steps.length}
            </p>
            <h3 className="font-marcellus text-2xl sm:text-3xl md:text-4xl text-foreground">{step.step}</h3>

            <div className="mt-7">
              <p className="font-inter text-base sm:text-lg text-foreground leading-relaxed">
                {step.benefit ? `${step.description} — so you get ${step.benefit.toLowerCase()}.` : `${step.description}.`}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-9 pt-7 border-t border-border">
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => go(index - 1)}
                className="w-11 h-11 border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => go(index + 1)}
                className="w-11 h-11 border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessCarousel;
