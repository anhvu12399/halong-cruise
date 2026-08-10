# Ha Long Bay Cruises

A Next.js 14 (App Router) site for selling small-ship Ha Long Bay cruises to
an English-speaking, international audience — built to run on the built-in
mock data out of the box, and to switch to a headless WordPress backend the
moment you connect one.

## Design direction
Midnight teal (`#0B2224`) paired with a brick terracotta accent
(`#B85C34`) and aged brass (`#A9873F`), on a limestone-sand base
(`#F6F1E4`). Type is **Fraunces** (display, italic for headlines) over
**Work Sans** (body) with **JetBrains Mono** used for labels, prices, and
the day-by-day itinerary — treated like entries in a ship's log rather than
generic numbered tabs. Full token list in `tailwind.config.ts`.

## Quick start
```bash
npm install
npm run dev
```
Open http://localhost:3000. No environment variables are required — it
runs on `src/lib/mockData.ts`.

## Connect WordPress
See **[SETUP-WORDPRESS.md](./SETUP-WORDPRESS.md)** — install one plugin
(Advanced Custom Fields), upload the companion plugin in
`wordpress-plugin/halong-cruise-cms.php`, set `WORDPRESS_URL` in
`.env.local`, done. Every field on the site becomes editable from the WP
admin with no further code changes.

## Structure
```
src/
  app/
    page.tsx                 Homepage
    cruises/page.tsx          Listing + filters
    cruises/[slug]/page.tsx   Cruise detail (hero, itinerary, cabins, tech info)
    inquire/page.tsx          Booking/inquiry form
    api/inquiry/route.ts      Form handler → WordPress (or console log fallback)
  components/                 Header, Footer, CruiseCard, InquiryForm
  lib/
    types.ts                  Shared content model
    mockData.ts                Sample cruises (4 ships)
    wp.ts                      WordPress fetch layer with mock fallback
wordpress-plugin/
  halong-cruise-cms.php       CPT + ACF fields + inquiry REST endpoint
```

## Replacing placeholder photography
All images currently come from `picsum.photos` seeds so the site renders
without any assets. Swap them for real photography either by editing
`mockData.ts` directly, or — once WordPress is connected — uploading real
photos to the Cruise entries in wp-admin.

## Adding a new cruise
- **With WordPress connected:** Cruises → Add New in wp-admin.
- **Without WordPress:** add an object to the `cruises` array in
  `src/lib/mockData.ts` following the `Cruise` type in `src/lib/types.ts`.
  The listing page, homepage, and `/cruises/[slug]` route all pick it up
  automatically — no other code changes needed.
