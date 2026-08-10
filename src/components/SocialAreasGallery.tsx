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
        <Image src={areas[active].image} alt={areas[active].name} fill className="object-cover" priority={false} />
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
