import Image from "next/image";
import FrontendCmsPage from "@/components/FrontendCmsPage";
import { getFrontendPage } from "@/lib/wp";
import Link from "next/link";
import DividerHeading from "@/components/DividerHeading";

export const metadata = {
  title: "How to Choose a Halong Bay Cruise | 5 Essential Steps",
  description:
    "Expert guide on how to choose the right Ha Long Bay cruise. 5 key decision steps: itinerary route, vessel size, cabin type, budget & operator safety trust.",
};

export default async function HowToChooseGuidePage() {
  const cmsPage = await getFrontendPage("/guides/how-to-choose");
  if (cmsPage) return <FrontendCmsPage page={cmsPage} />;
  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[50vh] w-full bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/411409062.webp?k=dd0f7b9297bb345b5350265a4466db99778914c17805d5a46a25ab5db2f8df33&o="
          alt="How to Choose a Halong Bay Cruise"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/planning" className="hover:text-brass-300">Guides</Link> /{" "}
            <span className="text-brass-300">How to Choose</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              5-Step Buyer's Decision Framework
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              How to Choose a Halong Bay Cruise
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              Follow our insider 5-step decision framework to pick the perfect ship, suite, and itinerary for your travel style and budget.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Steps */}
      <section className="container-content py-16 md:py-24">
        <DividerHeading title="The 5-Step Selection Framework" />

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/40 p-6 md:p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Step 01</span>
            <h3 className="mt-1 font-display text-2xl italic text-ink-900">Choose Your Bay Region</h3>
            <p className="mt-3 text-ink-700 leading-relaxed">
              Decide between <strong>Ha Long Bay</strong> (famous caves, classic landmarks, busier), <strong>Lan Ha Bay</strong> (pristine, 90% fewer ships, natural beaches, newest 5-star ships), or <strong>Bai Tu Long Bay</strong> (off-the-beaten-path wilderness).
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/40 p-6 md:p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Step 02</span>
            <h3 className="mt-1 font-display text-2xl italic text-ink-900">Select Your Duration</h3>
            <p className="mt-3 text-ink-700 leading-relaxed">
              Pick <strong>2 Days 1 Night</strong> for a classic highlights tour, <strong>3 Days 2 Nights</strong> for deep unhurried exploration and cycling in Viet Hai village, or a <strong>Day Cruise</strong> if short on time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/40 p-6 md:p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Step 03</span>
            <h3 className="mt-1 font-display text-2xl italic text-ink-900">Vessel Size: Mega-Yacht vs Boutique Junk</h3>
            <p className="mt-3 text-ink-700 leading-relaxed">
              Large 5-star ships (30–40 cabins) offer heated swimming pools, elevators, gym, and large sundecks. Small boutique ships (10–18 cabins) offer intimate, quiet atmosphere and personalized service.
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/40 p-6 md:p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Step 04</span>
            <h3 className="mt-1 font-display text-2xl italic text-ink-900">Cabin Selection &amp; Balcony Must-Have</h3>
            <p className="mt-3 text-ink-700 leading-relaxed">
              Always ensure your cabin includes a <strong>private oceanview balcony</strong> or floor-to-ceiling panoramic glass windows. Upper deck suites offer higher elevation views over limestone karsts.
            </p>
          </div>

          {/* Step 5 */}
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/40 p-6 md:p-8">
            <span className="font-mono text-xs uppercase tracking-wideish text-terracotta-600">Step 05</span>
            <h3 className="mt-1 font-display text-2xl italic text-ink-900">Verify Operator License &amp; Safety Standards</h3>
            <p className="mt-3 text-ink-700 leading-relaxed">
              Only book through licensed tour operators with official Vietnam Tourism licenses (GPLHQT). Check hull safety (steel hull vs old wood) and verified user rating scores above 9.0/10.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-20 text-center text-sand-100 border-t border-teal-800/60">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Want Us to Match You Directly?</h3>
          <p className="mt-3 text-sand-100/80">Tell us your budget, dates, and group size — we will send you 3 tailored options within 2 hours.</p>
          <Link
            href="/inquire"
            className="mt-8 inline-block rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Get Custom Match
          </Link>
        </div>
      </section>
    </div>
  );
}
