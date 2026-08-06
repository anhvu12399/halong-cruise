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
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-teal-950">
      {/* Slideshow background — FULL CLARITY, no opacity-60 */}
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
              // ← No opacity class here — photo shows at full vibrancy
            />
          </div>
        );
      })}

      {/* Gradient vignette — bottom darkening only, preserves sky clarity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(8,20,32,0.85) 0%, rgba(8,20,32,0.22) 40%, rgba(8,20,32,0.04) 100%)',
          zIndex: 1,
        }}
      />
      <div className="chart-grid absolute inset-0 opacity-20" style={{ zIndex: 1 }} />

      {/* Content */}
      <div className="container-content relative pb-16 pt-36" style={{ zIndex: 2 }}>
        <p className="eyebrow mb-4 text-brass-300 font-bold">
          Ha Long Bay Cruise Specialist · Since 2015
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-medium leading-[1.06] tracking-tight text-sand-50 md:text-7xl">
          {heroTitle || 'Sail the Karsts.'}
        </h1>

        {/* Slide name badge — subtle attribution of the background photo */}
        <p
          className="mt-3 font-mono text-xs text-brass-300/90 uppercase tracking-widest transition-opacity duration-700"
          aria-live="polite"
        >
          ↑ {slides[current]?.name}
        </p>

        {heroSubtitle && (
          <p className="mt-4 max-w-2xl text-lg font-medium text-sand-100/90 leading-relaxed">
            {heroSubtitle}
          </p>
        )}

        {/* Pass-through slot (e.g. HeroSearch) */}
        {children && <div className="mt-8">{children}</div>}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/cruises"
            className="rounded-full bg-terracotta-500 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-sand-50 transition hover:bg-terracotta-600 shadow-md"
          >
            Find My Cruise →
          </Link>
          <Link
            href={`/cruises/${slides[current]?.slug}`}
            className="rounded-full border border-sand-100/40 bg-teal-950/40 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-sand-50 backdrop-blur-sm transition hover:border-brass-300 hover:text-brass-300"
          >
            View this ship
          </Link>
        </div>

        {/* Stat strip */}
        <div className="mt-10 grid grid-cols-2 gap-5 border-t border-sand-100/20 pt-7 font-body text-sand-100/80 md:grid-cols-4">
          <div>
            <p className="eyebrow text-[10px] text-brass-300">Ships Listed</p>
            <p className="mt-1 text-2xl font-bold text-sand-50">{cruiseCount ?? slides.length} Cruises</p>
          </div>
          <div>
            <p className="eyebrow text-[10px] text-brass-300">Starting From</p>
            <p className="mt-1 text-2xl font-bold text-sand-50">$39 / person</p>
          </div>
          <div>
            <p className="eyebrow text-[10px] text-brass-300">Customer Rating</p>
            <p className="mt-1 text-2xl font-bold text-sand-50">4.9 ★ Google</p>
          </div>
          <div>
            <p className="eyebrow text-[10px] text-brass-300">Expert Reply</p>
            <p className="mt-1 text-2xl font-bold text-sand-50">Within 2 hrs</p>
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
