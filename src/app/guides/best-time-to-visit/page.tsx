import Image from "next/image";
import Link from "next/link";
import WeatherGuide from "@/components/WeatherGuide";
import DividerHeading from "@/components/DividerHeading";

export const metadata = {
  title: "Best Time to Visit Halong Bay 2026 | Month-by-Month Weather Guide",
  description:
    "Discover the best time to visit Ha Long Bay & Lan Ha Bay. Month-by-month temperature, rainfall, dry season, summer swimming, and peak sailing advice.",
};

export default function BestTimeToVisitGuidePage() {
  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[50vh] w-full bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/672505782.jpg?k=af9a41363058cc5225607eaa23856f2106798b07358d4c2775d6e64d5fdb83a0&o="
          alt="Best Time to Visit Halong Bay"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/planning" className="hover:text-brass-300">Guides</Link> /{" "}
            <span className="text-brass-300">Best Time to Visit</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              Weather &amp; Seasonality Guide
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              Best Time to Visit Halong Bay
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              Plan your voyage with confidence using our month-by-month climate breakdown, sea temperature insights, and seasonal sailing advice.
            </p>
          </div>
        </div>
      </section>

      {/* Main Weather Guide Component */}
      <section className="container-content py-16 md:py-24">
        <WeatherGuide />
      </section>

      {/* Seasonal Breakdown Details */}
      <section className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content">
          <DividerHeading title="Seasonal Sailing Analysis" tone="dark" />

          <div className="grid gap-8 md:grid-cols-3">
            {/* Peak Autumn */}
            <div className="rounded-3xl border border-brass-500/40 bg-teal-900/60 p-6 md:p-8">
              <span className="eyebrow text-brass-300">Oct – Dec (Best Overall)</span>
              <h3 className="mt-2 font-display text-2xl italic text-sand-50">Autumn Crisp Air</h3>
              <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">
                Autumn is widely considered the absolute golden season. Expect clear blue skies, minimal rain, comfortable 20°C–25°C temperatures, and stunning golden sunsets over the karst horizon.
              </p>
            </div>

            {/* Spring */}
            <div className="rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:p-8">
              <span className="eyebrow text-brass-300">Mar – May (Spring Bloom)</span>
              <h3 className="mt-2 font-display text-2xl italic text-sand-50">Spring Warmth</h3>
              <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">
                Spring brings pleasant warmth (22°C–28°C) and excellent water visibility. Ideal for active water sports including kayaking, bamboo boating, and swimming in Lan Ha Bay beaches.
              </p>
            </div>

            {/* Summer */}
            <div className="rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:p-8">
              <span className="eyebrow text-terracotta-400">Jun – Sep (Summer Deals)</span>
              <h3 className="mt-2 font-display text-2xl italic text-sand-50">Summer &amp; Promotions</h3>
              <p className="mt-3 text-sm text-sand-100/70 leading-relaxed">
                Summer offers warm tropical sea temperatures (30°C+) and long daylight hours. Luxury 5-star ships offer significant promotional discounts up to 30% off standard rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-20 text-center text-sand-100 border-t border-teal-800/60">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Planning Your Cruise Dates?</h3>
          <p className="mt-3 text-sand-100/80">Our local specialists provide up-to-date weather forecasts and seasonal cabin promotions.</p>
          <Link
            href="/inquire"
            className="mt-8 inline-block rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Check Seasonal Deals
          </Link>
        </div>
      </section>
    </div>
  );
}
