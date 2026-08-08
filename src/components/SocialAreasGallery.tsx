"use client";

import { useState } from "react";
import Image from "next/image";
import { SocialArea } from "@/lib/types";

export default function SocialAreasGallery({ areas }: { areas: SocialArea[] }) {
  const [active, setActive] = useState(0);
  if (areas.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-x-8 gap-y-3 border-b border-ink-300/20 pb-4">
        {areas.map((area, i) => (
          <button
            key={area.name}
            onClick={() => setActive(i)}
            className={`font-mono text-xs uppercase tracking-wideish transition ${
              i === active ? "text-terracotta-600" : "text-ink-300 hover:text-ink-500"
            }`}
          >
            {area.name}
          </button>
        ))}
      </div>
      <div className="relative aspect-[16/8] overflow-hidden rounded-2xl">
        <Image src={areas[active].image} alt={areas[active].alt || areas[active].name} fill className="object-cover" priority={false} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/90 via-teal-950/40 to-transparent p-4 md:p-6">
          <div className="inline-flex max-w-2xl items-center gap-2 rounded-lg border border-brass-500/30 bg-teal-950/80 px-3.5 py-2 backdrop-blur-sm">
            <span className="text-brass-400">📷</span>
            <p className="font-mono text-xs text-sand-100 first-letter:capitalize">
              {areas[active].alt || areas[active].name}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
        {areas.map((area, i) => (
          <button
            key={area.name}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${
              i === active ? "ring-2 ring-terracotta-500" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={area.image} alt={area.name} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
