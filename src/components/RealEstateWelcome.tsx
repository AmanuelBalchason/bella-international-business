import { Check, Clock, TrendingUp, KeyRound, Ruler } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import Reveal from './Reveal';
import welcomeImage from '@/assets/bella-re-welcome.webp.asset.json';

const highlights = [
  'Ultimate privacy: only 2 units per floor',
  'Stunning views: City Side (C-Side) or River Side (R-Side) overlooking Eden Park',
  'Premium facilities: 4 levels of basement parking, reliable water supply and a standby backup generator',
  'Bonus space: a dedicated 5 m² private storage room for every homeowner',
  'Legal security: Digital Title Deeds (ካርታ) already prepared and ready for handover',
];

const specs = [
  {
    name: '2-Bedroom Apartments',
    side: 'River Side (R-Side)',
    area: '128 m²',
    perArea: '140,000 ETB per m²',
    semi: '17,920,000 ETB',
    full: '23,000,000 ETB',
  },
  {
    name: '3-Bedroom Apartments',
    side: 'City Side (C-Side)',
    area: '184 m²',
    perArea: '130,000 ETB per m²',
    semi: '23,920,000 ETB',
    full: '31,200,000 ETB',
  },
];

export default function RealEstateWelcome() {
  const t = useT();

  return (
    <section id="welcome" className="scroll-mt-28 bg-background py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 border border-border translate-x-4 translate-y-4" aria-hidden="true" />
              <img
                src={welcomeImage.url}
                alt={t('Sunlit apartment living at Bella Riverside')}
                loading="lazy"
                className="relative w-full aspect-[4/5] object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">
                {t('Welcome to Bella Real Estate')}
              </p>
              <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                {t('An exclusive address in Addis Ababa’s most prestigious neighborhood')}
              </h2>
              <p className="font-inter text-muted-foreground leading-relaxed mb-4">
                {t(
                  'Situated in one of Addis Ababa’s most highly demanded and prestigious neighborhoods — Bole, Wollo Sefer, just behind the Best Western Hotel.'
                )}
              </p>
              <p className="font-inter text-muted-foreground leading-relaxed mb-8">
                {t(
                  'Designed for those who value privacy, luxury and high-yield investment, this single-block complex offers an unparalleled living experience with only two apartments per floor. Whether you are looking for a forever home or a lucrative asset with high dollar-rental potential, Bella Real Estate delivers on all fronts.'
                )}
              </p>
            </Reveal>

            <ul className="space-y-4">
              {highlights.map((h, i) => (
                <Reveal key={h} delay={i * 90}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 border border-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="font-inter text-sm text-foreground leading-relaxed">{t(h)}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* Unit specifications */}
        <Reveal>
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-primary" />
            <p className="font-inter text-sm uppercase tracking-wider text-primary">{t('Unit Specifications')}</p>
          </div>
          <h3 className="font-marcellus text-2xl sm:text-3xl text-foreground mb-3">
            {t('Per-area cost & total pricing')}
          </h3>
          <p className="font-inter text-sm text-muted-foreground max-w-3xl mb-10">
            {t(
              'A limited number of units, carefully tailored to your lifestyle with flexible finishing options. Investors can take advantage of a special discounted rate of 130,000–140,000 ETB per square meter for semi-finished units.'
            )}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-16 sm:mb-20">
          {specs.map((s, i) => (
            <Reveal key={s.name} delay={i * 120}>
              <div className="bg-card p-6 sm:p-8 h-full">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h4 className="font-marcellus text-2xl text-foreground">{t(s.name)}</h4>
                  <span className="bg-secondary px-2 py-1 font-inter text-xs font-semibold text-muted-foreground">
                    {s.area}
                  </span>
                </div>
                <p className="font-inter text-xs uppercase tracking-wider text-primary mb-6">{t(s.side)}</p>
                <dl className="space-y-3 font-inter text-sm border-t border-border pt-4">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t('Per-Area Cost (Semi-Finished)')}</dt>
                    <dd className="font-semibold text-foreground text-right">{t(s.perArea)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t('Total Price (Semi-Finished)')}</dt>
                    <dd className="font-semibold text-foreground text-right">{s.semi}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t('Total Price (Fully-Finished)')}</dt>
                    <dd className="font-semibold text-foreground text-right">{s.full}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Handover & payment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 sm:mb-20">
          <Reveal>
            <div className="h-full border border-border p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <p className="font-inter text-sm uppercase tracking-wider text-primary">{t('Handover & Payment')}</p>
              </div>
              <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                {t(
                  'One of the most efficient delivery timelines in the city — the project is in its final stages, with complete handover guaranteed in just 6 months, so your capital isn’t tied up for years.'
                )}
              </p>
              <div className="grid grid-cols-2 gap-px bg-border border border-border">
                <div className="bg-secondary p-4">
                  <p className="font-marcellus text-2xl text-primary">50%</p>
                  <p className="font-inter text-xs text-muted-foreground mt-1">{t('Down payment — secures your preferred unit and floor')}</p>
                </div>
                <div className="bg-secondary p-4">
                  <p className="font-marcellus text-2xl text-primary">50%</p>
                  <p className="font-inter text-xs text-muted-foreground mt-1">{t('Final payment — at handover, 6 months later')}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full bg-primary p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-background" />
                <p className="font-inter text-sm uppercase tracking-wider text-background/80">
                  {t('The Investment Opportunity')}
                </p>
              </div>
              <p className="font-marcellus text-2xl sm:text-3xl text-background leading-snug mb-4">
                {t('A top-tier investment in the heart of Wollo Sefer')}
              </p>
              <p className="font-inter text-background/80 leading-relaxed mb-6">
                {t(
                  'Near major hotels, embassies and corporate hubs, properties in this area have a proven track record of securing high-value rental income paid in USD — a powerful hedge against inflation and a brilliant addition to any real estate portfolio.'
                )}
              </p>
              <a
                href="#sales-team"
                className="inline-flex items-center gap-2 border border-background/60 px-5 py-3 font-inter text-sm font-semibold text-background hover:bg-background hover:text-primary transition-colors duration-300"
              >
                <KeyRound className="w-4 h-4" /> {t('Book a Tour')}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
