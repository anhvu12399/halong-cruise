"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type CabinGalleryProps = {
  images: string[];
  name: string;
  reversed?: boolean;
};

const DEFAULT_FALLBACK_IMAGE = "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783924563.jpg?k=a0d48a2293f3571e21b105f812db19e32e2bcbaf230265aeb05a952bc38e6a48&o=&hp=1";

export default function CabinGallery({ images, name, reversed }: CabinGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const validImages = (images || []).filter(Boolean);
  const total = validImages.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  if (total === 0) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-teal-950/20">
        <Image
          src={DEFAULT_FALLBACK_IMAGE}
          alt={name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group bg-teal-950/20">
      {/* Current image */}
      {validImages.map((src, i) => {
        const imageSrc = failedImages[i] ? DEFAULT_FALLBACK_IMAGE : src;
        return (
          <Image
            key={`${src}-${i}`}
            src={imageSrc}
            alt={`${name} – photo ${i + 1}`}
            fill
            unoptimized
            onError={() => {
              setFailedImages((prev) => ({ ...prev, [i]: true }));
            }}
            className={`object-cover transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        );
      })}

      {/* Prev / Next buttons – only show when more than 1 image */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full
                       bg-teal-950/60 text-sand-50 opacity-0 backdrop-blur transition
                       group-hover:opacity-100 hover:bg-teal-950/80 z-10"
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
                       group-hover:opacity-100 hover:bg-teal-950/80 z-10"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dots indicator */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {validImages.map((_, i) => (
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
        <div className="absolute top-3 right-3 rounded-full bg-teal-950/60 px-2.5 py-1 font-mono text-[10px] text-sand-50/90 backdrop-blur z-10">
          {current + 1} / {total}
        </div>
      )}
    </div>
  );
}
