import { useEffect, useState } from 'react';
import { Building2, CalendarDays, Car, ChevronLeft, ChevronRight, FileCheck2, Hotel, Pause, Play, Zap, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';
import { useT } from '@/i18n/LanguageProvider';

const amenities = [
  { title: 'Behind Best Western Hotel', detail: 'Downtown Bole, Wollo Sefer, Addis Ababa', icon: Hotel },
  { title: 'Only 2 apartments per floor', detail: 'Ultimate privacy: only 2 units per floor', icon: Building2 },
  { title: 'Handover in 6 months', detail: '50% down payment · 50% within 6 months', icon: CalendarDays },
  { title: 'Digital title deed ready', detail: 'Legal security: Digital Title Deeds (ካርታ) already prepared and ready for handover', icon: FileCheck2 },
  { title: 'Standby generator & water', detail: 'Standby backup generator and reliable water supply.', icon: Zap },
  { title: '4 basement parking', detail: 'Four levels of basement parking.', icon: Car },
];
const DELAY = 7000;

export default function RealEstateAmenities() {
  const t = useT();
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [restart, setRestart] = useState(0);
  const playing = inView && !reduced && !paused && !interacting;

  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min((now - start) / DELAY, 1);
      setProgress(next);
      if (next < 1) frame = requestAnimationFrame(tick);
      else { setProgress(0); setIndex((current) => (current + 1) % amenities.length); }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, index, restart]);

  const go = (next: number) => {
    setIndex((next + amenities.length) % amenities.length);
    setProgress(0);
    setRestart((value) => value + 1);
  };
  const amenity = amenities[index];
  const Icon = amenity.icon;

  return (
    <div ref={ref} className="mb-12" role="region" aria-roledescription={t('Slideshow')} aria-label={t('Amenities')}
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h3 className="font-marcellus text-2xl text-foreground">{t('Amenities')}</h3>
        <div className="flex gap-1 sm:gap-2">
          {amenities.map((item, i) => {
            const ItemIcon = item.icon;
            return <Button key={item.title} type="button" variant="outline" size="icon"
              title={t(item.title)} aria-label={t(item.title)} aria-pressed={i === index} onClick={() => go(i)}
              className={`rounded-none w-8 h-10 sm:w-10 ${i === index ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground' : 'text-muted-foreground'}`}>
              <ItemIcon aria-hidden="true" />
            </Button>;
          })}
        </div>
      </div>
      <div className="relative grid md:grid-cols-3 border border-border border-t-2 border-t-primary overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-border z-10" aria-hidden="true">
          <div className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="relative bg-primary text-primary-foreground min-h-48 md:min-h-80 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 320 280" className="absolute w-full h-full text-primary-foreground/15" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20 250H300M75 250V65L160 25L245 65V250M75 65L160 105L245 65M160 105V250" />
            {[115, 150, 185, 220].map((y) => <path key={y} d={`M75 ${y - 40}L160 ${y}L245 ${y - 40}`} />)}
          </svg>
          <div key={index} className={`relative flex items-center gap-5 ${reduced ? '' : 'animate-fade-in'}`}>
            <Icon className="w-20 h-20 sm:w-24 sm:h-24" strokeWidth={1} />
            {index === 4 && <Droplets className="w-14 h-14" strokeWidth={1} />}
          </div>
          <span className="absolute bottom-4 left-5 font-marcellus text-3xl text-primary-foreground/70">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="md:col-span-2 bg-background p-6 sm:p-10 flex flex-col min-h-72 md:min-h-80">
          <div key={index} className={`flex-1 ${reduced ? '' : 'animate-fade-in'}`} aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
            <p className="font-inter text-xs uppercase tracking-wider text-primary mb-3">{t('Bella Riverside Apartment')} · {index + 1} / {amenities.length}</p>
            <h4 className="font-marcellus text-2xl sm:text-3xl text-foreground mb-4">{t(amenity.title)}</h4>
            <p className="font-inter text-sm sm:text-base text-muted-foreground leading-relaxed">{t(amenity.detail)}</p>
          </div>
          <div className="flex gap-3 mt-6 pt-5 border-t border-border">
            <Button type="button" variant="outline" size="icon" className="rounded-none" onClick={() => go(index - 1)} aria-label={t('Previous amenity')} title={t('Previous amenity')}><ChevronLeft /></Button>
            <Button type="button" variant="outline" size="icon" className="rounded-none" onClick={() => go(index + 1)} aria-label={t('Next amenity')} title={t('Next amenity')}><ChevronRight /></Button>
            {!reduced && <Button type="button" variant="ghost" size="icon" className="rounded-none ml-auto" onClick={() => setPaused((value) => !value)} aria-label={t(paused ? 'Play slideshow' : 'Pause slideshow')} title={t(paused ? 'Play slideshow' : 'Pause slideshow')}>{paused ? <Play /> : <Pause />}</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}