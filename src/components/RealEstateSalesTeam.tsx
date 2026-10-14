import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useT } from '@/i18n/LanguageProvider';
import lidet from '@/assets/sales-lidet-bella.webp.asset.json';
import rahel from '@/assets/sales-rahel-tsegaye.webp.asset.json';

const salesTeam = [
  { name: 'Lidet Bella', image: lidet.url, phone: '+251 93 344 3562', tel: '+251933443562' },
  { name: 'Rahel Tsegaye', image: rahel.url, phone: '+251 94 792 5678', tel: '+251947925678' },
];

export default function RealEstateSalesTeam() {
  const t = useT();
  return (
    <section id="sales-team" aria-labelledby="sales-team-heading" className="scroll-mt-28 bg-background py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">Bella Riverside Apartment</p>
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 items-end mb-12">
          <h2 id="sales-team-heading" className="font-marcellus text-3xl sm:text-4xl text-foreground">{t('Our Sales Team')}</h2>
          <p className="font-inter text-muted-foreground leading-relaxed">{t('Speak with Lidet or Rahel to arrange a tour of Bella Riverside Apartment in Downtown Bole, Wollo Sefer.')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {salesTeam.map((person) => (
            <article key={person.name} className="min-w-0 bg-card border border-border">
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img src={person.image} alt={person.name} width={750} height={1000} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-marcellus text-2xl text-foreground">{person.name}</h3>
                <p className="font-inter text-sm text-primary mt-2 mb-6">{t('Sales Team')} · Bella Riverside</p>
                <div className="border-t border-border pt-5 space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start h-auto min-h-11 px-0 font-inter">
                    <a href={`tel:${person.tel}`} aria-label={`${t('Call')} ${person.name}: ${person.phone}`}><Phone className="w-4 h-4 mr-3 shrink-0" />{person.phone}</a>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start h-auto min-h-11 px-0 font-inter whitespace-normal text-left">
                    <a href="mailto:realestate@bellainter.com" aria-label={`${t('Email')} ${person.name}`}><Mail className="w-4 h-4 mr-3 shrink-0" /><span className="break-all">realestate@bellainter.com</span></a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}