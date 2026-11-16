import { useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Reveal } from '@/components/Reveal';

const imgs = import.meta.glob('@/assets/zoncare/*.webp.asset.json', { eager: true }) as Record<string, { default: { url: string } }>;
const img = (id: string) => Object.entries(imgs).find(([k]) => k.endsWith(`/${id}.webp.asset.json`))?.[1].default.url ?? '';

export const ZONCARE_DEVICES = [
  { id: 'viv60', name: 'ViV 60', type: 'Color Doppler ultrasound system', cat: 'Ultrasound systems' },
  { id: 'imac12', name: 'iMAC 12', type: 'Tablet ECG machine', cat: 'ECG machines' },
  { id: 'viv40', name: 'ViV 40', type: 'Color Doppler ultrasound system', cat: 'Ultrasound systems' },
  { id: 'viv20', name: 'ViV 20', type: 'Color Doppler ultrasound system', cat: 'Ultrasound systems' },
  { id: 'm70', name: 'M70', type: 'Portable color Doppler ultrasound', cat: 'Ultrasound systems' },
  { id: 'm30', name: 'M30', type: 'Portable color Doppler ultrasound', cat: 'Ultrasound systems' },
  { id: 'i50', name: 'i50', type: 'Portable B/W ultrasound system', cat: 'Ultrasound systems' },
  { id: 'imac120', name: 'iMAC 120', type: '12-channel ECG machine', cat: 'ECG machines' },
  { id: 'imac300', name: 'iMAC 300', type: '3-channel ECG machine', cat: 'ECG machines' },
  { id: 'imac1800', name: 'iMAC 1800', type: '12-lead ECG machine', cat: 'ECG machines' },
  { id: 'imac1800pro', name: 'iMAC 1800PRO', type: '12/18-lead ECG machine', cat: 'ECG machines' },
  { id: 'e12', name: 'E12', type: '12-channel ECG machine', cat: 'ECG machines' },
  { id: 'e30', name: 'E30', type: '3-channel ECG machine', cat: 'ECG machines' },
  { id: 'a20', name: 'A20', type: 'Modular patient monitor', cat: 'Patient monitors' },
  { id: 'a40', name: 'A40', type: 'Modular patient monitor', cat: 'Patient monitors' },
  { id: 'pm7000d', name: 'PM-7000D', type: 'Compact patient monitor', cat: 'Patient monitors' },
];

const DEMO_MSG = 'Hello Bella Healthcare, I would like to request a Zoncare demonstration. Device(s) of interest: __. Facility/organisation: __. Clinical requirements: __.';
export const bannerWa = `https://wa.me/251983233333?text=${encodeURIComponent(DEMO_MSG)}`;
export const deviceWa = (name: string) =>
  `https://wa.me/251913941530?text=${encodeURIComponent(DEMO_MSG.replace('Device(s) of interest: __', `Device(s) of interest: Zoncare ${name}`))}`;

