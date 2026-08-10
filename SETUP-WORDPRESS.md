# Connecting WordPress (headless CMS)

The site runs perfectly with **zero** WordPress setup — it falls back to the
sample data in `src/lib/mockData.ts`. Do the steps below whenever you're
ready to hand editing over to WordPress. Total install time is about 10
minutes and there's no coding involved after step 3.

> **If you're running a real, already-customized version of the Cruise CMS
> plugin** (not the `halong-cruise-cms.php` bundled in this repo), steps 1–4
> below describe the simple demo version and may not match your fields
> exactly. **Section 4b (Travel Guides) is unaffected** — it's a separate,
> standalone plugin (`halong-guides-addon.php`) that only adds a new post
> type, so it installs the same way regardless of which Cruise CMS version
> you're on.

## 1. Get a WordPress site
Any host works (WP Engine, Kinsta, SiteGround, or a $5/mo VPS with
Softaculous). You only need the WP admin — this WordPress site never renders
a public-facing theme, it's purely a content API for Next.js.

## 2. Install one plugin
In **Plugins → Add New**, install and activate:
- **Advanced Custom Fields** (the free version — search "Advanced Custom Fields" by WP Engine)

## 3. Install the companion plugin (already written for you)
1. Zip the `wordpress-plugin/` folder from this repo (or just the single
   `halong-cruise-cms.php` file).
2. In WP admin: **Plugins → Add New → Upload Plugin**, choose the zip, **Install**, then **Activate**.

That's it — you'll now see a **Cruises** item in the left sidebar with a
clean editing screen for every field the frontend needs (tagline, itinerary
days, cabin categories, gallery, etc.), and an **Inquiries** item where
booking-form submissions land.

## 4. Add your cruises
Go to **Cruises → Add New**. Fill in:
- Title = the internal post title (doesn't show on the site)
- Featured Image = the hero photo
- All the fields under "Cruise details" — these map 1:1 to what you see on
  the live site. Textareas marked "one per line" (Overview, Highlights,
  Features, Equipment) turn each line into its own paragraph or bullet.
- The **slug** (Permalink) becomes the page URL: `/cruises/your-slug-here`.
  Use the same slugs as the mock data (`au-co`, `indigo-pearl`,
  `vermilion-sails`, `jade-serenity`) if you want to replace those exact
  pages without changing any Next.js code.

## 4b. Add travel guides
Travel Guides ship as their **own small plugin** —
`wordpress-plugin/halong-guides-addon.php` — separate from the Cruise CMS
plugin on purpose: it only registers one new post type, so installing it
can't affect anything the Cruise CMS plugin already does, no matter which
version of that plugin you're running.

1. Upload `halong-guides-addon.php` the same way you installed the Cruise
   CMS plugin (**Plugins → Add New → Upload Plugin**), then **Activate**.
2. A new **Travel Guides** item appears in the sidebar. Go to
   **Travel Guides → Add New**:
   - **Title** and the **main content editor** — write the article like a
     normal blog post (headings, paragraphs, bullet lists all work).
   - **Guide Details** box below the editor — Excerpt, Cover Image URL
     (paste a direct image link, same as the Cruise CMS's image fields —
     a live preview appears under the field), Region (optional), Read
     Time, and Related Cruises.
3. The **slug** (Permalink) becomes the page URL: `/guides/your-slug-here`.

Publish it, and it's live at `/guides` and `/guides/your-slug-here` on the
Next.js site within the revalidation window described below.

## 5. Point Next.js at it
In the Next.js project, copy `.env.example` to `.env.local` and set:

```
WORDPRESS_URL=https://your-wp-site.com
```

Restart `npm run dev` (or redeploy). `src/lib/wp.ts` now fetches from
`https://your-wp-site.com/wp-json/wp/v2/cruises` instead of the mock data —
nothing else in the codebase changes.

## How editing works day-to-day
- **Content** (copy, photos, prices, itineraries, cabins): edit directly in
  WordPress. Changes appear on the live site within 5 minutes (the site
  revalidates every 300 seconds — adjust `revalidate` in `src/lib/wp.ts` if
  you want it faster).
- **Layout / design** (fonts, colors, page structure): lives in the Next.js
  code, not WordPress. That's the trade-off of headless: WordPress is the
  filing cabinet, Next.js is the shop window.

## Inquiry form
Submissions from `/inquire` post to `/api/inquiry` inside Next.js, which
forwards them to `POST /wp-json/halong/v1/inquiries`. The plugin saves each
one as a private "Inquiry" post (visible in wp-admin) and emails your site's
admin address. To send to a different inbox, change `admin_email` under
**Settings → General** in WordPress, or edit the `wp_mail()` call in
`halong-cruise-cms.php`.

If `WORDPRESS_URL` isn't set, submissions are simply logged to the server
console — fine for local testing, but wire up WordPress (or an email API
like Resend/Postmark) before relying on this in production.

## Notes on security
The `/halong/v1/inquiries` endpoint accepts public POST requests by design
(it's a public contact form). If you get spam, add a honeypot field to
`InquiryForm.tsx` or drop in a service like Cloudflare Turnstile — ask and
this can be wired in.
