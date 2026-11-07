import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useT } from '@/i18n/LanguageProvider';
import RealEstateAmenities from '@/components/RealEstateAmenities';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { filterUnits, floors, paymentTerms, prices } from '@/data/realEstateInventory';

export default function RealEstateInventory() {
  const t = useT();
  const [type, setType] = useState('all');
  const [floor, setFloor] = useState('all');
  const [finish, setFinish] = useState('all');
  const shown = useMemo(() => filterUnits(type, floor, finish), [type, floor, finish]);
  const available = shown.filter((u) => u.status === 'Available').length;

  return (
    <section id="inventory" className="scroll-mt-28 bg-secondary py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">{t('Bella Riverside Apartment')}</p>
        <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground mb-8">{t('Find Your Residence')}</h2>
        <RealEstateAmenities />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mb-10">
          {[
            { label: 'Unit Type', value: type, set: setType, opts: [['all', 'All Bedrooms'], ['3 Bedroom', '3 Bedroom'], ['2 Bedroom', '2 Bedroom']] },
            { label: 'Floor', value: floor, set: setFloor, opts: [['all', 'Any Floor'], ...floors.map((f) => [String(f), `${t('Floor')} ${f}`])] },
            { label: 'Finishing', value: finish, set: setFinish, opts: [['all', 'Any Finishing'], ['semi', 'Semi-Finished'], ['full', 'Fully-Finished']] },
          ].map((f) => (
            <div key={f.label} className="bg-background p-4">
              <p className="font-inter text-xs uppercase tracking-wider text-muted-foreground mb-2">{t(f.label)}</p>
              <Select value={f.value} onValueChange={f.set}>
                <SelectTrigger className="rounded-none border-0 px-0 font-inter font-semibold shadow-none focus:ring-0"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-none">
                  {f.opts.map(([v, l]) => <SelectItem key={v} value={v}>{t(l)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <p className="font-inter text-sm text-muted-foreground border-b border-border pb-4 mb-8">
          {t('Showing')} {shown.length} · {t('Available')} {available}
        </p>

        {shown.length === 0 && <p className="font-inter text-sm text-muted-foreground py-4">{t('No available units match these filters.')}</p>}

        <Accordion type="single" collapsible className="sm:hidden border-t border-border">
          {shown.map((u) => {
            const p = prices[u.type];
            return <AccordionItem key={`${u.floor}-${u.type}`} value={`${u.floor}-${u.type}`} className="border-border">
              <AccordionTrigger className="gap-3 px-1 text-left hover:no-underline active:bg-muted">
                <span className="min-w-0 flex-1">
                  <span className="block font-marcellus text-lg text-foreground">{t(u.type)} · {t('Floor')} {u.floor}</span>
                  <span className="block font-inter text-xs text-muted-foreground mt-1">{p.area} m² · {t(u.view)} · {t(u.finishing === 'semi' ? 'Semi-Finished' : 'Fully-Finished')}</span>
                </span>
                <span className="font-inter text-sm font-semibold text-primary shrink-0">{p[u.finishing]} {t('Million')} ETB</span>
              </AccordionTrigger>
              <AccordionContent className="px-1 pt-2">
                <dl className="font-inter text-sm text-muted-foreground space-y-2 mb-4">
                  <div><dt className="inline font-semibold text-foreground">{t('Per-Area Cost')}: </dt><dd className="inline">{p[u.finishing === 'semi' ? 'semiPerM2' : 'fullPerM2']} ETB/m²</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('Finishing')}: </dt><dd className="inline">{t(u.finishing === 'semi' ? 'Semi-Finished' : 'Fully-Finished')}</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('Extras')}: </dt><dd className="inline">{t('5 m² storage room included')}</dd></div>
                </dl>
                <p className="font-inter text-xs text-primary mb-4">{t(paymentTerms)}</p>
                <Button asChild className="w-full rounded-none font-inter"><a href="#sales-team">{t('Book a Tour')}</a></Button>
              </AccordionContent>
            </AccordionItem>;
          })}
        </Accordion>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((u) => {
            const ok = u.status === 'Available';
            const p = prices[u.type];
            return (
              <article key={`${u.floor}-${u.type}`} className={`bg-card border border-border border-t-2 p-6 transition-all duration-300 ${ok ? 'border-t-primary hover:-translate-y-1 hover:shadow-xl' : 'border-t-muted-foreground/40 opacity-60'}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-marcellus text-2xl text-foreground">{t(u.type)}</h3>
                  <span className="bg-secondary px-2 py-1 font-inter text-xs font-semibold text-muted-foreground">{p.area} m²</span>
                </div>
                <p className="font-marcellus text-3xl text-primary">{p[u.finishing]} {t('Million')} <span className="font-inter text-sm text-muted-foreground">ETB</span></p>
                <p className="font-inter text-xs text-muted-foreground mt-1">{p[u.finishing === 'semi' ? 'semiPerM2' : 'fullPerM2']} ETB/m²</p>
                <p className="font-inter text-xs text-primary mt-1 mb-5">{t(paymentTerms)}</p>
                <dl className="border-t border-border pt-4 space-y-1 font-inter text-sm text-muted-foreground mb-6">
                  <div><dt className="inline font-semibold text-foreground">{t('Floor')}: </dt><dd className="inline">{u.floor}</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('View')}: </dt><dd className="inline">{t(u.view)}</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('Finishing')}: </dt><dd className="inline">{t(u.finishing === 'semi' ? 'Semi-Finished' : 'Fully-Finished')}</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('Extras')}: </dt><dd className="inline">{t('5 m² storage room included')}</dd></div>
                </dl>
                {ok ? (
                  <Button asChild className="w-full rounded-none font-inter"><a href="#sales-team">{t('Book a Tour')}</a></Button>
                ) : (
                  <div className="w-full border border-border py-2 text-center font-inter text-sm text-muted-foreground">{t('Sold Out')}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
