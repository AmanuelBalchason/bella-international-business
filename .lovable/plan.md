# Sector Pages, Nav Cleanup & Dynamic Refresh

## 1. Hide "Our Story" and "Articles" (reversible)

Both pages get muted, not deleted, so they can be restored exactly as they were.

- Header nav: comment out the `/our-story` and `/articles` entries in the navigation list, with a `TEMP HIDDEN — restore when reactivated` note.
- Footer: same treatment for the two links.
- Routes in `App.tsx`: `/our-story`, `/articles`, `/articles/:slug` are commented out so direct URLs fall through to the 404 page. Page files and the admin article tools stay untouched.
- Any in-page links pointing to them (About section CTA, Leadership page link) are hidden or re-pointed so no dead links remain.

## 2. A dedicated page per sector

Each sector gets its own top-level URL:

```text
/bella-real-estate
/bella-healthcare
/acha-forest-coffee
/bella-automotives
```

- Nav bar: "Sectors" becomes a dropdown listing the four sector pages (mobile menu shows them as an expandable group). The `/sectors` overview is removed from the nav.
- Old `/sectors/:slug` links redirect to the new URLs so nothing already shared breaks. The `/sectors` overview page stays reachable by URL but is no longer linked from nav.
- Homepage sector cards and footer links point at the new URLs.
- Content: each page reuses the existing sector content (vision, mission, stats, gallery, process, locations, contact form) so nothing is lost.

## 3. Dynamic refresh of each page

- **Bigger visual hero**: full-bleed sector image with subtle parallax drift, gradient overlay, sector title, a one-line positioning statement and a primary CTA.
- **Scroll animations**: sections fade and rise into view as they enter the viewport, staggered across grid items.
- **Animated stats**: key numbers count up when scrolled into view; quality metrics animate their progress bars.
- **Interactive carousels**: the image gallery becomes a snap-scrolling carousel with peek, arrows, dot indicators and mobile swipe; cards get hover lift and deeper shadow.
- Generous whitespace between sections. Sharp corners, Marcellus headings and sage green primary stay as-is.

## Technical notes

- New shared `useInView` hook (IntersectionObserver) drives reveal animations; a small `CountUp` component handles animated numbers.
- Sector content is extracted from `SectorDetail.tsx` into `src/data/sectors.ts`, and the page becomes a reusable `SectorPage` component rendered by each of the four routes — one layout, four data sets.
- Reveal and parallax effects respect `prefers-reduced-motion`.
- Hidden routes and links are commented out in place rather than deleted, so reinstating them is just uncommenting.