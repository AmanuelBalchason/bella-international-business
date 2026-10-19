import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import Reveal from './Reveal';
import { achaMedia } from '@/data/sectors';
import { useLanguage } from '@/i18n/LanguageProvider';
import achaBrandVideo from '@/assets/acha-brand-video.mp4.asset.json';
import achaVideoPoster from '@/assets/acha-video-poster.jpg.asset.json';

const AchaCoffeeStory = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const bands = [
    {
      image: achaMedia.forestWalk,
      eyebrow: 'Grown in the Wild',
      heading: 'Coffee Under a Forest Canopy',
      body: 'Our coffee grows the way it has for centuries — beneath the natural shade of Ethiopia\u2019s highland forests, where biodiversity protects the soil and gives every cherry its distinctive character.',
    },
    {
      image: achaMedia.dryingAerial,
      eyebrow: 'Processed with Care',
      heading: 'Sun-Dried on Raised Beds',
      body: 'After harvest, cherries are spread across raised drying beds at our washing stations — turned by hand, sorted by eye, and dried slowly under the highland sun.',
    },
  ];

  return (
    <>
      {/* Brand film intro */}
      <section className="py-20 sm:py-28 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 sm:mb-12 max-w-3xl">
            <p className="font-inter text-sm uppercase tracking-wider text-background/60 mb-4 flex items-center gap-2">
              <Play className="w-4 h-4" /> {t('Our Brand Film')}
            </p>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl leading-tight">
              {t('From Our Forests to the World')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative w-full aspect-video overflow-hidden bg-foreground/80 group">
              <video
                ref={videoRef}
                src={achaBrandVideo.url}
                poster={achaVideoPoster.url}
                controls={playing}
                preload="none"
                playsInline
                className="w-full h-full object-cover"
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              />
              {!playing && (
                <button
                  aria-label={t('Play the Acha Forest Coffee brand film')}
                  onClick={() => videoRef.current?.play()}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-colors duration-300 hover:bg-foreground/40 active:bg-foreground/50"
                >
                  <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 border-2 border-background text-background transition-transform duration-300 group-hover:scale-105">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed editorial bands */}
      {bands.map((band, index) => (
        <section key={band.heading} className="relative min-h-[70vh] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${band.image})` }}
            role="img"
            aria-label={t(band.heading)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/10" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 pt-40 w-full">
            <Reveal delay={index * 60} className="max-w-2xl">
              <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.25em] text-background/70 mb-4">
                {t(band.eyebrow)}
              </p>
              <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-background leading-tight mb-5">
                {t(band.heading)}
              </h2>
              <p className="font-inter text-base sm:text-lg text-background/85 leading-relaxed">
                {t(band.body)}
              </p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* People editorial split */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden">
              <img
                src={achaMedia.pickerPortrait}
                alt={t('A partner farmer holding a basket of hand-picked coffee cherries')}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-7">
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">
              {t('Our Partner Farmers')}
            </p>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
              {t('The People Behind Every Cup')}
            </h2>
            <p className="font-inter text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              {t('We work directly with local farming families across Kaffa, Jimma, Illubabor and Sidama — paying fair prices, sharing agronomy knowledge, and growing together season after season.')}
            </p>
            <p className="font-inter text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t('Every basket of cherries represents a household we partner with — and a forest we are committed to protecting.')}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default AchaCoffeeStory;
