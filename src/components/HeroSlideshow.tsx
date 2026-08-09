'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSlide {
  image: string;
  name: string;
  slug: string;
}

export default function HeroSlideshow({
  slides,
  heroTitle,
  heroSubtitle,
  cruiseCount,
  children,
}: {
  slides: HeroSlide[];
  heroTitle?: string;
  heroSubtitle?: string;
  cruiseCount?: number;
  children?: React.ReactNode;
}) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Only mount extra slides after page is idle (LCP optimisation)
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => setMounted(true), { timeout: 2000 });
    } else {
      const t = setTimeout(() => setMounted(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // Autoplay — 5 s per slide
  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, mounted]);

  if (slides.length === 0) return null;

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-[#0B2224]">
      {/* Slideshow background — FULL CLARITY, 100% natural photo colors */}
      {slides.map((slide, idx) => {
        if (idx !== 0 && !mounted) return null;
        return (
          <div
            key={idx}
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === current ? 1 : 0, willChange: 'opacity' }}
          >
            <Image
              src={slide.image}
              alt={slide.name}
              fill
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        );
      })}

      {/* Dark Overlay Gradient — guarantees crisp text readability against bright sky photos */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(11,34,36,0.92) 0%, rgba(11,34,36,0.4) 45%, rgba(11,34,36,0.65) 100%)',
          zIndex: 1,
        }}
      />
      <div className="chart-grid absolute inset-0 opacity-15" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="container-content relative pb-16 pt-36" style={{ zIndex: 2 }}>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brass-400/40 bg-teal-950/80 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brass-300">
            Ha Long Bay Cruise Specialist · Since 2015
          </span>
        </div>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-sand-50 drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)] md:text-7xl">
          {heroTitle || 'Sail the Karsts.'}
        </h1>

        {/* Slide name badge — elegant luxury pill */}
        <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-brass-400/40 bg-teal-950/70 px-4 py-1.5 backdrop-blur-md shadow-lg">
          <span className="text-brass-300 font-bold">↑</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-sand-50">
            {slides[current]?.name}
          </span>
        </div>

        {heroSubtitle && (
          <p className="mt-4 max-w-2xl text-lg font-semibold text-sand-50 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {heroSubtitle}
          </p>
        )}

        {/* Pass-through slot (e.g. HeroSearch) */}
        {children && <div className="mt-8">{children}</div>}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/cruises"
            className="rounded-full bg-brass-400 px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-teal-950 transition hover:bg-brass-300 shadow-xl"
          >
            Find My Cruise →
          </Link>
          <Link
            href={`/cruises/${slides[current]?.slug}`}
            className="rounded-full border border-brass-400/60 bg-teal-950/80 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-sand-50 backdrop-blur-md transition hover:border-brass-300 hover:text-brass-300 shadow-lg"
          >
            View this ship
          </Link>
        </div>

        {/* Stat strip */}
        <div className="mt-10 grid grid-cols-2 gap-5 border-t border-sand-100/25 pt-7 font-body text-sand-100 md:grid-cols-4">
          <div>
            <p className="eyebrow text-[10px] font-bold text-brass-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Ships Listed</p>
            <p className="mt-1 text-2xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">{cruiseCount ?? slides.length} Cruises</p>
          </div>
          <div>
            <p className="eyebrow text-[10px] font-bold text-brass-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Starting From</p>
            <p className="mt-1 text-2xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">$39 / person</p>
          </div>
          <div>
            <p className="eyebrow text-[10px] font-bold text-brass-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Booking Fee</p>
            <p className="mt-1 text-2xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">$0 Fee Always</p>
          </div>
          <div>
            <p className="eyebrow text-[10px] font-bold text-brass-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Price Promise</p>
            <p className="mt-1 text-2xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">Direct Operators</p>
          </div>
        </div>
      </div>

      {/* Slide-indicator dots */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ zIndex: 3 }}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="p-1 group"
          >
            <span
              style={{
                display: 'block',
                width: idx === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: idx === current ? '#c9a563' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.35s',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
