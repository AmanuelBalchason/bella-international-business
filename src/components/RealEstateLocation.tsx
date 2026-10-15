import { Building2, ExternalLink, MapPin, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/LanguageProvider';

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2853.092595046276!2d38.77015524458726!3d8.985581413314996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850c12c59e6f%3A0xd5938916f4ea41a5!2sBella%20Real%20Estate!5e1!3m2!1sen!2set!4v1792052052196!5m2!1sen!2set';

export default function RealEstateLocation() {
  const t = useT();

  return (
    <section id="property-location" className="scroll-mt-28 bg-secondary py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-end mb-10">
          <div>
            <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">{t('Bella Riverside Apartment')}</p>
            <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground mb-4">{t('City living. Riverside views.')}</h2>
            <p className="font-inter text-muted-foreground">{t('Downtown Bole, Wollo Sefer, Addis Ababa')}</p>
          </div>
          <Button asChild variant="outline" className="rounded-none self-start sm:shrink-0">
            <a href="https://www.google.com/maps/search/?api=1&query=Bella+Real+Estate&query_place_id=ChIJb57FEgyFSxYRpaHq9BaJk9U" target="_blank" rel="noopener noreferrer">
              <MapPin className="w-4 h-4 mr-2" />{t('Open in Google Maps')}<ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] border border-border border-t-2 border-t-primary">
          <div className="bg-background min-w-0">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border text-primary">
              <MapPin className="w-4 h-4 shrink-0" />
              <p className="font-inter text-sm font-semibold">{t('Bella Riverside Apartment')}</p>
            </div>
            <iframe
              src={mapUrl}
              title={t('Bella Real Estate location on Google Maps')}
              width="600"
              height="450"
              className="block w-full h-[360px] sm:h-[450px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:border-l border-border">
            <div className="bg-background p-6 sm:p-8 border-t lg:border-t-0 border-border">
              <Building2 className="w-6 h-6 text-primary mb-5" />
              <p className="font-inter text-xs uppercase tracking-wider text-muted-foreground mb-2">C-Side</p>
              <h3 className="font-marcellus text-2xl text-foreground mb-3">{t('City Side')}</h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-4">{t('City-facing apartments in the heart of Wollo Sefer.')}</p>
              <p className="font-inter text-sm font-semibold text-primary">{t('3 Bedroom')} · 184 m²</p>
            </div>
            <div className="bg-primary text-primary-foreground p-6 sm:p-8">
              <Waves className="w-6 h-6 mb-5" />
              <p className="font-inter text-xs uppercase tracking-wider text-primary-foreground/80 mb-2">R-Side</p>
              <h3 className="font-marcellus text-2xl mb-3">{t('River Side')}</h3>
              <p className="font-inter text-sm text-primary-foreground/80 leading-relaxed mb-4">{t('River-facing apartments overlooking Eden Park.')}</p>
              <p className="font-inter text-sm font-semibold">{t('2 Bedroom')} · 128 m²</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}