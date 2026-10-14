import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useT } from '@/i18n/LanguageProvider';

type Status = 'Available' | 'Sold';
type UnitType = '3 Bedroom' | '2 Bedroom';
const availability: Record<number, [Status, Status]> = {
  12: ['Sold', 'Sold'], 11: ['Sold', 'Available'], 10: ['Sold', 'Available'], 9: ['Available', 'Available'],
  8: ['Sold', 'Sold'], 7: ['Available', 'Sold'], 6: ['Sold', 'Sold'], 5: ['Sold', 'Sold'],
  4: ['Available', 'Available'], 3: ['Available', 'Sold'],
};
const units = Object.entries(availability)
  .sort((a, b) => Number(b[0]) - Number(a[0]))
  .flatMap(([floor, [c, r]]) => [
    { floor: Number(floor), type: '3 Bedroom' as UnitType, view: 'City Side', status: c },
    { floor: Number(floor), type: '2 Bedroom' as UnitType, view: 'River Side', status: r },
  ]);
const prices = { '3 Bedroom': { semi: '23.9', full: '31.2', area: '184' }, '2 Bedroom': { semi: '17.9', full: '23.0', area: '128' } };
const highlights = ['Behind Best Western Hotel', 'Only 2 apartments per floor', 'Handover in 6 months', 'Digital title deed ready', 'Standby generator & water', '4 basement parking'];

export default function RealEstateInventory() {
  const t = useT();
  const [type, setType] = useState('all');
  const [floor, setFloor] = useState('all');
  const [finish, setFinish] = useState<'semi' | 'full'>('semi');
  const shown = useMemo(() => units.filter((u) => (type === 'all' || u.type === type) && (floor === 'all' || String(u.floor) === floor)), [type, floor]);
  const available = shown.filter((u) => u.status === 'Available').length;

  return (
    <section id="inventory" className="scroll-mt-28 bg-secondary py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-inter text-sm uppercase tracking-wider text-primary mb-4">Bella Riverside Apartment</p>
        <h2 className="font-marcellus text-3xl sm:text-4xl text-foreground mb-8">{t('Find Your Residence')}</h2>
        <ul className="flex flex-wrap gap-3 mb-10">
          {highlights.map((h) => (
            <li key={h} className="border border-border bg-background px-4 py-2 font-inter text-sm text-foreground">{t(h)}</li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mb-10">
          {[
            { label: 'Unit Type', value: type, set: setType, opts: [['all', 'All Bedrooms'], ['3 Bedroom', '3 Bedroom'], ['2 Bedroom', '2 Bedroom']] },
            { label: 'Floor', value: floor, set: setFloor, opts: [['all', 'Any Floor'], ...Object.keys(availability).sort((a, b) => +b - +a).map((f) => [f, `${t('Floor')} ${f}`])] },
            { label: 'Finishing', value: finish, set: (v: string) => setFinish(v as 'semi' | 'full'), opts: [['semi', 'Semi-Finished'], ['full', 'Fully-Finished']] },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((u) => {
            const ok = u.status === 'Available';
            const p = prices[u.type];
            return (
              <article key={`${u.floor}-${u.type}`} className={`bg-card border border-border border-t-2 p-6 transition-all duration-300 ${ok ? 'border-t-primary hover:-translate-y-1 hover:shadow-xl' : 'border-t-muted-foreground/40 opacity-60'}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-marcellus text-2xl text-foreground">{t(u.type)}</h3>
                  <span className="bg-secondary px-2 py-1 font-inter text-xs font-semibold text-muted-foreground">{p.area} m²</span>
                </div>
                <p className="font-marcellus text-3xl text-primary">{p[finish]} {t('Million')} <span className="font-inter text-sm text-muted-foreground">ETB</span></p>
                <p className="font-inter text-xs text-primary mt-1 mb-5">{t('50% down payment · 50% within 6 months')}</p>
                <dl className="border-t border-border pt-4 space-y-1 font-inter text-sm text-muted-foreground mb-6">
                  <div><dt className="inline font-semibold text-foreground">{t('Floor')}: </dt><dd className="inline">{u.floor}</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('View')}: </dt><dd className="inline">{t(u.view)}</dd></div>
                  <div><dt className="inline font-semibold text-foreground">{t('Finishing')}: </dt><dd className="inline">{t(finish === 'semi' ? 'Semi-Finished' : 'Fully-Finished')}</dd></div>
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
