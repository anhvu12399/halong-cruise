import Image from "next/image";
import Link from "next/link";
import { getAllCruises } from "@/lib/wp";
import { pressLogos } from "@/lib/mockData";
import CruiseCard from "@/components/CruiseCard";
import CategoryTiles from "@/components/CategoryTiles";
import SectionHeading from "@/components/SectionHeading";

const REGIONS = [
  {
    name: "Ha Long Bay",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o=",
    copy: "The UNESCO-listed original: nearly 2,000 limestone karsts rising out of a single bay, and the busiest water in the north.",
  },
  {
    name: "Lan Ha Bay",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o=",
    copy: "The same geology, a fraction of the traffic. Most of our two- and three-day sailings favour this route.",
  },
  {
    name: "Bai Tu Long Bay",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o=",
    copy: "The quiet north. National park coastline, mangrove lagoons, and boats that go days without seeing another ship.",
  },
];

export default async function HomePage() {
  const cruises = await getAllCruises();
  const featured = cruises.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
          alt="Junk boats at anchor among the karsts of Ha Long Bay at dusk"
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-teal-950/10" />
        <div className="chart-grid absolute inset-0 opacity-40" />

        <div className="container-content relative z-10 pb-20 pt-40">
          <p className="eyebrow mb-5">Small-Ship Sailing · Ha Long, Lan Ha &amp; Bai Tu Long Bay</p>
          <h1 className="max-w-3xl font-display text-5xl font-normal leading-[1.08] tracking-tight text-sand-50 md:text-7xl">
            Three days on the water,{" "}
            <span className="italic text-terracotta-400">not much of a schedule.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sand-100/80">
            We book directly with a short list of small-ship operators across northern Vietnam's bays —
            no resale markup, no call centre, real availability.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/cruises"
              className="rounded-full bg-terracotta-500 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
            >
              Browse Cruises
            </Link>
            <Link
              href="/inquire"
              className="rounded-full border border-sand-100/30 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:border-brass-300 hover:text-brass-300"
            >
              Talk to Someone
            </Link>
          </div>
        </div>

        {/* Log strip */}
        <div className="container-content relative z-10 grid grid-cols-3 gap-6 border-t border-sand-100/15 py-6 font-mono text-sand-100/70 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wideish text-brass-300">Sailings</p>
            <p className="mt-1 text-2xl text-sand-50">{cruises.length} ships</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wideish text-brass-300">Duration</p>
            <p className="mt-1 text-2xl text-sand-50">2–4 days</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wideish text-brass-300">Departs</p>
            <p className="mt-1 text-2xl text-sand-50">Hanoi, daily</p>
          </div>
        </div>
      </section>

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
                  className="object-cover"
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
