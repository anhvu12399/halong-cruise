"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header
      className="sticky top-0 z-40 border-b border-teal-800/60 bg-teal-950/95 backdrop-blur"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container-content flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-baseline gap-2 leading-none">
          <span className="font-display text-2xl italic text-sand-50">Ha Long</span>
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-brass-300">
            Bay&nbsp;Cruises
          </span>
        </Link>

        {/* Main Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {/* Cruises Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("cruises")}
          >
            <Link
              href="/cruises"
              className="flex items-center gap-1 font-mono text-xs uppercase tracking-wideish text-sand-100/80 transition hover:text-brass-300 py-6"
            >
              Cruises
              <svg className="h-3 w-3 text-brass-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {activeDropdown === "cruises" && (
              <div className="absolute left-0 top-full w-64 rounded-2xl border border-teal-800/80 bg-teal-950 p-4 shadow-2xl backdrop-blur">
                <div className="space-y-1">
                  <Link href="/cruises" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    All Cruises
                  </Link>
                  <Link href="/cruises/luxury" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Luxury Cruises
                  </Link>
                  <Link href="/cruises/5-star" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    5-Star Cruises
                  </Link>
                  <Link href="/cruises/boutique" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Boutique Cruises
                  </Link>
                  <Link href="/cruises/family" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Family Cruises
                  </Link>
                  <Link href="/cruises/private-charter" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Private Charter Cruises
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Tours Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("tours")}
          >
            <span
              className="flex cursor-pointer items-center gap-1 font-mono text-xs uppercase tracking-wideish text-sand-100/80 transition hover:text-brass-300 py-6"
            >
              Tours &amp; Packages
              <svg className="h-3 w-3 text-brass-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            {activeDropdown === "tours" && (
              <div className="absolute left-0 top-full w-72 rounded-2xl border border-teal-800/80 bg-teal-950 p-4 shadow-2xl backdrop-blur">
                <div className="space-y-1">
                  <Link href="/tours/2-days-1-night" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    2 Days 1 Night Cruises
                  </Link>
                  <Link href="/tours/3-days-2-nights" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    3 Days 2 Nights Cruises
                  </Link>
                  <Link href="/tours/day-cruises" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Halong Bay Day Cruises
                  </Link>
                  <Link href="/tours/lan-ha-bay" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Lan Ha Bay Cruises
                  </Link>
                  <Link href="/tours/bai-tu-long-bay" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Bai Tu Long Bay Cruises
                  </Link>
                  <Link href="/tours/hanoi-packages" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Hanoi to Halong Packages
                  </Link>
                  <Link href="/tours/private-cruises" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Private Halong Cruises
                  </Link>
                  <Link href="/tours/honeymoon" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Honeymoon Cruises
                  </Link>
                  <Link href="/tours/family-packages" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Family Cruise Packages
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Travel Guides Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("guides")}
          >
            <Link
              href="/planning"
              className="flex items-center gap-1 font-mono text-xs uppercase tracking-wideish text-sand-100/80 transition hover:text-brass-300 py-6"
            >
              Travel Guides
              <svg className="h-3 w-3 text-brass-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {activeDropdown === "guides" && (
              <div className="absolute left-0 top-full w-72 rounded-2xl border border-teal-800/80 bg-teal-950 p-4 shadow-2xl backdrop-blur">
                <div className="space-y-1">
                  <Link href="/planning" className="block rounded-xl px-3 py-2 font-mono text-xs text-brass-300 hover:bg-teal-900">
                    ✦ Planning Hub
                  </Link>
                  <Link href="/guides/best-cruises" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Best Halong Bay Cruises
                  </Link>
                  <Link href="/guides/bay-comparison" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Halong vs Lan Ha vs Bai Tu Long
                  </Link>
                  <Link href="/guides/best-time-to-visit" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Best Time to Visit
                  </Link>
                  <Link href="/guides/cruise-prices" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    Halong Bay Cruise Prices
                  </Link>
                  <Link href="/guides/how-to-choose" className="block rounded-xl px-3 py-2 font-mono text-xs text-sand-100 hover:bg-teal-900 hover:text-brass-300">
                    How to Choose a Cruise
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* About Us */}
          <Link
            href="/about"
            className="font-mono text-xs uppercase tracking-wideish text-sand-100/80 transition hover:text-brass-300"
          >
            About Us
          </Link>
        </nav>

        {/* CTA Button */}
        <Link
          href="/inquire"
          className="rounded-full bg-terracotta-500 px-5 py-2.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
        >
          Plan a Sailing
        </Link>
      </div>
    </header>
  );
}
