import Image from "next/image";
import Link from "next/link";
import { getAllCruises, getFrontendPage } from "@/lib/wp";
import DividerHeading from "@/components/DividerHeading";
import FrontendCmsPage from "@/components/FrontendCmsPage";

export const metadata = {
  title: "10 Best Halong Bay Cruises 2026 | Expert Top Pick Rankings",
  description:
    "Curated guide to the 10 best Ha Long Bay & Lan Ha Bay luxury cruises in 2026. Reviewed for luxury, food, service, cabin size, itinerary & value for money.",
};

export default async function BestCruisesGuidePage() {
  const cmsPage = await getFrontendPage("/guides/best-cruises");
  if (cmsPage) return <FrontendCmsPage page={cmsPage} />;
  const cruises = await getAllCruises();
  const topPickSlugs = [
    "stellar-of-the-seas",
    "capella-cruise",
    "heritage-binh-chuan",
    "grand-pioneers",
    "ambassador-cruise",
    "elite-of-the-seas",
    "catherine-cruise",
    "mon-cheri",
    "la-casta-regal",
    "orchid-classic",
  ];

  const topPicks = cruises.filter((c) => topPickSlugs.some((s) => c.slug.includes(s))).slice(0, 10);

  return (
    <div className="bg-sand-50">
      {/* Hero Header */}
      <section className="relative min-h-[50vh] w-full bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
          alt="Best Halong Bay Cruises"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/planning" className="hover:text-brass-300">Guides</Link> /{" "}
            <span className="text-brass-300">Best Cruises</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              Expert Rankings 2026
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              10 Best Halong Bay Cruises
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              Our Hanoi cruise specialists evaluate over 60 vessels across safety, gastronomy, cabin design, guest reviews, and itinerary excellence.
            </p>
          </div>
        </div>
      </section>

      {/* EEAT Editorial Intro */}
      <section className="container-content py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr,1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-ink-700">
            <p>
              With dozens of ships sailing Ha Long Bay, choosing the right cruise can feel overwhelming. To help you select with confidence, our local team continuously inspects vessels, evaluates guest feedback, and reviews onboard dining standards.
            </p>
            <p>
              The top-tier ships listed below represent the absolute best in Vietnamese maritime hospitality — featuring modern steel-hulled safety engineering, floor-to-ceiling glass panoramic suites, heated infinity pools, fine dining seafood, and uncrowded sailing routes in Lan Ha Bay and Bai Tu Long Bay.
            </p>
          </div>

          <div className="rounded-3xl border border-brass-500/30 bg-teal-950 p-6 text-sand-50">
            <span className="eyebrow text-brass-300">EEAT Rating Criteria</span>
            <ul className="mt-4 space-y-3 font-mono text-xs text-sand-100/80">
              <li className="flex justify-between border-b border-teal-800/60 pb-2">
                <span>1. Vessel Age &amp; Safety</span>
                <span className="text-brass-300 font-bold">Max 5-Star Steel Hull</span>
              </li>
              <li className="flex justify-between border-b border-teal-800/60 pb-2">
                <span>2. Cabin Comfort</span>
                <span className="text-brass-300 font-bold">100% Balcony Suites</span>
              </li>
              <li className="flex justify-between border-b border-teal-800/60 pb-2">
                <span>3. Gastronomy</span>
                <span className="text-brass-300 font-bold">Seafood &amp; Fine Dining</span>
              </li>
              <li className="flex justify-between border-b border-teal-800/60 pb-2">
                <span>4. Route Privacy</span>
                <span className="text-brass-300 font-bold">Lan Ha / Bai Tu Long</span>
              </li>
              <li className="flex justify-between">
                <span>5. Verified Ratings</span>
                <span className="text-brass-300 font-bold">9.4+ / 10 Score</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Top Pick Cards List */}
      <section className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content">
          <DividerHeading title="Top Recommended Ships" tone="dark" />

          <div className="space-y-12">
            {topPicks.map((c, idx) => (
              <div
                key={c.slug}
                className="grid gap-8 rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:grid-cols-[1fr,1.3fr] md:p-8"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto">
                  <Image src={c.heroImage} alt={c.name} fill className="object-cover" />
                  <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brass-500 font-mono text-sm font-bold text-teal-950">
                    #{idx + 1}
                  </span>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wideish text-brass-300">
                      {c.region} · {c.durationDays}D / {c.durationNights}N
                    </span>
                    <h3 className="mt-1 font-display text-3xl italic text-sand-50">{c.name}</h3>
                    <p className="mt-3 text-sand-100/80 leading-relaxed">{c.tagline}</p>
                    <div className="mt-4 space-y-2">
                      {c.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-sand-100/70">
                          <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-teal-800/60 pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-sand-100/50">Starting Price</span>
                      <span className="font-mono text-xl font-bold text-terracotta-400">
                        {c.startingPrice ? `$${c.startingPrice}` : "On request"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/cruises/${c.slug}`}
                        className="rounded-full bg-terracotta-500 px-6 py-2.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
                      >
                        View Ship Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-20 text-center text-sand-100 border-t border-teal-800/60">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Compare All 64 Fleet Options</h3>
          <p className="mt-3 text-sand-100/80">Use our interactive finder to compare ships by cabin size, price, pool options, and sailing routes.</p>
          <Link
            href="/cruises"
            className="mt-8 inline-block rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Explore All Cruises
          </Link>
        </div>
      </section>
    </div>
  );
}
