import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectorImage } from '@/data/sectors';

interface SectorCarouselProps {
  images: SectorImage[];
}

const SectorCarousel = ({ images }: SectorCarouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  }, []);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    let closest = 0;
    let min = Infinity;
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < min) {
        min = distance;
        closest = i;
      }
    });
    setActive(closest);
  };

  useEffect(() => {
    setActive(0);
  }, [images]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pr-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="snap-start shrink-0 w-[85%] sm:w-[70%] lg:w-[62%] bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <figcaption className="p-6">
              <h3 className="font-marcellus text-xl text-foreground mb-2">{image.title}</h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">{image.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={`h-1.5 transition-all duration-300 ${
                index === active ? 'w-8 bg-primary' : 'w-3 bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous slide"
            onClick={() => scrollToIndex(Math.max(active - 1, 0))}
            className="w-10 h-10 border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => scrollToIndex(Math.min(active + 1, images.length - 1))}
            className="w-10 h-10 border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectorCarousel;