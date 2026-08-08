import Image from "next/image";
import Link from "next/link";
import { Cruise } from "@/lib/types";
import DividerHeading from "@/components/DividerHeading";
import AmenityIcons from "@/components/AmenityIcons";

export type CategoryPageProps = {
  title: string;
  eyebrow: string;
  subtitle: string;
  heroImage: string;
  descriptionParagraphs: string[];
  keyHighlights: string[];
  filterFn: (cruise: Cruise) => boolean;
  allCruises: Cruise[];
  priceRangeText?: string;
  bestMonthsText?: string;
  expertAdvice?: string;
  faqs?: { q: string; a: string }[];
};

export default function CategoryListingPage({
  title,
  eyebrow,
  subtitle,
  heroImage,
  descriptionParagraphs,
  keyHighlights,
  filterFn,
  allCruises,
  priceRangeText,
  bestMonthsText,
  expertAdvice,
  faqs,
}: CategoryPageProps) {
  const filtered = allCruises.filter(filterFn);
  const displayCruises = filtered.length > 0 ? filtered : allCruises.slice(0, 12);

  return (
    <div className="bg-sand-50">
      {/* Hero Section — 100% crisp natural photo colors, no green tint mask */}
      <section className="relative min-h-[55vh] w-full overflow-hidden bg-[#0B1D28]">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D28]/95 via-[#0B1D28]/45 to-transparent" />

        <div className="container-content relative flex min-h-[55vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <span className="text-brass-300">{title}</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              {eyebrow}
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              {title}
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Overview & EEAT Expert Context */}
      <section className="container-content py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr,1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-ink-700">
            {descriptionParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            {expertAdvice && (
              <div className="mt-8 rounded-2xl border border-brass-500/40 bg-teal-950 p-6 text-sand-50">
                <span className="eyebrow text-brass-300">💡 Local Cruise Expert Advice</span>
                <p className="mt-2 text-sm text-sand-100/90 leading-relaxed">{expertAdvice}</p>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/60 p-6 md:p-8 space-y-6">
            <div>
              <span className="eyebrow text-terracotta-600">Quick Specs</span>
              <h4 className="font-display text-xl italic text-ink-900 mt-1">Category Overview</h4>
            </div>

            <div className="space-y-4 font-mono text-xs uppercase tracking-wideish text-ink-600 border-t border-ink-300/20 pt-4">
              <div className="flex justify-between border-b border-ink-300/20 pb-2">
                <span className="text-ink-400">Available Ships</span>
                <span className="text-ink-900 font-bold">{filtered.length} Vessels</span>
              </div>
              {priceRangeText && (
                <div className="flex justify-between border-b border-ink-300/20 pb-2">
                  <span className="text-ink-400">Price Range</span>
                  <span className="text-terracotta-600 font-bold">{priceRangeText}</span>
                </div>
              )}
              {bestMonthsText && (
                <div className="flex justify-between border-b border-ink-300/20 pb-2">
                  <span className="text-ink-400">Best Season</span>
                  <span className="text-ink-900 font-bold">{bestMonthsText}</span>
                </div>
              )}
            </div>

            {keyHighlights.length > 0 && (
              <div>
                <span className="eyebrow text-ink-400">Key Experience Highlights</span>
                <ul className="mt-3 space-y-2 text-sm text-ink-700">
                  {keyHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-terracotta-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ships Grid */}
      <section className="chart-grid bg-teal-950 py-20 text-sand-100 md:py-28">
        <div className="container-content">
          <DividerHeading title={`Featured ${title} (${displayCruises.length})`} tone="dark" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayCruises.map((c) => (
              <div
                key={c.slug}
                className="group flex flex-col justify-between rounded-3xl border border-teal-800/60 bg-teal-900/40 p-5 transition duration-300 hover:border-brass-500/50 hover:bg-teal-900/80"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={c.heroImage}
                      alt={c.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-teal-950/80 px-3 py-1 font-mono text-[11px] uppercase text-brass-300 backdrop-blur">
                      {c.durationDays}D / {c.durationNights}N
                    </span>
                    {c.tags.includes("best") && (
                      <span className="absolute right-3 top-3 rounded-full bg-terracotta-500 px-3 py-1 font-mono text-[10px] uppercase text-sand-50">
                        Best Seller
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-2xl italic text-sand-50 group-hover:text-brass-300">
                    {c.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wideish text-brass-400">
                    {c.region} · {c.cabinCount} Cabins
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-sand-100/70">{c.tagline}</p>

                  <div className="mt-4">
                    <AmenityIcons features={c.features} />
                  </div>
                </div>

                <div className="mt-6 border-t border-teal-800/60 pt-4 flex items-center justify-between">
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-sand-100/50">Starting Price</span>
                    <span className="font-mono text-lg font-bold text-terracotta-400">
                      {c.startingPrice ? `$${c.startingPrice}` : "On request"}
                    </span>
                  </div>

                  <Link
                    href={`/cruises/${c.slug}`}
                    className="rounded-full bg-terracotta-500 px-5 py-2 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
                  >
                    View Ship
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {faqs && faqs.length > 0 && (
        <section className="container-content py-20 md:py-28">
          <DividerHeading title="Frequently Asked Questions" />
          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-ink-300/20 bg-sand-100/40 p-6">
                <h4 className="font-display text-xl italic text-ink-900">{faq.q}</h4>
                <p className="mt-2 text-ink-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Footer Banner */}
      <section className="bg-teal-950 py-20 text-center text-sand-100">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Need Custom Advice for {title}?</h3>
          <p className="mt-3 text-sand-100/80">
            Talk to our local Ha Long Bay specialists for cabin recommendations, group discounts, and custom transfer arrangements.
          </p>
          <Link
            href="/inquire"
            className="mt-8 inline-block rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Inquire Now
          </Link>
        </div>
      </section>
    </div>
  );
}
