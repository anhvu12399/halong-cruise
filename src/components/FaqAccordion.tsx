"use client";

import { useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "Is seasickness a problem on Ha Long Bay & Lan Ha Bay?",
    a: "No! Unlike open ocean cruises, Ha Long Bay and Lan Ha Bay are sheltered by thousands of massive limestone karsts, making the waters calm, flat, and mirror-like year-round. Modern 5-star ships are also equipped with advanced stabilization systems."
  },
  {
    q: "What is typically included in the cruise fare?",
    a: "All luxury sailings include full-board gourmet meals (breakfast, lunch, dinner, brunch), welcome drinks, English-speaking guide services, entrance fees to caves and bay monuments, kayaking, bamboo boat excursions, morning Tai Chi sessions, and evening squid fishing."
  },
  {
    q: "How do I get from Hanoi to the cruise harbour?",
    a: "We arrange luxury DCar Limousine transfers or private executive sedans directly from your hotel in Hanoi Old Quarter to Tuan Chau or Got Marina via the new modern expressway (approx. 2 to 2.5 hours). Scenic seaplane flights (45 mins) are also available."
  },
  {
    q: "Should I choose 2 Days / 1 Night or 3 Days / 2 Nights?",
    a: "A 2D1N cruise offers a great introduction to the bay highlights. However, a 3D2N itinerary is strongly recommended if you want to explore deeper into pristine Lan Ha Bay, visit Viet Hai floating village, kayak through quiet lagoons, and enjoy a relaxed tempo without rushing."
  },
  {
    q: "Can special dietary requests (vegetarian, vegan, gluten-free, halal) be catered?",
    a: "Yes! Onboard master chefs cater to all dietary needs and allergies. Please inform us of your dietary requirements when placing your inquiry so the cruise culinary team can prepare custom multi-course menus for you."
  },
  {
    q: "What documents do I need to bring for check-in?",
    a: "You must bring your original valid passport and Vietnam visa documentation (e-visa or entry stamp). Port authority regulations require strict registration of all guests before boarding."
  }
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {FAQS.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-ink-300/20 bg-sand-50 transition duration-200"
          >
            <button
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-display text-xl italic text-ink-900">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-300/30 text-ink-700 transition duration-300 ${
                  isOpen ? "rotate-180 bg-teal-950 text-sand-50" : "bg-sand-100"
                }`}
              >
                ↓
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-ink-300/20 bg-sand-100/50 p-6 pt-4 text-ink-700 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
