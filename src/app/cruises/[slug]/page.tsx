import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCruises, getCruiseBySlug, getRelatedCruises } from "@/lib/wp";
import DividerHeading from "@/components/DividerHeading";
import ReadMore from "@/components/ReadMore";
import HeroGallery from "@/components/HeroGallery";
import AmenityIcons from "@/components/AmenityIcons";
import SocialAreasGallery from "@/components/SocialAreasGallery";
import RelatedCruisesCarousel from "@/components/RelatedCruisesCarousel";
import CabinGallery from "@/components/CabinGallery";

export async function generateStaticParams() {
  const cruises = await getAllCruises();
  return cruises.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cruise = await getCruiseBySlug(params.slug);
  if (!cruise) return {};
  return { title: cruise.name, description: cruise.tagline };
}

export default async function CruiseDetailPage({ params }: { params: { slug: string } }) {
  const cruise = await getCruiseBySlug(params.slug);
  if (!cruise) notFound();
  const related = await getRelatedCruises(cruise);

  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[86vh] w-full overflow-hidden bg-teal-950">
        <Image src={cruise.heroImage} alt={cruise.name} fill priority className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/60 via-transparent to-transparent" />

        <div className="container-content relative flex min-h-[86vh] flex-col justify-between pb-10 pt-10">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/cruises" className="hover:text-brass-300">{cruise.region}</Link> /{" "}
            <span className="text-brass-300">{cruise.breadcrumbLabel}</span>
          </p>

          <div className="flex flex-col justify-end gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="font-display text-6xl text-sand-50 md:text-7xl">{cruise.name}</h1>
                {cruise.tags.includes("best") && (
                  <span className="eyebrow rounded-full bg-terracotta-500 px-4 py-1.5 text-sand-50">
                    Best Cruises
                  </span>
                )}
              </div>
              <p className="mt-4 max-w-xl text-lg text-sand-100/80">{cruise.tagline}</p>
              <nav className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-wideish text-sand-100/70">
                <a href="#overview" className="hover:text-brass-300">Overview</a>
                <a href="#itinerary" className="hover:text-brass-300">Itinerary</a>
                <a href="#accommodations" className="hover:text-brass-300">Accommodations</a>
                <a href="#related" className="hover:text-brass-300">Related</a>
              </nav>
            </div>

            <HeroGallery images={cruise.galleryImages} name={cruise.name} />
          </div>
        </div>
      </section>

      {/* Booking bar */}
      <div className="sticky top-20 z-30 border-b border-ink-300/20 bg-sand-50/95 backdrop-blur">
        <div className="container-content flex flex-wrap items-center justify-between gap-6 py-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wideish text-ink-300">Starting at</p>
              <p className="font-mono text-lg text-ink-900">
                {cruise.startingPrice ? (
                  <><strong className="text-terracotta-600">${cruise.startingPrice}</strong> / person</>
                ) : (
                  "On request"
                )}
              </p>
            </div>
            <div className="hidden h-10 w-px bg-ink-300/20 sm:block" />
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wideish text-ink-500">
              <svg className="h-4 w-4 text-terracotta-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 11l18-7-7 18-2-8-9-3z" strokeLinejoin="round" />
              </svg>
              {cruise.durationDays} Days / {cruise.durationNights} Nights
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wideish text-ink-500">
              <svg className="h-4 w-4 text-terracotta-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 17h18M4 17l1-7h14l1 7M8 10V6h8v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cruise.guestsMax} Guests / {cruise.cabinCount} Cabins
            </div>
            <AmenityIcons features={cruise.features} />
          </div>
          <Link
            href={`/inquire?cruise=${cruise.slug}`}
            className="shrink-0 rounded-full bg-terracotta-500 px-7 py-2.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Inquire
          </Link>
        </div>
      </div>

      {/* Overview */}
      <section id="overview" className="container-content py-20 md:py-28">
        <DividerHeading title="Overview" />
        <div className="grid gap-12 md:grid-cols-[1fr,1.3fr] md:gap-16">
          <div className="md:sticky md:top-44 md:h-fit">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image src={cruise.galleryImages[0] ?? cruise.heroImage} alt="" fill className="object-cover" />
            </div>

            {cruise.highlights.length > 0 && (
              <>
                <p className="eyebrow mb-4 mt-10">Highlights</p>
                <ul className="space-y-3 border-t border-ink-300/20 pt-6">
                  {cruise.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-ink-700">
                      <svg className="mt-1 h-3.5 w-3.5 shrink-0 text-terracotta-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <ReadMore>
            <div className="space-y-6 text-lg leading-relaxed text-ink-700">
              {cruise.overview.map((p, i) =>
                i === 0 ? (
                  <p key={i}>
                    <span className="float-left mr-3 mt-1 flex h-12 w-12 items-center justify-center border border-terracotta-500/40 font-display text-3xl italic text-terracotta-600">
                      {p.charAt(0)}
                    </span>
                    {p.slice(1)}
                  </p>
                ) : (
                  <p key={i}>{p}</p>
                )
              )}

              {cruise.lifeOnBoard.length > 0 && (
                <>
                  <h3 className="pt-2 font-display text-xl italic text-ink-900">Life on board</h3>
                  {cruise.lifeOnBoard.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </>
              )}
            </div>
          </ReadMore>
        </div>
      </section>

      {/* Itinerary */}
      <section id="itinerary" className="chart-grid bg-teal-950 py-20 text-sand-100 md:py-28">
        <div className="container-content">
          <DividerHeading title="Itinerary" tone="dark" />

          <div className="mb-14 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wideish">
            <span className="text-sand-100/50">Day:</span>
            {cruise.itinerary.map((d) => (
              <a
                key={d.day}
                href={`#day-${d.day}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-brass-500/50 text-brass-300 transition hover:bg-brass-500 hover:text-teal-950"
              >
                {d.day}
              </a>
            ))}
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-[repeating-linear-gradient(180deg,theme(colors.brass.500)_0,theme(colors.brass.500)_6px,transparent_6px,transparent_14px)] md:block"
            />
            <ol className="space-y-16">
              {cruise.itinerary.map((day) => (
                <li key={day.day} id={`day-${day.day}`} className="relative grid scroll-mt-40 gap-8 md:grid-cols-[56px,1fr,1.1fr] md:gap-10">
                  <div className="hidden md:block">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brass-500 bg-teal-950 font-mono text-sm text-brass-300">
                      {String(day.day).padStart(2, "0")}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wideish text-brass-300 md:hidden">
                      Day {String(day.day).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-2xl italic text-sand-50">{day.title}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wideish text-sand-100/50">{day.location}</p>
                    <div className="mt-6 space-y-4">
                      {day.blocks.map((b, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="w-10 shrink-0 font-mono text-xs text-brass-400">{b.period}</span>
                          <p className="text-sand-100/80">{b.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {day.image && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto">
                      <Image src={day.image} alt={day.title} fill className="object-cover" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Accommodations */}
      <section id="accommodations" className="py-20 md:py-28">
        <div className="container-content">
          {cruise.socialAreas.length > 0 && (
            <div className="mb-20">
              <p className="eyebrow mb-6 text-center md:text-left">Social areas</p>
              <SocialAreasGallery areas={cruise.socialAreas} />
            </div>
          )}

          <p className="eyebrow mb-10 text-center md:text-left">Suites &amp; cabins</p>
          <div className="space-y-16">
            {cruise.cabins.map((cabin, i) => (
              <div
                key={cabin.name}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">{cabin.cabinCount} cabins</p>
                  <h3 className="mt-2 font-display text-3xl italic text-ink-900">{cabin.name}</h3>
                  <dl className="mt-5 grid grid-cols-3 gap-4 border-y border-ink-300/20 py-4 font-mono text-xs uppercase tracking-wideish text-ink-500">
                    <div><dt className="text-ink-300">Guests</dt><dd className="mt-1 text-ink-900">{cabin.guests}</dd></div>
                    <div><dt className="text-ink-300">Size</dt><dd className="mt-1 text-ink-900">{cabin.size}</dd></div>
                    <div><dt className="text-ink-300">Beds</dt><dd className="mt-1 text-ink-900">{cabin.beds}</dd></div>
                  </dl>
                  <p className="mt-5 leading-relaxed text-ink-700">{cabin.description}</p>
                </div>
                <CabinGallery
                  images={cabin.galleryImages && cabin.galleryImages.length > 0 ? cabin.galleryImages : [cabin.image]}
                  name={cabin.name}
                  reversed={i % 2 === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical info */}
      <section className="bg-teal-900 py-16 text-sand-100">
        <div className="container-content grid gap-10 md:grid-cols-3">
          {cruise.deckPlanImage && (
            <div>
              <p className="eyebrow mb-4">Deck plan</p>
              <div className="relative aspect-[2/1] overflow-hidden rounded-xl bg-teal-950">
                <Image src={cruise.deckPlanImage} alt="Deck plan" fill className="object-cover" />
              </div>
            </div>
          )}
          <div>
            <p className="eyebrow mb-4">Features</p>
            <ul className="space-y-2 text-sm text-sand-100/80">
              {cruise.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-brass-400" /> {f}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Equipment</p>
            <ul className="space-y-2 text-sm text-sand-100/80">
              {cruise.equipment.map((e) => (
                <li key={e} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-brass-400" /> {e}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section id="related" className="container-content py-20 md:py-28">
          <DividerHeading title="Related Cruises" />
          <RelatedCruisesCarousel cruises={related} />
        </section>
      )}
    </div>
  );
}
