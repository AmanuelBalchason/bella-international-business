

# Landing Page Refinement Plan

Based on the screenshot reference, here are the key layout and visual changes needed.

## Changes Overview

### 1. HeroSection - Full-width dark background with gradient overlay
**Current**: White background, side-by-side text + image grid
**Target**: Full-width hero image background with dark gradient overlay, text overlaid on top (left-aligned), stats below the CTA button. Remove the separate `DynamicHeroImage` component from the right column and instead use the hero images as full-width backgrounds.
- Dark gradient overlay (from-black/70 to transparent or similar)
- White text on dark background
- Keep the rotating headlines from `DynamicHero`
- Stats row below the CTA, white text
- Full viewport width, roughly 70-80vh height

### 2. ClientLogos - Simplify layout
**Current**: Scrolling marquee with small bordered boxes
**Target**: Static row of logos on light gray background, larger logo cards with white backgrounds and subtle shadows. Keep the marquee but make logos bigger with more padding, matching the screenshot style.

### 3. AnimatedAboutSection - Image + text side by side
**Current**: Text on left, numbered values list on right
**Target**: Left side shows a photo with gradient overlay and name caption (like the leadership photo style). Right side has "About Us" label, heading, paragraph, and "Learn More About Us" button. Remove the numbered values list.

### 4. BusinessSectors - Add images to sector cards
**Current**: Text-only cards with numbers
**Target**: Each card has a top image with gradient overlay, title overlaid at bottom of image, description below, and an arrow link. Cards should show sector-relevant images.

### 5. Remove LeadershipSlideshow from homepage
The screenshot doesn't show a separate leadership section on the homepage (the about section already features a leader photo). Remove `LeadershipSlideshow` from the Index page.

### 6. TestimonialsSection + ContactSection - Side by side layout
**Current**: Testimonials full-width, then Contact full-width below
**Target**: Combined into one section - testimonials grid (2x2) on the left, contact form on the right in a dark green (primary) card. The section title "Success Stories" spans full width above. Contact card has Name, Email, Phone, Message fields and a Send button.

### 7. Remove FAQSection from homepage
The screenshot doesn't show FAQs on the homepage. Remove from Index page.

### 8. Footer - Dark background
**Current**: White background footer
**Target**: Dark gray/charcoal background with white/light text. Keep the same 4-column structure (logo, quick links, contact, tagline + social icons).

### 9. Fix build error
The Deno/Resend import error in `contact-email/index.ts` needs the import mapped properly. Add a deno.json or fix the import to use `npm:resend`.

## Files to modify

| File | Action |
|------|--------|
| `src/components/HeroSection.tsx` | Rewrite as full-width overlay hero |
| `src/components/DynamicHero.tsx` | Minor adjustments for white text |
| `src/components/DynamicHeroImage.tsx` | Repurpose as background provider or inline into HeroSection |
| `src/components/ClientLogos.tsx` | Larger logo cards, updated styling |
| `src/components/AnimatedAboutSection.tsx` | Rewrite to image+text layout per screenshot |
| `src/components/BusinessSectors.tsx` | Add images to cards with gradient overlays |
| `src/components/TestimonialsSection.tsx` | Restructure as left side of combined section |
| `src/components/ContactSection.tsx` | Rewrite as a form card (name, email, phone, message) placed beside testimonials |
| `src/pages/Index.tsx` | Remove FAQSection and LeadershipSlideshow, combine Testimonials+Contact |
| `src/components/Footer.tsx` | Dark background with light text |
| `supabase/functions/contact-email/index.ts` | Fix Resend import for Deno |

## Technical notes

- All existing fonts (Marcellus, Inter), colors (primary HSL 157 12% 27%), and component patterns preserved
- Gradient overlays use Tailwind classes like `bg-gradient-to-t from-black/60` or `bg-gradient-to-r from-primary/80`
- Unsplash images used for sector cards (real-estate, healthcare, coffee, automotive themed)
- Contact form fields: Name, Email (side by side), Phone, Message, Send button
- The `DynamicHeroImage` images array will be reused as full-width hero backgrounds

