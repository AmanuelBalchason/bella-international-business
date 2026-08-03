import React from 'react';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li';
}

const Reveal = ({ children, className, delay = 0, as = 'div' }: RevealProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        !reduced && !inView && 'opacity-0 translate-y-8',
        (reduced || inView) && 'opacity-100 translate-y-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;