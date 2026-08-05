import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Get from Hanoi to Ha Long Bay — Transport Guide 2025",
  description:
    "Complete guide to getting from Hanoi to Ha Long Bay: tourist bus, private car, speedboat, and seaplane options. Journey times, costs, and expert tips.",
  alternates: { canonical: "https://www.halongbestcruises.com/guides/hanoi-to-halong" },
};

const TRANSPORT_OPTIONS = [
  {
    method: "Cruise Transfer (Included)",
    time: "2.5–3 hours",
    cost: "Free (included in cruise price)",
    bestFor: "Most travellers",
    pros: ["No logistics to manage", "Air-conditioned minibus", "Door-to-door from your hotel"],
    cons: ["Fixed departure time (~7:30 AM)", "Shared with other cruise guests"],
  },
  {
    method: "Private Car",
    time: "2–2.5 hours",
    cost: "$60–$90 one way",
    bestFor: "Couples, families, or those who want flexibility",
    pros: ["Depart any time", "Direct, no stops", "More comfortable"],
    cons: ["Higher cost", "Need to arrange return separately"],
  },
  {
    method: "Luxury Speedboat",
    time: "45 minutes",
    cost: "From $150/person",
    bestFor: "Those connecting from Cat Ba Island",
    pros: ["Fastest option", "Dramatic arrival by sea", "Skip the harbour"],
    cons: ["Only from certain departure points", "Weather-dependent"],
  },
  {
    method: "Public Bus (Halong Express)",
    time: "3–3.5 hours",
    cost: "$8–$15",
    bestFor: "Budget travellers not on a cruise",
    pros: ["Very affordable", "Comfortable modern coaches"],
    cons: ["Doesn't go to Tuan Chau Harbour directly", "Not ideal with luggage for a cruise"],
  },
];

export default function HanoiToHalongPage() {
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
                name: "How long does it take to get from Hanoi to Ha Long Bay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The drive from Hanoi city centre to Tuan Chau Harbour (the main cruise departure point) takes 2.5–3 hours via the expressway. A private car can do it in 2–2.5 hours. Speedboats from Cat Ba take 45 minutes.",
                },
              },
              {
                "@type": "Question",
                name: "How much does it cost to get from Hanoi to Ha Long Bay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Transfer costs vary: free if included in your cruise package, $60–90 for a private car, $8–15 on public buses, or $150+ for a speedboat. Most overnight cruises include the transfer in the price.",
                },
              },
            ],
          }),
        }}
      />

      <div className="bg-sand-50 min-h-screen">
        {/* Hero */}
        <section className="bg-teal-950 py-20 text-sand-50">
          <div className="container-content max-w-3xl">
            <p className="eyebrow text-brass-400">
              <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
              <Link href="/guides" className="hover:text-brass-300">Travel Guides</Link> / Hanoi to Ha Long Bay
            </p>
            <h1 className="mt-6 font-display text-4xl italic md:text-5xl">
              How to Get from Hanoi to Ha Long Bay
            </h1>
            <p className="mt-4 text-sand-100/70 text-lg">
              Journey times, costs, and the best transfer option for your trip — updated 2025.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="eyebrow rounded-full border border-brass-500/30 bg-brass-500/10 px-3 py-1 text-brass-300">2.5–3 hrs by road</span>
              <span className="eyebrow rounded-full border border-teal-700 bg-teal-800/50 px-3 py-1 text-sand-100/70">4 transport options</span>
            </div>
          </div>
        </section>

        <div className="container-content max-w-3xl py-16">
          {/* Intro */}
          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-ink-700 leading-relaxed">
              Ha Long Bay is located approximately 170 km east of Hanoi in Quang Ninh Province. The main cruise departure point — Tuan Chau International Marina — is best reached by road along Vietnam&apos;s Ha Long Expressway, which opened in 2018 and reduced the journey time from 4+ hours to roughly 2.5 hours.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              The good news for most cruise travellers: <strong>you don&apos;t need to arrange the transfer yourself</strong>. Almost all cruise operators include hotel pick-up from Hanoi&apos;s Old Quarter in their base price. You step out of your hotel at 7:30 AM and step off the bus at Tuan Chau Harbour.
            </p>
          </div>

          {/* Transport options */}
          <h2 className="mt-12 font-display text-3xl italic text-ink-900">Transport Options</h2>
          <div className="mt-6 grid gap-5">
            {TRANSPORT_OPTIONS.map((opt) => (
              <div key={opt.method} className="rounded-2xl border border-sand-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-ink-900 text-lg">{opt.method}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-wideish text-brass-500 mt-0.5">{opt.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ink-900">{opt.time}</p>
                    <p className="text-sm text-ink-500">{opt.cost}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wideish text-green-700 mb-1">Pros</p>
                    <ul className="space-y-1">
                      {opt.pros.map((p) => <li key={p} className="text-sm text-ink-700 flex gap-2"><span className="text-green-500">✓</span>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wideish text-red-600 mb-1">Cons</p>
                    <ul className="space-y-1">
                      {opt.cons.map((c) => <li key={c} className="text-sm text-ink-700 flex gap-2"><span className="text-red-400">–</span>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expert tip */}
          <div className="mt-10 rounded-2xl bg-teal-950 p-7 text-sand-50">
            <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-400">Expert advice</p>
            <p className="mt-3 text-sand-100/85 leading-relaxed">
              Unless you have a specific reason to arrange your own transfer, just include the Hanoi pick-up in your cruise package. Every ship we list can arrange hotel collection from the Hanoi Old Quarter, Ba Dinh, and Tay Ho districts. Private cars are worth paying for if you have 4+ people or want to stop at Ninh Binh along the way.
            </p>
          </div>

          {/* FAQ */}
          <h2 className="mt-12 font-display text-3xl italic text-ink-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-5">
            {[
              { q: "Do I need a visa to visit Ha Long Bay?", a: "Ha Long Bay is within Vietnam — you need a Vietnamese visa or e-visa, which covers the entire country including Ha Long Bay. Most nationalities can apply online. Check visa exemption lists for your passport nationality." },
              { q: "Is there a train from Hanoi to Ha Long Bay?", a: "There is no direct train to Ha Long Bay. The nearest train station is in Ha Long City, which is still a 20-minute drive from Tuan Chau Harbour. Buses and private cars are more practical for cruise travellers." },
              { q: "Can I visit Ha Long Bay from Hanoi in one day?", a: "Yes — Ha Long Bay day cruises depart from Hanoi at 7:30 AM and return by 8:30 PM. However, we strongly recommend at least one overnight cruise to see the bay at dawn and dusk, when the light is extraordinary." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-sand-200 p-5">
                <h3 className="font-semibold text-ink-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-ink-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-sand-100 p-8 text-center">
            <h3 className="font-display text-2xl italic text-ink-900">Ready to book your Ha Long Bay cruise?</h3>
            <p className="mt-2 text-ink-600">All transfer options can be arranged through us — just ask in your shortlist request.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/cruises" className="rounded-full bg-terracotta-500 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-sand-50 hover:bg-terracotta-600 transition">
                Browse All Cruises →
              </Link>
              <Link href="/#get-shortlist" className="rounded-full border border-teal-800 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-teal-800 hover:bg-teal-800 hover:text-sand-50 transition">
                Get Free Shortlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
