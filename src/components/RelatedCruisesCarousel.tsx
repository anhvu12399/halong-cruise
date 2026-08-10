"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cruise } from "@/lib/types";

export default function RelatedCruisesCarousel({ cruises }: { cruises: Cruise[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {cruises.length > 3 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-300/40 bg-sand-50 text-ink-700 transition hover:border-terracotta-500 hover:text-terracotta-600 md:flex"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-300/40 bg-sand-50 text-ink-700 transition hover:border-terracotta-500 hover:text-terracotta-600 md:flex"
          >
            ›
          </button>
        </>
      )}
      <div ref={scrollerRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-2">
        {cruises.map((cruise) => (
          <Link
            key={cruise.slug}
            href={`/cruises/${cruise.slug}`}
            className="group w-[320px] shrink-0 overflow-hidden rounded-2xl border border-ink-300/15 bg-white shadow-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={cruise.heroImage}
                alt={cruise.name}
                fill
                sizes="320px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-teal-950/70 via-teal-950/0 to-transparent" />
              <p className="eyebrow absolute left-4 top-3 text-sand-100">{cruise.region}</p>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl italic text-ink-900">{cruise.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-500">{cruise.tagline}</p>
              <div className="mt-4 flex items-center justify-between border-t border-ink-300/15 pt-4 font-mono text-xs uppercase tracking-wideish text-ink-500">
                <span>{cruise.durationDays} Days</span>
                <span className="text-terracotta-600">
                  {cruise.startingPrice ? `From $${cruise.startingPrice}` : "On request"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
