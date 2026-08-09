import Image from "next/image";
import FrontendCmsPage from "@/components/FrontendCmsPage";
import { getFrontendPage } from "@/lib/wp";
import Link from "next/link";
import DividerHeading from "@/components/DividerHeading";

export const metadata = {
  title: "Halong Bay Cruise Prices 2026 | Comprehensive Cost Breakdown",
  description:
    "How much does a Ha Long Bay cruise cost? Transparent price guide for 5-star luxury, boutique, 2D1N, 3D2N, day cruises, hidden fees & money-saving tips.",
};

export default async function CruisePricesGuidePage() {
  const cmsPage = await getFrontendPage("/guides/cruise-prices");
  if (cmsPage) return <FrontendCmsPage page={cmsPage} />;
  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[50vh] w-full bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o="
          alt="Halong Bay Cruise Prices"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/planning" className="hover:text-brass-300">Guides</Link> /{" "}
            <span className="text-brass-300">Cruise Prices</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              Transparent Pricing &amp; Value Guide
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              Halong Bay Cruise Prices 2026
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              Understand standard pricing tiers, what is included in your fare, hidden port fees to avoid, and how to secure official best price guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="container-content py-16 md:py-24">
        <DividerHeading title="2026 Average Price Matrix per Person" />

        <div className="overflow-x-auto rounded-3xl border border-ink-300/20 bg-sand-100/40 p-4 md:p-6">
          <table className="w-full text-left font-sans text-sm text-ink-700">
            <thead>
              <tr className="border-b border-ink-300/30 font-mono text-xs uppercase tracking-wideish text-ink-900">
                <th className="py-4 px-4">Cruise Tier</th>
                <th className="py-4 px-4">Day Cruise (6-8h)</th>
                <th className="py-4 px-4 text-terracotta-600">2 Days 1 Night</th>
                <th className="py-4 px-4 text-teal-800">3 Days 2 Nights</th>
                <th className="py-4 px-4 text-brass-600">Single Supplement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300/20">
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Ultra Luxury 5-Star</td>
                <td className="py-4 px-4">$110 – $140</td>
                <td className="py-4 px-4 font-bold text-terracotta-600">$320 – $580</td>
                <td className="py-4 px-4 font-bold text-teal-800">$620 – $1,150</td>
                <td className="py-4 px-4">+70% to +85%</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Classic 5-Star</td>
                <td className="py-4 px-4">$85 – $110</td>
                <td className="py-4 px-4 font-bold text-terracotta-600">$240 – $340</td>
                <td className="py-4 px-4 font-bold text-teal-800">$480 – $680</td>
                <td className="py-4 px-4">+60% to +75%</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">4-Star Deluxe</td>
                <td className="py-4 px-4">$65 – $85</td>
                <td className="py-4 px-4">$160 – $220</td>
                <td className="py-4 px-4">$320 – $440</td>
                <td className="py-4 px-4">+50% to +65%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* What's Included vs Excluded */}
      <section className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content grid gap-10 md:grid-cols-2">
          <div className="rounded-3xl border border-teal-800/60 bg-teal-900/40 p-8">
            <span className="eyebrow text-brass-300">✅ Included in Cruise Fare</span>
            <ul className="mt-4 space-y-3 text-sm text-sand-100/80">
              <li>• Full board meals (Lunch, Dinner, Breakfast, Brunch)</li>
              <li>• Private oceanview cabin with ensuite bathroom</li>
              <li>• All bay entrance tickets, cave fees &amp; sightseeing permits</li>
              <li>• Kayaking or bamboo boat excursion with local rower</li>
              <li>• Morning sundeck Tai Chi class &amp; cooking masterclass</li>
              <li>• Welcome drinks, in-room bottled water &amp; tea/coffee</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-teal-800/60 bg-teal-900/40 p-8">
            <span className="eyebrow text-terracotta-400">⚠️ Extra Optional Expenses</span>
            <ul className="mt-4 space-y-3 text-sm text-sand-100/80">
              <li>• Hanoi round-trip DCar Limousine transfer ($35–$45/person)</li>
              <li>• Alcoholic beverages, cocktails &amp; espresso coffees at bar</li>
              <li>• Onboard spa massages &amp; wellness treatments</li>
              <li>• Personal travel insurance &amp; crew tips (optional)</li>
              <li>• Surcharges for Christmas Eve (Dec 24) &amp; New Year Eve (Dec 31)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-20 text-center text-sand-100 border-t border-teal-800/60">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Get an Exact Quote with No Hidden Fees</h3>
          <p className="mt-3 text-sand-100/80">Our local desk guarantees official direct rates with zero booking fees.</p>
          <Link
            href="/inquire"
            className="mt-8 inline-block rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Get Price Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
