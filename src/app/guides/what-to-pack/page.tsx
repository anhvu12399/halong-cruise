import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What to Pack for a Ha Long Bay Cruise — Packing List 2025",
  description:
    "Complete Ha Long Bay cruise packing list. What to wear, what to leave behind, and the items most travellers forget. Expert tips from locals who've sailed it.",
  alternates: { canonical: "https://www.halongbestcruises.com/guides/what-to-pack" },
};

const PACK_SECTIONS = [
  {
    icon: "👗",
    title: "Clothing",
    items: [
      { item: "Light breathable tops (2–3)", note: "Cotton or linen. Avoid synthetics in the heat." },
      { item: "Swimwear (2 sets)", note: "You'll be in and out of the water daily." },
      { item: "Light layer / jacket", note: "Essential Oct–Feb. Bay evenings get cold on deck." },
      { item: "Long trousers or dress", note: "For cave visits and evening dining." },
      { item: "Flip flops + walking sandals", note: "Flip flops for the boat; sandals for cave walks." },
    ],
  },
  {
    icon: "🧴",
    title: "Health & Safety",
    items: [
      { item: "Reef-safe sunscreen (SPF 50+)", note: "Regular sunscreen damages coral. Buy reef-safe." },
      { item: "Insect repellent", note: "Especially for evening decks and cave visits." },
      { item: "Motion sickness tablets", note: "Even calm seas affect some travellers. Take before boarding." },
      { item: "Basic first aid kit", note: "Plasters, antiseptic, antihistamine. Ships have basics but not always enough." },
      { item: "Personal medication", note: "Carry extra supply in carry-on, not checked luggage." },
    ],
  },
  {
    icon: "📷",
    title: "Electronics & Documents",
    items: [
      { item: "Waterproof phone case or dry bag", note: "Essential for kayaking and bamboo boat rides." },
      { item: "Power bank (10,000+ mAh)", note: "Power outlets per cabin are limited on most ships." },
      { item: "Camera (waterproof recommended)", note: "The light at dawn is extraordinary — don't miss it." },
      { item: "Travel adapter (Type A/C)", note: "Vietnam uses both A and C plugs." },
      { item: "Passport", note: "Required at harbour check-in. Keep a photocopy separately." },
    ],
  },
  {
    icon: "🎒",
    title: "Day Bag Essentials",
    items: [
      { item: "Small dry bag or waterproof backpack", note: "For kayaking excursions from the boat." },
      { item: "Reusable water bottle", note: "Ships provide filtered water. Reduce plastic." },
      { item: "Cash (VND)", note: "ATMs are not on the bay. Bring enough for tips, beer, and extras." },
      { item: "Light rain jacket", note: "April–September especially. Showers pass quickly." },
      { item: "Sunglasses + hat", note: "The reflection off the water is intense at midday." },
    ],
  },
];

const DONT_PACK = [
  "Heavy suitcases (cabin storage is limited — use a soft bag or backpack)",
  "Lots of valuables (most cabin safes are small)",
  "Formal shoes (you won't need them)",
  "Hair dryer (ships usually provide one, and the heat makes them unnecessary)",
  "Books you can't bear to lose (the sea air is humid — books warp)",
];

export default function WhatToPackPage() {
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
                name: "What should I pack for a Ha Long Bay cruise?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Key items: light breathable clothing (2–3 tops), 2 swimsuits, a light jacket for evenings (especially Oct–Feb), reef-safe sunscreen, insect repellent, motion sickness tablets, a waterproof phone case, power bank, and enough VND cash for tips and extras.",
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
              <Link href="/guides" className="hover:text-brass-300">Travel Guides</Link> / What to Pack
            </p>
            <h1 className="mt-6 font-display text-4xl italic md:text-5xl">
              What to Pack for a Ha Long Bay Cruise
            </h1>
            <p className="mt-4 text-sand-100/70 text-lg">
              The complete packing list — what you need, what to leave behind, and what most travellers forget.
            </p>
          </div>
        </section>

        <div className="container-content max-w-3xl py-16">
          <p className="text-lg text-ink-700 leading-relaxed">
            Packing for a Ha Long Bay cruise is simpler than most people think. Cabins are compact, activities are water-based, and the climate is hot and humid (with cool evenings Oct–Feb). The golden rule: pack light, bring reef-safe sunscreen, and don&apos;t forget a waterproof case for your phone.
          </p>

          {/* Packing sections */}
          <div className="mt-10 space-y-10">
            {PACK_SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="flex items-center gap-3 font-display text-2xl italic text-ink-900">
                  <span>{section.icon}</span> {section.title}
                </h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-sand-200">
                  {section.items.map((it, idx) => (
                    <div key={it.item} className={`flex items-start gap-4 p-4 ${idx % 2 === 0 ? "bg-white" : "bg-sand-50"}`}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-teal-700 text-teal-700 text-xs">✓</span>
                      <div>
                        <p className="font-semibold text-ink-900 text-sm">{it.item}</p>
                        <p className="text-xs text-ink-500 mt-0.5">{it.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Don't pack */}
          <div className="mt-12 rounded-2xl bg-red-50 border border-red-200 p-7">
            <h2 className="font-display text-2xl italic text-red-800">🚫 Leave These Behind</h2>
            <ul className="mt-4 space-y-3">
              {DONT_PACK.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-red-900">
                  <span className="mt-0.5 shrink-0 text-red-500">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Expert tip */}
          <div className="mt-8 rounded-2xl bg-teal-950 p-7 text-sand-50">
            <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-400">From our team</p>
            <p className="mt-3 text-sand-100/85 leading-relaxed">
              The single most-forgotten item on Ha Long Bay cruises is a light jacket or fleece. From October to February, evenings on deck drop to 15–18°C — genuinely cold when you&apos;re wet from the water. Bring one layer you won&apos;t mind getting salty.
            </p>
          </div>

          {/* Navigation links */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Link href="/guides/best-time-to-visit" className="rounded-xl border border-sand-200 bg-white p-5 hover:border-teal-700/40 hover:shadow-sm transition">
              <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-500">Next guide</p>
              <p className="mt-1 font-semibold text-ink-900">Best Time to Visit Ha Long Bay →</p>
            </Link>
            <Link href="/cruises" className="rounded-xl border border-sand-200 bg-white p-5 hover:border-teal-700/40 hover:shadow-sm transition">
              <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-500">Browse ships</p>
              <p className="mt-1 font-semibold text-ink-900">View All 64 Ha Long Bay Cruises →</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
