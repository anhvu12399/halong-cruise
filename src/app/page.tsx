import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCruises } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";
import CategoryTiles from "@/components/CategoryTiles";
import SectionHeading from "@/components/SectionHeading";
import ShortlistForm from "@/components/ShortlistForm";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Ha Long Bay Cruise Specialist — Every Budget & Travel Style",
  description:
    "64 handpicked Ha Long Bay cruises from $39/person. Day trips, 2D1N, 3D2N voyages across Ha Long, Lan Ha & Bai Tu Long Bay. Expert advice, free shortlist, book direct.",
  alternates: {
    canonical: "https://www.halongbestcruises.com",
  },
  openGraph: {
    title: "Ha Long Bay Cruise Specialist — Every Budget & Travel Style",
    description:
      "64 handpicked cruises · Day trips to 3-night voyages · Ha Long, Lan Ha & Bai Tu Long Bay. Free shortlist from local experts.",
    images: [
      {
        url: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o=",
        width: 1280,
        height: 900,
        alt: "Ha Long Bay junk cruise at sunset",
      },
    ],
  },
};

// ── SVG trip-type icons (thin stroke, 24×24) ──────────────────────────────────
const IconSun = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const IconMoon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
const IconAnchor = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="5" r="3" />
    <line x1="12" y1="8" x2="12" y2="22" />
    <path d="M5 15H2a10 10 0 007 7" />
    <path d="M19 15h3a10 10 0 01-7 7" />
  </svg>
);
const IconShip = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2" />
    <path d="M6 16l2-8h8l2 8" />
    <path d="M12 2v6" />
    <path d="M8 8h8" />
  </svg>
);

const TRIP_TYPES = [
  {
    id: "day-trip",
    label: "Day Trip",
    duration: "6–8 hours",
    from: "From $39",
    desc: "Explore the karsts, kayak the caves, be back in Hanoi by evening.",
    href: "/tours/day-cruises",
    Icon: IconSun,
  },
  {
    id: "2d1n",
    label: "2 Days 1 Night",
    duration: "2 days",
    from: "From $149",
    desc: "The sweet spot. Sleep under the stars, wake up on the water.",
    href: "/tours/2-days-1-night",
    Icon: IconMoon,
  },
  {
    id: "3d2n",
    label: "3 Days 2 Nights",
    duration: "3 days",
    from: "From $249",
    desc: "Reach the quiet bays, visit villages, see Ha Long at its best.",
    href: "/tours/3-days-2-nights",
    Icon: IconAnchor,
  },
  {
    id: "private",
    label: "Private Charter",
    duration: "Flexible",
    from: "On request",
    desc: "Whole ship, your crew, your itinerary. Groups from 4 to 60.",
    href: "/tours/private-cruises",
    Icon: IconShip,
  },
];

const REGIONS = [
  {
    name: "Ha Long Bay",
    href: "/tours/halong-bay",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o=",
    copy: "The UNESCO-listed original: nearly 2,000 limestone karsts rising out of a single bay. The most iconic sailing in Vietnam.",
    ships: 40,
  },
  {
    name: "Lan Ha Bay",
    href: "/tours/lan-ha-bay",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o=",
    copy: "Same geology, far fewer boats. Most 2D1N and 3D2N sailings favour this route. Less visited, equally stunning.",
    ships: 28,
  },
  {
    name: "Bai Tu Long Bay",
    href: "/tours/bai-tu-long-bay",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o=",
    copy: "The quiet north. National park coastline, mangrove lagoons, and boats that go days without seeing another ship.",
    ships: 15,
  },
];

