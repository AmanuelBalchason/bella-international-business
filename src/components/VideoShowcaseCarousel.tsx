import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/useInView';

export interface ShowcaseVideo {
  title: string;
  src: string;
  poster: string;
  category?: string;
}

const DURATION = 10000;
const GAP = 24;
const TIKTOK_URL = 'https://www.tiktok.com/@bella_healthcare_et';

const VideoShowcaseCarousel = ({ videos }: { videos: ShowcaseVideo[] }) => {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({ card: 0, pad: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;
    const cardW = card.getBoundingClientRect().width;
    setMetrics({ card: cardW, pad: Math.max((container.getBoundingClientRect().width - cardW) / 2, 0) });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Playback: only the active card plays
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.muted = true;
        video.defaultMuted = true;
        const start = () => {
          const attempt = video.play();
          if (attempt) attempt.catch(() => undefined);
        };
        if (video.readyState >= 2) {
          start();
        } else {
          video.load();
          video.addEventListener('loadeddata', start, { once: true });
        }
      } else {
        video.pause();
      }
    });
  }, [index]);

  // Auto-advance + progress line
  useEffect(() => {
    if (reduced || videos.length < 2) return;
    setProgress(0);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const pct = Math.min((now - start) / DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setIndex((i) => (i + 1) % videos.length);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, reduced, videos.length]);

  const go = (next: number) => setIndex((next + videos.length) % videos.length);

  return (
    <div className="w-full">
      <div ref={containerRef} className="relative overflow-hidden">
        <div
          className="flex items-center transition-transform duration-700 ease-in-out will-change-transform"
          style={{
            gap: `${GAP}px`,
            paddingLeft: metrics.pad,
            paddingRight: metrics.pad,
            transform: `translateX(${-index * (metrics.card + GAP)}px)`,
          }}
        >
          {videos.map((video, i) => {
            const active = i === index;
            return (
              <a
                key={video.title}
                ref={i === 0 ? cardRef : undefined}
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${video.title} — watch on our TikTok page`}
                className={`block relative shrink-0 w-[66vw] sm:w-[260px] md:w-[300px] lg:w-[320px] aspect-[9/16] overflow-hidden bg-secondary transition-all duration-700 ease-in-out ${
                  active
                    ? 'opacity-100 scale-100 shadow-[0_24px_60px_-24px_hsl(var(--foreground)/0.45)]'
                    : 'opacity-60 saturate-50 scale-[0.92] shadow-none'
                }`}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={video.src}
                  poster={video.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={i === 0}
                  preload={i === 0 ? 'auto' : 'metadata'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                {!active && <div className="absolute inset-0 bg-foreground/30" />}

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-primary-foreground">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-marcellus text-lg opacity-70">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-inter text-[10px] md:text-xs uppercase tracking-[0.22em] opacity-90">
                      {video.category ?? 'Bella Healthcare'}
                    </span>
                  </div>
                  <h3 className="font-marcellus text-lg md:text-xl leading-snug">{video.title}</h3>
                </div>

                {active && (
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-primary-foreground/25">
                    <div
                      className="h-full bg-primary-foreground"
                      style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous video"
          className="font-inter text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="flex gap-2">
          {videos.map((video, i) => (
            <button
              key={video.title}
              type="button"
              aria-label={`Show video ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-300 ${
                i === index ? 'w-8 bg-primary' : 'w-4 bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next video"
          className="font-inter text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VideoShowcaseCarousel;
