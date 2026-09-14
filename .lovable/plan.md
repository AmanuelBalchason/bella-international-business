# Complete bilingual, mobile, and sector navigation updates

## Scope
Finish the ten outstanding presentation and interaction updates without changing hidden pages, backend behavior, or unrelated content.

## Implementation

### 1. Site-wide English / Simplified Chinese
- Place the existing `EN / 中文` control in both the top navigation and footer.
- Connect the translation provider to visible copy on the home page, all four sector pages, the leadership page, shared navigation, process carousel, and footer.
- Extend and proofread the Simplified Chinese dictionary for every string shown in these areas, preserving brand names and personal names where appropriate.
- Keep the selected language across navigation and future visits.

### 2. Home page updates
- Present Abel Yeshitila as the featured homepage leader with `CEO, Bella International Business` only on the homepage.
- Use Abel’s optimized portrait in a stable 3:4 frame matching the leadership cards.
- Sort the Core Business Sectors display explicitly so Healthcare is first, regardless of database ordering.
- Replace the secondary hero action with `Get in Touch`, linked to the contact page, retaining its transparent fill and white outline.

### 3. Navigation and touch behavior
- Remove the top-bar blur that traps the phone menu and ensure all sector, leadership, contact, language, and CTA items are visible and usable.
- Add consistent pressed/tapped feedback to buttons, links styled as buttons, carousel controls, and interactive cards.
- Preserve desktop hover behavior while ensuring touch feedback is immediate on phones.

### 4. Sector-to-sector flow
- Add a bottom-of-page next-sector control in this order: Healthcare → Real Estate → Acha Forest Coffee → Automotives.
- Reveal and enlarge the downward control as the visitor approaches and continues toward the page bottom.
- On phones, allow an additional downward scroll gesture at the bottom to continue to the next sector, while retaining an explicit tappable control and avoiding accidental navigation.
- End the sequence cleanly on Bella Automotives without looping unexpectedly.

### 5. Leadership contacts
- Link the five email buttons to: `abel@bellainter.com`, `mulugeta@bellainter.com`, `chirotaw@bellainter.com`, `temesgen@bellainter.com`, and `yonas@bellainter.com`.
- Keep Yonas Birhanu’s LinkedIn destination and hide non-working placeholder LinkedIn actions for other leaders.
- Add telephone actions for Temesgen (`+251 933 38 1818`) and Yonas (`+251 913 94 1530`).
- Translate all visible leadership headings, positions, biography text, statistics, labels, and control names.

### 6. Footer and visual cleanup
- Add a TikTok action next to LinkedIn, linking to Bella Healthcare’s TikTok profile.
- Translate footer headings, sector links, navigation labels, and legal copy; include the language control.
- Reduce the interactive and static dot size, resting opacity, and pointer amplification so text remains visually dominant.
- Replace the broken Install-step image with a reliable healthcare-equipment installation photo.

## Technical details
- Reuse the existing language provider and dictionary rather than adding another localization library.
- Use the existing semantic color tokens and square-corner design language.
- Add scroll progress/threshold logic with reduced-motion support and guarded mobile gesture handling.
- Keep phone links in normalized `tel:+251...` form while displaying the readable formatted numbers.

## Verification
- Check English and Chinese states across home, every sector page, leadership, navigation, process content, and footer.
- Test the menu, tap states, sector continuation, contact links, and Install image at 375px mobile and desktop widths.
- Confirm Abel’s image remains 3:4, Healthcare appears first, all external links open correctly, and no text overlaps.
- Confirm the preview builds without errors after the changes.
