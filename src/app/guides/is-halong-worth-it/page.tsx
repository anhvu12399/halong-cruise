import type { Metadata } from "next";
import Link from "next/link";
import FrontendCmsPage from "@/components/FrontendCmsPage";
import { getFrontendPage } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Is Ha Long Bay Worth Visiting? — An Honest Answer",
  description:
    "Is Ha Long Bay worth it? An honest guide covering the crowds, the cost, the best times to go, and why — on the right ship — it's one of the world's great travel experiences.",
  alternates: { canonical: "https://www.halongbestcruises.com/guides/is-halong-worth-it" },
};

const VERDICT_POINTS = [
  {
    verdict: "✅ Yes — if you book an overnight cruise",
    detail:
      "Day-trippers often feel underwhelmed because they only see the busy harbour zone. An overnight sailing moves you into the quiet bays at dusk, lets you anchor under the stars, and gives you a dawn view that no day trip can replicate.",
  },
  {
    verdict: "✅ Yes — if you choose a small ship",
    detail:
      "Large party boats with 60+ cabins create a resort-on-water feel that obscures the natural surroundings. Ships with 10–20 cabins anchor in quieter locations and give you a genuinely intimate experience of the bay.",
  },
  {
    verdict: "⚠️ Depends — if you're visiting July–August",
    detail:
      "Ha Long Bay's peak summer season coincides with Vietnamese domestic holidays and monsoon season. The bay is at its most crowded and the weather least predictable. October–April is dramatically better.",
  },
  {
    verdict: "⚠️ Depends — if you're expecting total solitude",
    detail:
      "Ha Long Bay receives over 3 million visitors per year. Even on a quiet day, you'll see other boats in the main zone. The solution: choose a ship that sails to Lan Ha Bay or Bai Tu Long Bay for at least one night.",
  },
  {
    verdict: "❌ Skip it — if you only have half a day",
    detail:
      "A 4-hour harbour tour gives you no sense of the bay's scale or remoteness. If all you have is half a day, spend it elsewhere in Vietnam and save Ha Long Bay for when you have at least one night.",
  },
];

export default async function IsHalongWorthItPage() {
  const cmsPage = await getFrontendPage("/guides/is-halong-worth-it");
  if (cmsPage) return <FrontendCmsPage page={cmsPage} />;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is Ha Long Bay worth visiting?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — Ha Long Bay is one of the world's great natural wonders and consistently lives up to expectations when experienced correctly. The key is to book an overnight cruise (not a day trip) on a small ship (under 20 cabins), and to visit between October and April. On these terms, very few travellers are disappointed.",
                },
              },
              {
                "@type": "Question",
                name: "Is Ha Long Bay overrated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ha Long Bay is called overrated by travellers who visited on a large party boat or a crowded day trip in summer. On a small ship with an overnight itinerary in the shoulder season, the scenery is extraordinary and most visitors call it a highlight of their Southeast Asia trip.",
                },
              },
            ],
          }),
        }}
      />

      <div className="bg-sand-50 min-h-screen">
        <section className="bg-teal-950 py-20 text-sand-50">
          <div className="container-content max-w-3xl">
            <p className="eyebrow text-brass-400">
              <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
              <Link href="/guides" className="hover:text-brass-300">Travel Guides</Link> / Is Ha Long Bay Worth It?
            </p>
            <h1 className="mt-6 font-display text-4xl italic md:text-5xl">
              Is Ha Long Bay Worth Visiting?
            </h1>
            <p className="mt-4 text-sand-100/70 text-lg">
              An honest answer — from a team that has sailed the bay hundreds of times.
            </p>
          </div>
        </section>

        <div className="container-content max-w-3xl py-16">
          {/* Verdict box */}
          <div className="rounded-2xl bg-teal-950 p-8 text-sand-50">
            <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-400">Our verdict</p>
            <p className="mt-3 font-display text-2xl italic text-sand-50">
              Yes — but it depends entirely on how you visit.
            </p>
            <p className="mt-3 text-sand-100/75 leading-relaxed">
              Ha Long Bay has nearly 2,000 limestone karst islands rising from emerald water. On the right ship, at the right time of year, it is one of the most spectacular natural environments on the planet. On the wrong ship, in peak summer, it can feel underwhelming. Here&apos;s what makes the difference.
            </p>
          </div>

          {/* Verdict breakdown */}
          <div className="mt-10 space-y-5">
            {VERDICT_POINTS.map((vp) => (
              <div key={vp.verdict} className="rounded-2xl border border-sand-200 bg-white p-6">
                <h3 className="font-semibold text-ink-900">{vp.verdict}</h3>
                <p className="mt-2 text-sm text-ink-700 leading-relaxed">{vp.detail}</p>
              </div>
            ))}
          </div>

          {/* Long-form content */}
          <div className="prose prose-stone mt-12 max-w-none">
            <h2 className="font-display text-3xl italic text-ink-900 not-prose mt-12">The honest case for Ha Long Bay</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Ha Long Bay is a UNESCO World Heritage Site covering 1,553 km² of the Gulf of Tonkin, with 1,969 documented limestone karst islands. It&apos;s been repeatedly named one of the natural wonders of Asia and appears on virtually every list of &ldquo;must-see&rdquo; destinations in Southeast Asia.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              The scenery is real, and it is extraordinary. Photographs do not exaggerate the scale of the karst formations. Waking up on an anchored ship at 5:30 AM, surrounded by limestone peaks emerging from dawn mist with no other boats visible, is a genuinely rare experience.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              The risk of disappointment comes from visiting in the wrong way: a half-day trip on a large boat in July, anchored in a crowded part of the bay with 50 other ships visible. That&apos;s not Ha Long Bay&apos;s fault — it&apos;s the fault of a poor cruise choice.
            </p>

            <h2 className="font-display text-3xl italic text-ink-900 not-prose mt-10">What makes Ha Long Bay worth it</h2>
            <ul className="mt-4 space-y-2 text-ink-700">
              <li>An <Link href="/tours/3-days-2-nights" className="text-teal-700 underline">overnight or 3-night cruise</Link> on a ship with fewer than 20 cabins</li>
              <li>Visiting between <Link href="/guides/best-time-to-visit" className="text-teal-700 underline">October and April</Link> (dry season, cleaner skies)</li>
              <li>Choosing a ship that sails to <Link href="/tours/lan-ha-bay" className="text-teal-700 underline">Lan Ha Bay</Link> or <Link href="/tours/bai-tu-long-bay" className="text-teal-700 underline">Bai Tu Long Bay</Link> for at least one night</li>
              <li>Waking up before sunrise and being on deck — every time</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-sand-100 p-8 text-center">
            <h3 className="font-display text-2xl italic text-ink-900">Let us match you to the right cruise</h3>
            <p className="mt-2 text-ink-600">We&apos;ll send you 3–5 ships based on your budget, style and travel dates — free, within 2 hours.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#get-shortlist" className="rounded-full bg-terracotta-500 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-sand-50 hover:bg-terracotta-600 transition">
                Get Free Cruise Shortlist →
              </Link>
              <Link href="/guides/how-to-choose" className="rounded-full border border-teal-800 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-teal-800 hover:bg-teal-800 hover:text-sand-50 transition">
                How to Choose a Cruise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
