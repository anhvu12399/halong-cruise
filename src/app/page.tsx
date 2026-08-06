import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCruises, getHomepageContent } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";
import CategoryTiles from "@/components/CategoryTiles";
import SectionHeading from "@/components/SectionHeading";
import ShortlistForm from "@/components/ShortlistForm";
import Testimonials from "@/components/Testimonials";
import HeroSearch from "@/components/HeroSearch";
import HeroSlideshow from "@/components/HeroSlideshow";

export const metadata: Metadata = {
  title: "Ha Long Bay Cruise Specialist — Every Budget & Travel Style",
  description:
    "64 handpicked Ha Long Bay cruises from $39/person. Day trips, 2D1N, 3D2N voyages across Ha Long, Lan Ha & Bai Tu Long Bay. Expert advice, free shortlist, book direct.",
  alternates: {
    canonical: "https://www.halongbestcruises.com",
  },
};

// ── SVG trip-type icons ──────────────────────────────────────────────────────
const IconSun = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
);
const IconMoon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
);
const IconAnchor = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="5" r="3" /><line x1="12" y1="8" x2="12" y2="22" /><path d="M5 15H2a10 10 0 007 7" /><path d="M19 15h3a10 10 0 01-7 7" /></svg>
);
const IconShip = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A55A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 20a2 2 0 002 2h16a2 2 0 002-2" /><path d="M6 16l2-8h8l2 8" /><path d="M12 2v6" /><path d="M8 8h8" /></svg>
);

const ICONS = [IconSun, IconMoon, IconAnchor, IconShip];

