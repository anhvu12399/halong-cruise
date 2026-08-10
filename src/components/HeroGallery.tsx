"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroGallery({ images, name }: { images: string[]; name: string }) {
  const perPage = 3;
  const [start, setStart] = useState(0);
  if (images.length === 0) return null;

  const visible = images.slice(start, start + perPage);
  const canPrev = start > 0;
  const canNext = start + perPage < images.length;

  return (
    <div className="hidden lg:block">
      <div className="flex gap-3">
        {visible.map((src, i) => (
          <div key={start + i} className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg">
            <Image src={src} alt={`${name} photo ${start + i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > perPage && (
        <div className="mt-2 flex gap-2">
          <button
            aria-label="Previous photos"
            disabled={!canPrev}
            onClick={() => setStart((s) => Math.max(0, s - perPage))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sand-100/30 text-sand-100 transition disabled:opacity-30 hover:border-brass-300 hover:text-brass-300"
          >
            ‹
          </button>
          <button
            aria-label="Next photos"
            disabled={!canNext}
            onClick={() => setStart((s) => Math.min(images.length - perPage, s + perPage))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-sand-100/30 text-sand-100 transition disabled:opacity-30 hover:border-brass-300 hover:text-brass-300"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
