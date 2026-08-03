import React, { useEffect, useState } from 'react';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

/** Animates the leading numeric part of a stat string (e.g. "500+ Annually"). */
const CountUp = ({ value, className, duration = 1400 }: CountUpProps) => {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const reduced = usePrefersReducedMotion();

  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const raw = match?.[2] ?? '';
  const suffix = match?.[3] ?? '';
  const target = raw ? Number(raw.replace(/,/g, '')) : NaN;
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    if (reduced) {
      setDisplay(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reduced]);

  if (Number.isNaN(target)) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default CountUp;