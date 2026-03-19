

# Site-Wide Design Consistency Plan

Apply the cape-cod color palette and the refined landing page design patterns (gradient overlays, dark sections, consistent typography) across every page and shared component.

## Color Palette Integration

Add the `cape-cod` palette to `tailwind.config.ts` and update CSS variables in `src/index.css` to map to cape-cod shades:

| CSS Variable | Current HSL | New Cape-Cod Shade |
|---|---|---|
| `--primary` | `157 12% 27%` | cape-cod-700 (`#354949` → ~`180 15% 24%`) |
| `--primary-foreground` | white | stays white |
| `--secondary` | `0 0% 96%` | cape-cod-50 (`#f5f8f8` → ~`160 14% 97%`) |
| `--muted` | `0 0% 96%` | cape-cod-100 (`#dfe8e7` → ~`174 12% 89%`) |
| `--muted-foreground` | `0 0% 33%` | cape-cod-600 (`#435e5e` → ~`180 16% 31%`) |
| `--foreground` | `0 0% 10%` | cape-cod-950 (`#151e1e` → ~`180 15% 10%`) |
| `--border` | `0 0% 92%` | cape-cod-200 (`#bed1cf` → ~`174 18% 78%`) |
| `--ring` | same as primary | cape-cod-500 |
| Dark mode vars | update similarly | cape-cod-800/900/950 for backgrounds |

Also add `cape-cod` as a named color in `tailwind.config.ts` so components can use `bg-cape-cod-500` etc. directly.

## Files to Modify

### 1. `tailwind.config.ts` — Add cape-cod palette
Add the full cape-cod scale under `theme.extend.colors`.

### 2. `src/index.css` — Update CSS variables
Remap all `:root` and `.dark` CSS variables to cape-cod HSL values.

### 3. `src/components/Header.tsx` — Apply cape-cod styling
- Change `bg-white` to `bg-cape-cod-50`
- Mobile menu: `bg-gray-50` → `bg-cape-cod-50`, hover states use cape-cod shades
- Remove raw `text-gray-700`/`text-gray-800` → use semantic classes or cape-cod utilities

### 4. `src/pages/OurStory.tsx` — Consistent section styling
- Hero: full-width background image with dark gradient overlay (matching landing page hero pattern)
- Timeline: `bg-secondary` stays (now maps to cape-cod-50), timeline circles use `bg-primary` (cape-cod-700)
- Vision/Mission: Add gradient overlays to placeholder images
- CTA section: use `bg-primary` (cape-cod-700) with white text

### 5. `src/pages/Articles.tsx` — Apply cape-cod
- Hero section: add dark gradient overlay background image
- Replace `bg-white` sections with cape-cod-50 where needed
- Search input and category buttons use cape-cod palette

### 6. `src/pages/ArticleDetail.tsx` — Consistent styling
- Header section: add subtle gradient background
- Article card: ensure borders use cape-cod-200

### 7. `src/pages/Sectors.tsx` — Match landing page pattern
- Hero: full-width background image with dark gradient overlay, white text
- Sector cards: add images with gradient overlays (same pattern as homepage BusinessSectors)
- CTA: already uses `bg-primary`, will inherit new cape-cod-700

### 8. `src/pages/SectorDetail.tsx` — Apply cape-cod
- Hero: background image with gradient overlay
- Cards: use cape-cod borders and accent colors
- Contact form: match homepage ContactSection styling (primary bg card)

### 9. `src/pages/Leadership.tsx` — Consistent design
- Hero: dark gradient overlay background
- Story section: cape-cod-50 background
- Leadership cards: gradient overlays on images already present, ensure cape-cod borders

### 10. `src/pages/Contact.tsx` — Match homepage contact
- Hero: dark gradient overlay background
- Form section: cape-cod-50 background, form card with cape-cod styling
- CTA: `bg-primary` (cape-cod-700)

### 11. `src/pages/NotFound.tsx` — Brand consistency
- Replace `bg-gray-100`, `text-gray-600`, `text-blue-500` with cape-cod themed classes
- Add Header/Footer

### 12. `src/components/ArticleCard.tsx` — Cape-cod accents
- Ensure card borders, badges, and hover states use cape-cod palette instead of raw gray values

### 13. `src/components/Footer.tsx` — Already dark, verify cape-cod
- Use `bg-cape-cod-950` instead of `bg-foreground`
- Ensure text colors use cape-cod-100/200 for contrast

## Technical Details

- The cape-cod palette will be added both as Tailwind named colors AND mapped to CSS variables, so all existing `bg-primary`, `text-muted-foreground` etc. automatically pick up the new palette
- Every page hero section will get a full-width background image with `bg-gradient-to-r from-black/70 via-black/50 to-black/30` overlay pattern
- All raw gray Tailwind classes (`bg-gray-50`, `text-gray-600`, etc.) will be replaced with cape-cod equivalents
- No structural changes — only color/styling updates