export default async function HomePage() {
  const content = await getHomepageContent();
  const cruises = await getAllCruises();

  // Chọn đúng 4 tàu hạng sang cao cấp nhất để banner luôn đẹp & sắc nét
  const premiumSlugs = [
    'heritage-cruises-binh-chuan-cat-ba-archipelago',
    'stellar-of-the-seas-cruise',
    'halong-capellacruise-member-of-lyra-cruise-collection',
    'ambassador-cruise-halong-bay'
  ];
  
  const slideCruises = premiumSlugs
    .map(slug => cruises.find(c => c.slug === slug))
    .filter(Boolean)
    .filter((c) => c!.heroImage && c!.heroImage.startsWith('http'))
    .slice(0, 4);

  // Fallback nếu trong DB chưa có các tàu trên thì lấy 4 tàu bất kỳ có ảnh
  if (slideCruises.length < 4) {
    const fallbackCruises = cruises
      .filter((c) => c.heroImage && c.heroImage.startsWith('http') && !slideCruises.includes(c))
      .slice(0, 4 - slideCruises.length);
    slideCruises.push(...fallbackCruises);
  }

  const heroSlides = slideCruises.map((c) => ({
    image: c!.heroImage,
    name: c!.breadcrumbLabel || c!.name || 'Ha Long Bay Cruise',
    slug: c!.slug,
  }));

  return (
    <>
      {/* ── Hero Banner — 4-slide slideshow with real cruise photos ── */}
      <HeroSlideshow
        slides={heroSlides.length > 0 ? heroSlides : (content.heroBackground ? [{ image: content.heroBackground, name: 'Ha Long Bay', slug: 'cruises' }] : [])}
        heroTitle={content.heroTitle}
        heroSubtitle={content.heroSubtitle}
        cruiseCount={cruises.length}
      >
        <HeroSearch />
      </HeroSlideshow>

      {/* ── Start With Your Trip (Styles) ── */}
      {content.selectedStyles && content.selectedStyles.length > 0 && (
        <section className="bg-teal-950 pb-16 pt-0">
          <div className="container-content">
            <p className="eyebrow mb-6 text-brass-300 pt-10">{content.tripTypesTitle || "Start here"}</p>
            <div className="grid gap-4 md:grid-cols-4">
              {content.selectedStyles.map((style, index) => {
                const Icon = ICONS[index % ICONS.length];
                return (
                  <Link
                    key={style.slug}
                    href={`/tours/${style.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-teal-800/80 bg-teal-900/60 p-6 transition hover:border-brass-400 hover:bg-teal-900"
                  >
                    <Icon />
                    <h3 className="mt-3 font-display text-2xl font-medium italic text-sand-50">{style.title}</h3>
                    <p className="mt-1 eyebrow text-[10px] text-brass-400">{style.subtitle}</p>
                    <p className="mt-3 text-sm text-sand-100/80 leading-relaxed font-normal line-clamp-3">
                      {style.descriptionParagraphs?.[0] || ""}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-teal-800/80 pt-3">
                      <span className="font-bold text-brass-300">{style.priceRangeText}</span>
                      <span className="eyebrow text-[10px] text-sand-100/60 transition group-hover:text-brass-300">
                        Explore →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Choose Your Style ── */}
      <section className="container-content py-24 md:py-28">
        <SectionHeading
          eyebrow="Choose your style"
          title="Find your perfect cruise."
          description="Same stunning bay, sorted by what matters most to you."
        />
        <CategoryTiles />
      </section>

      {/* ── Featured Fleet ── */}
      {content.featuredCruises && content.featuredCruises.length > 0 && (
        <section className="bg-sand-100/60 py-24 md:py-32">
          <div className="container-content">
            <SectionHeading
              eyebrow="Handpicked ships"
              title={content.featuredTitle || "Featured Fleet"}
              description="Our top luxury sailings with direct operator pricing."
              cta={{ label: "View all cruises", href: "/cruises" }}
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {content.featuredCruises.map((cruise) => (
                <CruiseCard key={cruise.slug} cruise={cruise} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Regions ── */}
      {content.selectedRegions && content.selectedRegions.length > 0 && (
        <section id="regions" className="container-content py-24 md:py-32">
          <SectionHeading
            eyebrow="Where the boats go"
            title={content.regionsTitle || "The Three Bays"}
            description={content.regionsDescription || "Different bays for different experiences."}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {content.selectedRegions.map((region) => (
              <Link
                key={region.slug}
                href={`/tours/${region.slug}`}
                className="group overflow-hidden rounded-2xl bg-teal-950 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3]">
                  {region.heroImage && (
                    <Image
                      src={region.heroImage}
                      alt={region.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-medium italic text-sand-50 group-hover:text-brass-300 transition">
                    {region.title}
                  </h3>
                  <p className="mt-2 text-sm text-sand-100/80 leading-relaxed line-clamp-3">
                    {region.descriptionParagraphs?.[0] || ""}
                  </p>
                  <p className="mt-4 eyebrow text-[10px] text-brass-300">
                    Explore Region →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Travel Guides Teaser ── */}
      {content.guidesList && content.guidesList.length > 0 && (
        <section className="container-content py-24 md:py-28">
          <SectionHeading
            eyebrow="Ha Long Bay Travel Guides"
            title={content.guidesTitle || "Plan smarter, sail better."}
            description="Free expert guides on the best cruises, prices, when to go, and what to pack."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {content.guidesList.map((g, idx) => (
              <Link
                key={idx}
                href={g.url}
                className="group flex items-center gap-4 rounded-xl border border-sand-200 bg-sand-50 p-4 transition hover:border-brass-400 hover:shadow-md"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand-200 relative">
                  {g.image ? (
                    <Image src={g.image} alt={g.title} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-teal-900">
                       <IconSun />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900 leading-snug group-hover:text-teal-800 transition">
                    {g.title}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase font-bold text-brass-400 transition group-hover:text-brass-300">
                    Read guide →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Get My Cruise Shortlist (Lead Capture) ── */}
      <section className="bg-sand-100/60 py-24 md:py-32">
        <div className="container-content max-w-3xl">
          <ShortlistForm />
        </div>
      </section>
      {/* ── SEO Text Block ── */}
      <section className="container-content py-16">
        <div className="prose prose-sm mx-auto max-w-3xl text-ink-700">
          <h2 className="font-display text-2xl font-medium italic text-ink-900 not-prose">
            Ha Long Bay Cruises — A Specialist Guide
          </h2>
          <p className="mt-4 leading-relaxed font-normal">
            Ha Long Bay, a UNESCO World Heritage Site in northeastern Vietnam, is home to nearly 2,000 limestone
            karst islands rising dramatically from the emerald water of the Gulf of Tonkin. The best way to
            experience it is by cruise.
          </p>
        </div>
      </section>
    </>
  );
}
