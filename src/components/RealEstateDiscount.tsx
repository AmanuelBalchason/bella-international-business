import { Tag } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';
import { discountDeadline } from '@/data/realEstateInventory';

export function DiscountedTag() {
  const t = useT();
  return <span className="inline-flex items-center gap-1 bg-destructive text-destructive-foreground px-2 py-1 font-inter text-xs font-semibold whitespace-nowrap"><Tag className="h-3 w-3" aria-hidden="true" />{t('Discounted')}</span>;
}

export function RealEstateDiscountBanner() {
  const t = useT();
  const deadline = new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${discountDeadline}T00:00:00Z`));
  return <div role="note" className="border-l-4 border-destructive bg-destructive/10 px-4 py-4 mb-8 flex items-start sm:items-center gap-3"><Tag className="h-5 w-5 shrink-0 text-destructive mt-0.5 sm:mt-0" aria-hidden="true" /><p className="font-inter font-semibold text-foreground text-sm sm:text-base">{t(`Discounts Only Available Until ${deadline}`)}</p></div>;
}