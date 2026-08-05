"use client";

import { useState } from "react";

type Item = {
  id: string;
  category: string;
  label: string;
  desc: string;
};

const ITEMS: Item[] = [
  { id: "p1", category: "Excursions", label: "Waterproof Dry Bag", desc: "Essential for protecting phone/camera during kayaking & bamboo boat tours." },
  { id: "p2", category: "Excursions", label: "Non-slip Water Shoes / Sandals", desc: "Great for climbing wet stairs inside Sung Sot or Dark & Light cave." },
  { id: "p3", category: "Onboard", label: "Smart Casual Dinner Attire", desc: "Light linen shirts, summer dresses, or trousers for multi-course evening dining." },
  { id: "p4", category: "Onboard", label: "Swimwear & UV Rashguard", desc: "For sundeck Jacuzzi, swimming in Lan Ha Bay, and kayaking." },
  { id: "p5", category: "Essentials", label: "Sun Protection (Hat, Sunglasses, SPF 50+)", desc: "Strong reflection off limestone karsts makes sun protection crucial." },
  { id: "p6", category: "Essentials", label: "Eco-friendly Mosquito Repellent", desc: "Helpful during evening sundeck relaxation or jungle hikes on Cat Ba Island." },
  { id: "p7", category: "Electronics", label: "Camera with Zoom Lens / Waterproof Case", desc: "Ha Long Bay offers world-class landscape photography opportunities." },
  { id: "p8", category: "Documents", label: "Original Passport & Visa Document", desc: "MANDATORY for port authority registration before boarding any cruise." },
];

export default function PackingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    p1: true,
    p8: true,
  });

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="rounded-3xl border border-teal-800/40 bg-teal-950 p-6 text-sand-50 md:p-10">
      <div className="flex flex-col justify-between gap-4 border-b border-teal-800/80 pb-6 md:flex-row md:items-end">
        <div>
          <span className="eyebrow text-brass-300">Preparation Checklist</span>
          <h3 className="mt-2 font-display text-3xl italic text-sand-50 md:text-4xl">
            What to Pack for Your Cruise
          </h3>
          <p className="mt-2 max-w-xl text-sm text-sand-100/70">
            Check off essentials as you pack. All luxury vessels provide towels, bathrobes, hair dryers, and premium toiletries onboard.
          </p>
        </div>
        <div className="rounded-2xl border border-brass-500/40 bg-teal-900/80 px-4 py-3 text-center">
          <span className="block font-mono text-[10px] uppercase text-sand-100/60">Packed Progress</span>
          <span className="font-mono text-xl font-bold text-brass-300">
            {checkedCount} / {ITEMS.length} items
          </span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {ITEMS.map((item) => {
          const isDone = Boolean(checked[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition duration-200 ${
                isDone
                  ? "border-brass-500/50 bg-teal-900/60 shadow-sm"
                  : "border-teal-800/60 bg-teal-900/20 hover:border-teal-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                    isDone ? "border-brass-400 bg-brass-500 text-teal-950" : "border-teal-600 bg-teal-900"
                  }`}
                >
                  {isDone && (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isDone ? "text-sand-50 line-through opacity-80" : "text-sand-50"}`}>
                      {item.label}
                    </span>
                    <span className="rounded bg-teal-800/80 px-2 py-0.5 font-mono text-[9px] uppercase text-brass-300">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-sand-100/70">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