/** Fixed launch banner replacing the Healthcare hero slider. */
export const ZoncareBanner = () => {
  const { t } = useLanguage();
  return (
    <section className="zoncare font-dmsans bg-zoncare-pale text-zoncare-ink pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-5">{t('Bella Healthcare × Zoncare')}</p>
          <h1 className="font-tiltwarp text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            {t('Zoncare ultrasound.')}<br />
            <span className="bg-zoncare-peach px-2 box-decoration-clone">{t('Supported in Ethiopia.')}</span>
          </h1>
          <p className="text-lg md:text-xl font-medium mt-6 max-w-xl">{t('Bella Healthcare is Zoncare’s exclusive distributor for ultrasound systems in Ethiopia.')}</p>
          <p className="text-base text-zoncare-ink/75 mt-3 max-w-xl">{t('Explore ultrasound systems, ECG machines and patient monitors, with local consultation, financing, installation, training and technical support.')}</p>
          <div className="flex flex-wrap items-center gap-5 mt-8">
            <a href={bannerWa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-zoncare-ink text-zoncare-pale px-7 py-3.5 font-semibold active:scale-95 transition-transform">
              <MessageCircle className="w-4 h-4" /> {t('Request demo')}
            </a>
            <a href="#zoncare-portfolio" className="font-semibold underline underline-offset-4">{t('Explore the portfolio')}</a>
          </div>
          <p className="text-sm text-zoncare-ink/65 mt-4 max-w-md">{t('Register your interest in an upcoming demonstration. Our team will confirm availability and arrangements with you.')}</p>
        </div>
        <div className="bg-background aspect-[3/2] flex items-center justify-center overflow-hidden">
          <img src={img('viv60')} alt={t('Zoncare ViV 60 color Doppler ultrasound system')} className="h-full w-full object-contain" />
        </div>
      </div>
    </section>
  );
};

/** Partnership explanation + horizontal device card carousel + final demo invitation. */
export const ZoncarePartnership = () => {
  const { t } = useLanguage();
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <section className="zoncare font-dmsans bg-background text-zoncare-ink py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-5">{t('Our Partnership with Zoncare')}</p>
          <h2 className="font-tiltwarp text-3xl sm:text-4xl md:text-5xl leading-tight">{t('Exclusive distribution.')}<br />{t('Local support.')}</h2>
          <p className="mt-6 text-base md:text-lg text-zoncare-ink/80">{t('Bella Healthcare and Zoncare have established an exclusive distribution partnership for Zoncare ultrasound systems in Ethiopia. For radiologists, clinicians and procurement teams, Bella provides a local point of contact for system selection, financing, installation, training and technical support.')}</p>
          <p className="mt-4 text-base md:text-lg text-zoncare-ink/80">{t('Alongside ultrasound systems, explore Zoncare’s ECG and patient monitoring portfolio. Discuss your clinical requirements with our team and register your interest in a demonstration.')}</p>
          <p className="mt-6 text-sm font-semibold tracking-wide">{t('Consultation · Financing · Installation · Training · Technical support')}</p>
        </Reveal>

        <div id="zoncare-portfolio" className="mt-16 md:mt-20 scroll-mt-28">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="font-tiltwarp text-2xl sm:text-3xl md:text-4xl">{t('Explore the Zoncare portfolio.')}</h3>
              <p className="mt-3 text-zoncare-ink/75 max-w-2xl">{t('Review the systems and features relevant to your practice, clinic or hospital. Select a device to explore its features and request a demonstration.')}</p>
            </div>
            <div className="hidden sm:flex gap-2 shrink-0">
              <button aria-label={t('Previous devices')} onClick={() => scroll(-1)} className="w-11 h-11 border border-zoncare-ink/30 flex items-center justify-center hover:bg-zoncare-ink hover:text-zoncare-pale active:scale-95"><ChevronLeft className="w-5 h-5" /></button>
              <button aria-label={t('Next devices')} onClick={() => scroll(1)} className="w-11 h-11 border border-zoncare-ink/30 flex items-center justify-center hover:bg-zoncare-ink hover:text-zoncare-pale active:scale-95"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div ref={track} className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
            {ZONCARE_DEVICES.map((d) => (
              <article key={d.id} className="group relative shrink-0 snap-start w-[82%] sm:w-[46%] lg:w-[31%] xl:w-[23.5%] border border-zoncare-ink/15 bg-background">
                <img src={img(d.id)} alt={`Zoncare ${d.name} — ${t(d.type)}`} loading="lazy" className="w-full aspect-[1238/1330] object-contain" />
                <div className="px-4 py-3 border-t border-zoncare-ink/10 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-wider text-zoncare-ink/60">{t(d.cat)}</span>
                  <a href={deviceWa(d.name)} target="_blank" rel="noopener noreferrer" className="md:hidden text-sm font-semibold underline underline-offset-4 active:opacity-60">{t('Request demo')}</a>
                </div>
                <a href={deviceWa(d.name)} target="_blank" rel="noopener noreferrer" aria-label={`${t('Request demo')} — ${d.name}`}
                  className="hidden md:flex absolute inset-x-4 bottom-16 items-center justify-center gap-2 bg-zoncare-ink text-zoncare-pale py-3 font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0 transition-all duration-300">
                  <MessageCircle className="w-4 h-4" /> {t('Request demo')}
                </a>
              </article>
            ))}
          </div>
          <p className="text-sm text-zoncare-ink/65 mt-4">{t('Ask our team about configurations, pricing, financing and demonstration arrangements for your selected device.')}</p>
        </div>

        <Reveal className="mt-20 bg-zoncare-pale p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="font-tiltwarp text-2xl md:text-3xl">{t('Discuss your next diagnostic system.')}</h3>
            <p className="mt-3 text-zoncare-ink/80 max-w-2xl">{t('Tell us which Zoncare device interests you and what your facility needs. Bella Healthcare will discuss configurations, pricing, financing and demonstration arrangements with you.')}</p>
            <p className="mt-2 text-sm text-zoncare-ink/65">{t('Demonstration appointments will be confirmed by our team.')}</p>
          </div>
          <a href={bannerWa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-zoncare-ink text-zoncare-pale px-7 py-3.5 font-semibold active:scale-95 transition-transform">
            <MessageCircle className="w-4 h-4" /> {t('Request demo')}
          </a>
        </Reveal>
      </div>
    </section>
  );
};