export default async function HomePage() {
  const cruises = await getAllCruises();
  const featured = cruises.slice(0, 8);

  return (
    <>
      {/* ── JSON-LD schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.halongbestcruises.com/#website",
                url: "https://www.halongbestcruises.com",
                name: "Ha Long Best Cruises",
                description: "Ha Long Bay cruise specialist for every budget and travel style",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://www.halongbestcruises.com/cruises?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "TravelAgency",
                "@id": "https://www.halongbestcruises.com/#agency",
                name: "Ha Long Best Cruises",
                description:
                  "Ha Long Bay cruise specialist offering 64 handpicked cruises across Ha Long, Lan Ha, and Bai Tu Long Bay.",
                url: "https://www.halongbestcruises.com",
                telephone: "+84905999888",
                email: "hello@halongbestcruises.com",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Hanoi",
                  addressCountry: "VN",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9",
                  reviewCount: "500",
                  bestRating: "5",
                },
              },
            ],
          }),
        }}
      />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[94vh] items-end overflow-hidden bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
          alt="Junk boats sailing among the limestone karsts of Ha Long Bay at dusk"
          fill
          priority
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/50 to-teal-950/10" />
        <div className="chart-grid absolute inset-0 opacity-30" />

        <div className="container-content relative z-10 pb-20 pt-44">
          <p className="eyebrow mb-5 text-brass-400">Ha Long Bay Cruise Specialist · Since 2015</p>
          <h1 className="max-w-4xl font-display text-5xl font-normal leading-[1.06] tracking-tight text-sand-50 md:text-7xl">
            Every budget.{" "}
            <span className="italic text-terracotta-400">Every travel style.</span>{" "}
            <br className="hidden md:block" />
            One bay you&apos;ll never forget.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-sand-100/75">
            64 handpicked cruises — day trips to 3-night voyages — across Ha Long, Lan Ha &amp; Bai Tu Long Bay.
            We match you to the right ship. No upsells, no call centres.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              id="hero-find-cruise"
              href="/cruises"
              data-track="cta_click"
              data-label="find_my_cruise"
              data-location="hero"
              className="rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
            >
              Find My Cruise →
            </Link>
            <Link
              id="hero-shortlist"
              href="#get-shortlist"
              data-track="cta_click"
              data-label="get_shortlist"
              data-location="hero"
              className="rounded-full border border-sand-100/30 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:border-brass-300 hover:text-brass-300"
            >
              Get Free Shortlist
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-12 grid grid-cols-2 gap-5 border-t border-sand-100/15 pt-8 font-mono text-sand-100/70 md:grid-cols-4">
            <div>
              <p className="text-[10px] uppercase tracking-wideish text-brass-400">Ships Listed</p>
              <p className="mt-1 text-2xl font-semibold text-sand-50">{cruises.length} Cruises</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wideish text-brass-400">Starting From</p>
              <p className="mt-1 text-2xl font-semibold text-sand-50">$39 / person</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wideish text-brass-400">Customer Rating</p>
              <p className="mt-1 text-2xl font-semibold text-sand-50">4.9 ★ Google</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wideish text-brass-400">Expert Reply</p>
              <p className="mt-1 text-2xl font-semibold text-sand-50">Within 2 hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Start With Your Trip ── */}
      <section className="bg-teal-950 pb-16 pt-0">
        <div className="container-content">
          <p className="eyebrow mb-6 text-brass-400 pt-10">Start here</p>
          <div className="grid gap-4 md:grid-cols-4">
            {TRIP_TYPES.map((trip) => (
              <Link
                key={trip.id}
                id={`trip-${trip.id}`}
                href={trip.href}
                data-track="trip_type_click"
                data-trip={trip.id}
                className="group relative overflow-hidden rounded-2xl border border-teal-800/60 bg-teal-900/50 p-6 transition hover:border-brass-500/50 hover:bg-teal-800/50"
              >
                <trip.Icon />
                <h3 className="mt-3 font-display text-2xl italic text-sand-50">{trip.label}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wideish text-brass-400">{trip.duration}</p>
                <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">{trip.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-brass-300">{trip.from}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wideish text-sand-100/50 transition group-hover:text-brass-300">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose Your Style ── */}
      <section className="container-content py-24 md:py-28">
        <SectionHeading
          eyebrow="Choose your style"
          title="Find your perfect cruise."
          description="Same stunning bay, sorted by what matters most to you — budget, occasion, or group size."
        />
        <CategoryTiles />
      </section>

      {/* ── Featured Fleet ── */}
      <section className="bg-sand-100/60 py-24 md:py-32">
        <div className="container-content">
          <SectionHeading
            eyebrow="Handpicked ships"
            title="Ha Long Bay&apos;s best cruises."
            cta={{ label: "View all 64 cruises", href: "/cruises" }}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((cruise) => (
              <CruiseCard key={cruise.slug} cruise={cruise} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      <section id="regions" className="container-content py-24 md:py-32">
        <SectionHeading
          eyebrow="Where the boats go"
          title="Three bays, three different experiences."
          description="Ha Long Bay is famous, but the best sailing isn't always on the most famous water."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {REGIONS.map((region) => (
            <Link
              key={region.name}
              href={region.href}
              className="group overflow-hidden rounded-2xl bg-teal-950 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl italic text-sand-50 group-hover:text-brass-300 transition">
                  {region.name}
                </h3>
                <p className="mt-2 text-sm text-sand-100/70 leading-relaxed">{region.copy}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wideish text-brass-400">
                  {region.ships} ships available →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="bg-teal-950 py-24 text-sand-100 md:py-32">
        <div className="container-content">
          <div className="grid gap-10 md:grid-cols-[1fr,2fr]">
            <div>
              <p className="eyebrow text-brass-400">Ha Long Bay specialist · Since 2015</p>
              <h2 className="mt-4 font-display text-4xl italic text-sand-50 md:text-5xl">
                Why book with us?
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {[
                {
                  k: "01",
                  t: "Every budget covered",
                  d: "From $39 day trips to $900+ luxury voyages. We work with ships at every price point — because the right ship depends on you, not our commission.",
                },
                {
                  k: "02",
                  t: "Free expert shortlist",
                  d: "Tell us your dates and budget. Within 2 hours, a local expert sends you 3–5 perfectly matched ships. No upsells, no call centres.",
                },
                {
                  k: "03",
                  t: "A team that's sailed them",
                  d: "Every cabin photo, every itinerary note, comes from someone on our team who has actually been aboard. No stock photos, no guesswork.",
                },
              ].map((item) => (
                <div key={item.k}>
                  <p className="font-mono text-sm text-brass-400">{item.k}</p>
                  <h3 className="mt-3 font-display text-xl italic text-sand-50">{item.t}</h3>
                  <p className="mt-3 text-sm text-sand-100/65 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Travel Guides Teaser ── */}
      <section className="container-content py-24 md:py-28">
        <SectionHeading
          eyebrow="Ha Long Bay Travel Guides"
          title="Plan smarter, sail better."
          description="Free expert guides on the best cruises, prices, when to go, and what to pack."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Best Ha Long Bay Cruises",
              href: "/guides/best-cruises",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
            },
            {
              title: "Ha Long Bay Cruise Prices",
              href: "/guides/cruise-prices",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
            },
            {
              title: "Ha Long vs Lan Ha vs Bai Tu Long",
              href: "/guides/bay-comparison",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>,
            },
            {
              title: "Best Time to Visit Ha Long Bay",
              href: "/guides/best-time-to-visit",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
            },
            {
              title: "How to Choose a Cruise",
              href: "/guides/how-to-choose",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
            },
            {
              title: "Hanoi to Ha Long Bay",
              href: "/guides/hanoi-to-halong",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
            },
            {
              title: "What to Pack for a Cruise",
              href: "/guides/what-to-pack",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
            },
            {
              title: "Is Ha Long Bay Worth It?",
              href: "/guides/is-halong-worth-it",
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A9873F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
            },
          ].map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group flex items-center gap-4 rounded-xl border border-sand-200 bg-sand-50 p-4 transition hover:border-brass-500/40 hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sand-200 bg-white">
                {g.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-ink-900 leading-snug group-hover:text-teal-800 transition">
                  {g.title}
                </p>
                <p
                  className="mt-0.5 text-[9px] uppercase text-brass-500 transition group-hover:text-brass-400"
                  style={{ fontFamily: "var(--font-label)", letterSpacing: "0.16em" }}
                >
                  Read guide
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Get My Cruise Shortlist (Lead Capture) ── */}
      <section className="bg-sand-100/60 py-24 md:py-32">
        <div className="container-content max-w-3xl">
          <ShortlistForm />
        </div>
      </section>

      {/* ── SEO Text Block ── */}
      <section className="container-content py-16">
        <div className="prose prose-sm mx-auto max-w-3xl text-ink-600">
          <h2 className="font-display text-2xl italic text-ink-900 not-prose">
            Ha Long Bay Cruises — A Specialist Guide
          </h2>
          <p className="mt-4 leading-relaxed">
            Ha Long Bay, a UNESCO World Heritage Site in northeastern Vietnam, is home to nearly 2,000 limestone
            karst islands rising dramatically from the emerald water of the Gulf of Tonkin. The best way to
            experience it is by cruise — anything from a <Link href="/tours/day-cruises" className="text-teal-700 underline">Ha Long Bay day cruise</Link> departing from Tuan Chau Island to an immersive{" "}
            <Link href="/tours/3-days-2-nights" className="text-teal-700 underline">3-day 2-night sailing</Link> that reaches the quieter bays beyond the tourist routes.
          </p>
          <p className="mt-3 leading-relaxed">
            We list 64 ships across{" "}
            <Link href="/tours/halong-bay" className="text-teal-700 underline">Ha Long Bay</Link>,{" "}
            <Link href="/tours/lan-ha-bay" className="text-teal-700 underline">Lan Ha Bay</Link>, and{" "}
            <Link href="/tours/bai-tu-long-bay" className="text-teal-700 underline">Bai Tu Long Bay</Link> —
            from budget-friendly options starting under $100 per person to ultra-luxury private charters.
            Not sure where to start? Read our{" "}
            <Link href="/guides/how-to-choose" className="text-teal-700 underline">guide to choosing the right Ha Long Bay cruise</Link>{" "}
            or check our{" "}
            <Link href="/guides/cruise-prices" className="text-teal-700 underline">Ha Long Bay cruise price guide</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
