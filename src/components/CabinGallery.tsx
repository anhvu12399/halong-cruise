"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type CabinGalleryProps = {
  images: string[];
  name: string;
  /** reverse layout (image on left) */
  reversed?: boolean;
};

export default function CabinGallery({ images, name, reversed }: CabinGalleryProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  if (total === 0) return null;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
      {/* Current image */}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${name} – photo ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}

      {/* Prev / Next buttons – only show when more than 1 image */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full
                       bg-teal-950/60 text-sand-50 opacity-0 backdrop-blur transition
                       group-hover:opacity-100 hover:bg-teal-950/80"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full
                       bg-teal-950/60 text-sand-50 opacity-0 backdrop-blur transition
                       group-hover:opacity-100 hover:bg-teal-950/80"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-5 bg-sand-50"
                  : "w-1.5 bg-sand-50/50 hover:bg-sand-50/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter badge */}
      {total > 1 && (
        <div className="absolute top-3 right-3 rounded-full bg-teal-950/60 px-2.5 py-1 font-mono text-[10px] text-sand-50/90 backdrop-blur">
          {current + 1} / {total}
        </div>
      )}
    </div>
  );
}
