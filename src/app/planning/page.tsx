import Image from "next/image";
import Link from "next/link";
import { getAllCruises, getFrontendPage } from "@/lib/wp";
import FrontendCmsPage from "@/components/FrontendCmsPage";
import DividerHeading from "@/components/DividerHeading";
import PlanningMatchmaker from "@/components/PlanningMatchmaker";
import WeatherGuide from "@/components/WeatherGuide";
import PackingChecklist from "@/components/PackingChecklist";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "Cruise Planning Hub | Everything You Need to Know",
  description:
    "Your complete guide to planning a luxury small-ship sailing in Ha Long Bay, Lan Ha Bay & Bai Tu Long Bay. Weather, transfers, packing list & itinerary planning.",
};

export default async function CruisePlanningHubPage() {
  const cmsPage = await getFrontendPage("/planning");
  if (cmsPage) return <FrontendCmsPage page={cmsPage} />;
  const cruises = await getAllCruises();

  return (
    <div className="bg-sand-50">
      {/* Hero Section — 100% natural photo clarity */}
      <section className="relative min-h-[65vh] w-full overflow-hidden bg-[#0B2224]">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
          alt="Cruise Planning Hub"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2224] via-[#0B2224]/45 to-transparent" />

        <div className="container-content relative flex min-h-[65vh] flex-col justify-between py-16">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <span className="text-brass-300">Cruise Planning Hub</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              Complete Travel Guide
            </span>
            <h1 className="mt-4 font-display text-5xl italic text-sand-50 md:text-7xl">
              Cruise Planning Hub
            </h1>
            <p className="mt-4 text-xl text-sand-100/80 leading-relaxed">
              Everything you need to know to design your ideal voyage across Ha Long Bay, Lan Ha Bay, and Bai Tu Long Bay.
            </p>

            {/* Quick jump nav */}
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wideish">
              <a href="#matchmaker" className="rounded-full border border-sand-100/30 px-4 py-2 text-sand-100/80 transition hover:bg-brass-500 hover:text-teal-950 hover:border-brass-500">
                1. Matchmaker Quiz
              </a>
              <a href="#weather" className="rounded-full border border-sand-100/30 px-4 py-2 text-sand-100/80 transition hover:bg-brass-500 hover:text-teal-950 hover:border-brass-500">
                2. Best Time &amp; Weather
              </a>
              <a href="#transfers" className="rounded-full border border-sand-100/30 px-4 py-2 text-sand-100/80 transition hover:bg-brass-500 hover:text-teal-950 hover:border-brass-500">
                3. Getting There
              </a>
              <a href="#itineraries" className="rounded-full border border-sand-100/30 px-4 py-2 text-sand-100/80 transition hover:bg-brass-500 hover:text-teal-950 hover:border-brass-500">
                4. Duration Guide
              </a>
              <a href="#packing" className="rounded-full border border-sand-100/30 px-4 py-2 text-sand-100/80 transition hover:bg-brass-500 hover:text-teal-950 hover:border-brass-500">
                5. What to Pack
              </a>
              <a href="#faq" className="rounded-full border border-sand-100/30 px-4 py-2 text-sand-100/80 transition hover:bg-brass-500 hover:text-teal-950 hover:border-brass-500">
                6. FAQs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Interactive Matchmaker Quiz */}
      <section id="matchmaker" className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content">
          <DividerHeading title="Find Your Cruise Match" tone="dark" />
          <PlanningMatchmaker allCruises={cruises} />
        </div>
      </section>

      {/* 2. Weather & Seasonality Guide */}
      <section id="weather" className="container-content py-20 md:py-28">
        <DividerHeading title="Weather & Seasonality" />
        <WeatherGuide />
      </section>

      {/* 3. Getting There & Luxury Transfers */}
      <section id="transfers" className="bg-teal-950 py-20 text-sand-100 md:py-28">
        <div className="container-content">
          <DividerHeading title="Transfers & Transportation" tone="dark" />
          
          <div className="mb-12 max-w-2xl">
            <h3 className="font-display text-3xl italic text-sand-50 md:text-4xl">
              How to Get from Hanoi to Ha Long Bay
            </h3>
            <p className="mt-3 text-sand-100/70">
              All cruises depart from Tuan Chau Marina or Got Harbour in Hai Phong. Thanks to the modern Hanoi - Hai Phong Expressway, travel time is only 2 to 2.5 hours.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Limousine Bus */}
            <div className="flex flex-col justify-between rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:p-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wideish text-brass-300">Most Popular</span>
                <h4 className="mt-2 font-display text-2xl italic text-sand-50">Luxury DCar Limousine</h4>
                <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">
                  Shared luxury 9-seat van with leather massage reclining seats, USB chargers, Wi-Fi, and hotel door-to-door pickup in Hanoi Old Quarter.
                </p>
              </div>
              <div className="mt-6 border-t border-teal-800/60 pt-4 flex items-center justify-between font-mono text-xs text-brass-300">
                <span>⏱ 2.5 Hours</span>
                <span>$35–$45 / person</span>
              </div>
            </div>

            {/* Private Car */}
            <div className="flex flex-col justify-between rounded-3xl border border-brass-500/40 bg-teal-900/60 p-6 md:p-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-400">Ultimate Comfort</span>
                <h4 className="mt-2 font-display text-2xl italic text-sand-50">Private Executive Car</h4>
                <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">
                  Private sedan or SUV (Toyota Alphard, SUV, or Mercedes) with dedicated driver. Complete schedule flexibility for families or couples.
                </p>
              </div>
              <div className="mt-6 border-t border-teal-800/60 pt-4 flex items-center justify-between font-mono text-xs text-brass-300">
                <span>⏱ 2.0 Hours</span>
                <span>From $110 / vehicle</span>
              </div>
            </div>

            {/* Seaplane */}
            <div className="flex flex-col justify-between rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:p-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wideish text-brass-300">Bucket List Experience</span>
                <h4 className="mt-2 font-display text-2xl italic text-sand-50">Scenic Seaplane Flight</h4>
                <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">
                  45-minute flight from Hanoi Airport directly to Tuan Chau Marina with spectacular aerial views over thousands of limestone karsts.
                </p>
              </div>
              <div className="mt-6 border-t border-teal-800/60 pt-4 flex items-center justify-between font-mono text-xs text-brass-300">
                <span>⏱ 45 Minutes</span>
                <span>From $190 / person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Duration Breakdown */}
      <section id="itineraries" className="container-content py-20 md:py-28">
        <DividerHeading title="Choosing Your Duration" />
        
        <div className="grid gap-10 md:grid-cols-3">
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/50 p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Option 01</span>
            <h4 className="mt-2 font-display text-2xl italic text-ink-900">2 Days / 1 Night</h4>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              The classic itinerary. Includes overnight luxury cabin stay, 4 multi-course meals, cave visit, kayaking, and sunrise Tai Chi.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs text-ink-600 border-t border-ink-300/20 pt-4">
              <li>✓ Best for travelers with tight schedules</li>
              <li>✓ Covers top bay highlights</li>
              <li>✓ Great value overview</li>
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-brass-500 bg-sand-50 p-8 shadow-xl">
            <span className="font-mono text-xs uppercase tracking-wideish text-brass-600">Recommended</span>
            <h4 className="mt-2 font-display text-2xl italic text-ink-900">3 Days / 2 Nights</h4>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              The ultimate immersive journey. Extra day dedicated to exploring secluded pristine corners of Lan Ha Bay, Viet Hai Village, and quiet lagoons.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs text-ink-600 border-t border-ink-300/20 pt-4">
              <li>★ Unhurried, relaxed sailing pace</li>
              <li>★ Cycling in Viet Hai rainforest village</li>
              <li>★ Kayaking through secret tunnels &amp; lakes</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/50 p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Option 03</span>
            <h4 className="mt-2 font-display text-2xl italic text-ink-900">Full-Day Cruise</h4>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">
              Ideal if you are short on time. Enjoy 6 to 8 hours sailing through Ha Long Bay or Lan Ha Bay on a luxury catamaran with buffet lunch &amp; kayaking.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs text-ink-600 border-t border-ink-300/20 pt-4">
              <li>✓ Same-day return to Hanoi</li>
              <li>✓ Includes kayaking &amp; cave tour</li>
              <li>✓ Budget-friendly luxury</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. What to Pack */}
      <section id="packing" className="chart-grid bg-teal-950 py-20 text-sand-100 md:py-28">
        <div className="container-content">
          <DividerHeading title="Packing & Preparation" tone="dark" />
          <PackingChecklist />
        </div>
      </section>

      {/* 6. FAQs */}
      <section id="faq" className="container-content py-20 md:py-28">
        <DividerHeading title="Frequently Asked Questions" />
        <div className="mx-auto max-w-4xl">
          <FaqAccordion />
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="bg-teal-950 py-20 text-sand-100 text-center">
        <div className="container-content max-w-3xl">
          <span className="eyebrow text-brass-300">Tailor-made Sailings</span>
          <h2 className="mt-3 font-display text-4xl italic text-sand-50 md:text-5xl">
            Ready to Plan Your Ha Long Bay Voyage?
          </h2>
          <p className="mt-4 text-sand-100/80 leading-relaxed">
            Our local cruise specialists are ready to help you pick the perfect vessel, suite, and transfers for your travel dates.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/inquire"
              className="rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
            >
              Plan Your Trip Now
            </Link>
            <Link
              href="/cruises"
              className="rounded-full border border-brass-500/50 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-brass-300 transition hover:bg-brass-500 hover:text-teal-950"
            >
              Browse Fleet (64 Ships)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
