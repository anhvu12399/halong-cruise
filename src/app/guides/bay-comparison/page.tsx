import Image from "next/image";
import FrontendCmsPage from "@/components/FrontendCmsPage";
import { getFrontendPage } from "@/lib/wp";
import Link from "next/link";
import DividerHeading from "@/components/DividerHeading";

export const metadata = {
  title: "Halong Bay vs Lan Ha Bay vs Bai Tu Long Bay | Comparison Guide",
  description:
    "Comprehensive comparison guide: Ha Long Bay vs Lan Ha Bay vs Bai Tu Long Bay. Scenery, boat crowds, beaches, caves & how to choose the best route.",
};

export default async function BayComparisonGuidePage() {
  const cmsPage = await getFrontendPage("/guides/bay-comparison");
  if (cmsPage) return <FrontendCmsPage page={cmsPage} />;
  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[50vh] w-full bg-teal-950">
        <Image
          src="https://aw-d.tripcdn.com/images/1mc3d12000dq6s641C4EE.jpg"
          alt="Halong Bay vs Lan Ha Bay vs Bai Tu Long Bay"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/planning" className="hover:text-brass-300">Guides</Link> /{" "}
            <span className="text-brass-300">Bay Comparison</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              Route &amp; Destination Comparison
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              Halong Bay vs Lan Ha Bay vs Bai Tu Long Bay
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              Which bay is right for your cruise? Compare scenery, boat density, beaches, caves, and vessel luxury across all three sectors of Tonkin Gulf.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="container-content py-16 md:py-24">
        <DividerHeading title="Head-to-Head Comparison Table" />

        <div className="overflow-x-auto rounded-3xl border border-ink-300/20 bg-sand-100/40 p-4 md:p-6">
          <table className="w-full text-left font-sans text-sm text-ink-700">
            <thead>
              <tr className="border-b border-ink-300/30 font-mono text-xs uppercase tracking-wideish text-ink-900">
                <th className="py-4 px-4">Feature</th>
                <th className="py-4 px-4 text-terracotta-600">Ha Long Bay (Center)</th>
                <th className="py-4 px-4 text-teal-800">Lan Ha Bay (South)</th>
                <th className="py-4 px-4 text-brass-600">Bai Tu Long Bay (Northeast)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-300/20">
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Atmosphere &amp; Crowds</td>
                <td className="py-4 px-4">Busy, classic tourist route</td>
                <td className="py-4 px-4 font-medium text-teal-900">Quiet, uncrowded, pristine</td>
                <td className="py-4 px-4 font-medium text-brass-700">Off-the-beaten-path, very peaceful</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Water &amp; Beaches</td>
                <td className="py-4 px-4">Titov beach (heavily visited)</td>
                <td className="py-4 px-4">139 Natural white sand beaches</td>
                <td className="py-4 px-4">Cap La &amp; Co To wild beaches</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Famous Landmarks</td>
                <td className="py-4 px-4">Sung Sot Cave, Luon Cave, Titov</td>
                <td className="py-4 px-4">Dark &amp; Light Cave, Viet Hai Village</td>
                <td className="py-4 px-4">Thien Canh Son Cave, Vung Vieng</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Vessel Luxury Level</td>
                <td className="py-4 px-4">Mix of traditional &amp; modern</td>
                <td className="py-4 px-4">Newest 5-Star luxury fleet</td>
                <td className="py-4 px-4">Boutique junks &amp; eco-vessels</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-ink-900">Departure Port</td>
                <td className="py-4 px-4">Tuan Chau Marina (Hạ Long)</td>
                <td className="py-4 px-4">Got Harbour (Hải Phòng) / Tuan Chau</td>
                <td className="py-4 px-4">Sun Group International Port</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep-Dive Sections */}
      <section className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content space-y-16">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Ha Long Bay */}
            <div className="rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:p-8">
              <span className="eyebrow text-terracotta-400">Section 01</span>
              <h3 className="mt-2 font-display text-3xl italic text-sand-50">Ha Long Bay (Classic)</h3>
              <p className="mt-4 text-sm text-sand-100/70 leading-relaxed">
                The UNESCO World Heritage core. Best for first-timers who want to see famous postcard monuments like Sung Sot Cave (Surprise Cave) and hike to the top of Titov Island for panoramic views.
              </p>
              <Link href="/tours/2-days-1-night" className="mt-6 inline-block font-mono text-xs uppercase tracking-wideish text-brass-300 underline underline-offset-4">
                View Ha Long Cruises →
              </Link>
            </div>

            {/* Lan Ha Bay */}
            <div className="rounded-3xl border-2 border-brass-500 bg-teal-900/80 p-6 md:p-8">
              <span className="eyebrow text-brass-300">Section 02 (Top Pick)</span>
              <h3 className="mt-2 font-display text-3xl italic text-sand-50">Lan Ha Bay (Pristine)</h3>
              <p className="mt-4 text-sm text-sand-100/70 leading-relaxed">
                Located south of Ha Long, Lan Ha Bay offers identical geological beauty with 90% fewer ships. It is home to hundreds of tiny white sand beaches, Dark &amp; Light underwater cave, and Cat Ba rainforest.
              </p>
              <Link href="/tours/lan-ha-bay" className="mt-6 inline-block font-mono text-xs uppercase tracking-wideish text-brass-300 underline underline-offset-4">
                View Lan Ha Cruises →
              </Link>
            </div>

            {/* Bai Tu Long Bay */}
            <div className="rounded-3xl border border-teal-800/60 bg-teal-900/40 p-6 md:p-8">
              <span className="eyebrow text-brass-300">Section 03</span>
              <h3 className="mt-2 font-display text-3xl italic text-sand-50">Bai Tu Long (Wild)</h3>
              <p className="mt-4 text-sm text-sand-100/70 leading-relaxed">
                Northeast of Ha Long Bay. Offers the ultimate tranquil wilderness for travelers seeking complete isolation, floating fishing villages, and untouched marine biology.
              </p>
              <Link href="/tours/bai-tu-long-bay" className="mt-6 inline-block font-mono text-xs uppercase tracking-wideish text-brass-300 underline underline-offset-4">
                View Bai Tu Long Cruises →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-20 text-center text-sand-100 border-t border-teal-800/60">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Still Undecided Which Bay to Choose?</h3>
          <p className="mt-3 text-sand-100/80">Speak directly with our Hanoi cruise specialists to pick the ideal route for your travel style.</p>
          <Link
            href="/inquire"
            className="mt-8 inline-block rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Ask a Local Specialist
          </Link>
        </div>
      </section>
    </div>
  );
}
