import Image from "next/image";
import Link from "next/link";
import { getAllCruises, getAllGuides } from "@/lib/wp";
import { pressLogos } from "@/lib/mockData";
import CruiseCard from "@/components/CruiseCard";
import CategoryTiles from "@/components/CategoryTiles";
import SectionHeading from "@/components/SectionHeading";
import HeroSearch from "@/components/HeroSearch";
import GuideCard from "@/components/GuideCard";
import HeroSlideshow from "@/components/HeroSlideshow";

const HERO_SLIDES = [
  {
    image: "/images/halong-ai-hero-indochine-day.jpg",
    name: "Indochine Heritage 5-Star Luxury Vessel",
    slug: "majesty-luxury-prime-cruise-by-premier-group",
  },
  {
    image: "/images/halong-ai-hero-misty-expedition.jpg",
    name: "Misty Lan Ha Bay Small-Ship Expedition",
    slug: "genesis-luxury-regal-cruise-by-premier-group",
  },
  {
    image: "/images/halong-ai-hero-sunrise-modern.jpg",
    name: "Modern Grand Balcony Suite Cruise",
    slug: "mon-cheri-cruises",
  },
  {
    image: "/images/halong-ai-hero-sunset-navy.jpg",
    name: "Navy Sunset Sundeck Pool Cruise",
    slug: "heritage-line-violet-cruise",
  },
];

const REGIONS = [
  {
    name: "Ha Long Bay",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.jpg?k=211297536d21da0f27b9567678c717d3603a4d909e41167d9b6503efd4bc55f8&o=&hp=1",
    copy: "The UNESCO-listed original: nearly 2,000 limestone karsts rising out of a single bay, and the busiest water in the north.",
  },
  {
    name: "Lan Ha Bay",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/294655147.jpg?k=1c13cce7a0f9d3f6b4a0ec31c52fe348513b26920c11bd680643c4a7aff977b9&o=",
    copy: "The same geology, a fraction of the traffic. Most of our two- and three-day sailings favour this route.",
  },
  {
    name: "Bai Tu Long Bay",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/598036986.jpg?k=c4e1a6957b15cfbb4441e1470d2860c560eb12eb7798ca91ceea877d0507ea5c&o=",
    copy: "The quiet north. National park coastline, mangrove lagoons, and boats that go days without seeing another ship.",
  },
];

export default async function HomePage() {
  const cruises = await getAllCruises();
  const guides = await getAllGuides();
  const featured = cruises.slice(0, 4);
  const featuredGuides = guides.slice(0, 3);

  return (
    <>
      {/* Hero Slideshow */}
      <HeroSlideshow slides={HERO_SLIDES} cruiseCount={cruises.length}>
        <HeroSearch />
      </HeroSlideshow>

      {/* Choose your cruise — category tiles */}
      <section className="container-content py-24 md:py-28">
        <SectionHeading
          eyebrow="Start here"
          title="Choose your cruise."
          description="Same fleet, sorted by what matters to you — budget, occasion, or party size."
        />
        <CategoryTiles />
      </section>

      {/* Thesis */}
      <section className="container-content py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-[0.9fr,1.1fr] md:gap-16">
          <p className="eyebrow">Why we exist</p>
          <div className="space-y-6 text-xl leading-relaxed text-ink-700 md:text-2xl">
            <p>
              Most Ha Long Bay bookings run through two or three layers of resale before they reach a
              boat. We skip that: every ship on this site is one we've sailed, and every rate is the
              rate the operator actually charges.
            </p>
            <p className="text-ink-500">
              That means smaller ships stay findable, cabin photos match the cabin you get, and if a
              sailing is full, we tell you it's full.
            </p>
          </div>
        </div>
      </section>

      {/* Featured fleet */}
      <section className="bg-sand-100/70 py-24 md:py-32">
        <div className="container-content">
          <SectionHeading
            eyebrow="The fleet"
            title="Four ships, four routes."
            cta={{ label: "View all cruises", href: "/cruises" }}
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((cruise) => (
              <CruiseCard key={cruise.slug} cruise={cruise} />
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section id="regions" className="container-content py-24 md:py-32">
        <SectionHeading eyebrow="Where the boats go" title="Three bays, each with a different temper." />
        <div className="grid gap-8 md:grid-cols-3">
          {REGIONS.map((region) => (
            <div key={region.name} className="overflow-hidden rounded-2xl bg-teal-950">
              <div className="relative aspect-[4/3]">
                <Image
                  src={region.image}
                  alt={region.name}
                  fill
                  unoptimized
                  className="object-cover opacity-90"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl italic text-sand-50">{region.name}</h3>
                <p className="mt-2 text-sm text-sand-100/70">{region.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / trust */}
      <section id="about" className="bg-teal-950 py-24 text-sand-100 md:py-32">
        <div className="container-content grid gap-14 md:grid-cols-3">
          {[
            {
              k: "01",
              t: "Direct rates",
              d: "You pay what the ship charges — the same figure a walk-up guest would be quoted at the pier.",
            },
            {
              k: "02",
              t: "Real availability",
              d: "Cabin counts sync from each operator's own booking system, so a sold-out sailing shows as sold out.",
            },
            {
              k: "03",
              t: "A team that's sailed them",
              d: "Every cabin photo, every itinerary note, comes from someone on our team who has actually been aboard.",
            },
          ].map((item) => (
            <div key={item.k}>
              <p className="font-mono text-sm text-brass-400">{item.k}</p>
              <h3 className="mt-3 font-display text-2xl italic text-sand-50">{item.t}</h3>
              <p className="mt-3 text-sand-100/70">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Guides teaser */}
      {featuredGuides.length > 0 && (
        <section className="bg-sand-100/70 py-24 md:py-32">
          <div className="container-content">
            <SectionHeading
              eyebrow="From the log"
              title="Practical notes before you book."
              cta={{ label: "All guides", href: "/guides" }}
            />
            <div className="grid gap-8 md:grid-cols-3">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Press */}
      <section className="border-y border-sand-200 py-10">
        <div className="container-content flex flex-wrap items-center justify-center gap-x-12 gap-y-4 font-display text-lg italic text-ink-500">
          {pressLogos.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </section>
    </>
  );
}
