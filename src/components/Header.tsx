"use client";

import { useState } from "react";
import Link from "next/link";

const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className="opacity-80">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Ornament = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="shrink-0">
    <path d="M7 1C7 1 4 5 1 5C4 5 7 9 7 9C7 9 10 5 13 5C10 5 7 1 7 1Z" stroke="#C4A55A" strokeWidth="1.2" fill="none" />
  </svg>
);

const CRUISE_ITEMS = [
  { href: "/cruises", label: "All Cruises" },
  { href: "/cruises/best-value", label: "Best Value" },
  { href: "/cruises/deluxe", label: "Deluxe Cruises" },
  { href: "/cruises/luxury", label: "Luxury Cruises" },
  { href: "/cruises/small-ship", label: "Small Ship" },
  { href: "/cruises/family", label: "Family Cruises" },
  { href: "/cruises/couples", label: "Couples & Honeymoon" },
  { href: "/cruises/group", label: "Group & Charter" },
];

const TOUR_ITEMS = [
  { href: "/tours/day-cruises", label: "Day Cruises" },
  { href: "/tours/2-days-1-night", label: "2 Days 1 Night" },
  { href: "/tours/3-days-2-nights", label: "3 Days 2 Nights" },
  { href: "/tours/halong-bay", label: "Ha Long Bay" },
  { href: "/tours/lan-ha-bay", label: "Lan Ha Bay" },
  { href: "/tours/bai-tu-long-bay", label: "Bai Tu Long Bay" },
  { href: "/tours/private-cruises", label: "Private Charters" },
  { href: "/tours/honeymoon", label: "Honeymoon Tours" },
  { href: "/tours/family-packages", label: "Family Packages" },
];

const GUIDE_ITEMS = [
  { href: "/guides/best-cruises", label: "Best Ha Long Bay Cruises" },
  { href: "/guides/cruise-prices", label: "Cruise Prices Guide" },
  { href: "/guides/how-to-choose", label: "How to Choose a Cruise" },
  { href: "/guides/bay-comparison", label: "Ha Long vs Lan Ha vs Bai Tu Long" },
  { href: "/guides/best-time-to-visit", label: "Best Time to Visit" },
  { href: "/guides/hanoi-to-halong", label: "Hanoi to Ha Long Bay" },
  { href: "/guides/what-to-pack", label: "What to Pack" },
  { href: "/guides/is-halong-worth-it", label: "Is Ha Long Bay Worth It?" },
];

function DropdownLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition hover:bg-teal-900"
    >
      <span className="h-px w-3 bg-brass-400 transition group-hover:w-5 group-hover:bg-brass-300" />
      <span className="text-xs font-semibold uppercase tracking-wider text-sand-50 transition group-hover:text-brass-300">
        {label}
      </span>
    </Link>
  );
}

function NavItem({
  id,
  label,
  href,
  active,
  onEnter,
  children,
}: {
  id: string;
  label: string;
  href?: string;
  active: boolean;
  onEnter: (id: string) => void;
  children: React.ReactNode;
}) {
  const labelClass =
    "flex cursor-pointer items-center gap-2 py-6 text-xs font-bold uppercase tracking-widest text-sand-50 transition hover:text-brass-300";

  return (
    <div className="relative" onMouseEnter={() => onEnter(id)}>
      {href ? (
        <Link href={href} className={`${labelClass} ${active ? "text-brass-300" : ""}`}>
          {label} <ChevronDown />
        </Link>
      ) : (
        <span className={`${labelClass} ${active ? "text-brass-300" : ""}`}>
          {label} <ChevronDown />
        </span>
      )}

      {active && (
        <div className="absolute left-0 top-full min-w-[240px] rounded-xl border border-teal-700 bg-teal-950 p-3 shadow-2xl backdrop-blur-md z-50">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {/* ── Top Announcement Bar — Deep Forest Green & Gold (#23491E & #E09F00) ── */}
      {showBanner && (
        <div className="relative z-50 flex items-center justify-between bg-[#23491E] px-4 py-2.5 text-xs text-sand-50 transition">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 text-center font-mono">
            <span className="font-semibold tracking-wide">
              2 x 1 Special Offer &amp; Summer Promotion aboard{" "}
              <Link href="/cruises" className="underline underline-offset-4 hover:text-brass-300">
                Ha Long &amp; Lan Ha Luxury Cruises
              </Link>
            </span>
            <Link
              href="/cruises"
              className="inline-flex items-center rounded bg-[#E09F00] px-3 py-1 font-bold text-teal-950 transition hover:bg-[#F0A800]"
            >
              Details
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="ml-2 text-sand-100/70 hover:text-sand-50"
            aria-label="Close banner"
          >
            ✕
          </button>
        </div>
      )}

      <header
        className="sticky top-0 z-50 border-b border-teal-800 bg-teal-950 text-sand-50 shadow-md"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="container-content flex h-20 items-center justify-between">

        {/* ── Brand ────────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-baseline gap-2.5 leading-none">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden className="mb-0.5">
            <path d="M5 0.5L9.5 5L5 9.5L0.5 5Z" stroke="#C4A55A" strokeWidth="1" fill="#C4A55A" />
          </svg>
          <span className="font-display text-2xl font-semibold italic leading-none text-sand-50 tracking-tight">
            Ha Long
          </span>
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-brass-300 leading-none">
            Bay&nbsp;Cruises
          </span>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────────────── */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavItem
            id="cruises"
            label="Cruises"
            href="/cruises"
            active={activeDropdown === "cruises"}
            onEnter={setActiveDropdown}
          >
            {CRUISE_ITEMS.map((item) => (
              <DropdownLink key={item.href} {...item} />
            ))}
          </NavItem>

          <NavItem
            id="tours"
            label="Tours & Packages"
            active={activeDropdown === "tours"}
            onEnter={setActiveDropdown}
          >
            {TOUR_ITEMS.map((item) => (
              <DropdownLink key={item.href} {...item} />
            ))}
          </NavItem>

          <NavItem
            id="guides"
            label="Travel Guides"
            href="/planning"
            active={activeDropdown === "guides"}
            onEnter={setActiveDropdown}
          >
            <Link
              href="/planning"
              className="mb-2 flex items-center gap-2 rounded-lg border border-brass-400/40 bg-brass-400/10 px-3 py-2 transition hover:border-brass-300"
            >
              <Ornament />
              <span className="text-xs font-bold uppercase tracking-wider text-brass-300">
                Planning Hub
              </span>
            </Link>
            {GUIDE_ITEMS.map((item) => (
              <DropdownLink key={item.href} {...item} />
            ))}
          </NavItem>

          <Link
            href="/about"
            className="text-xs font-bold uppercase tracking-widest text-sand-50 transition hover:text-brass-300"
          >
            About Us
          </Link>
        </nav>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <Link
          href="/inquire"
          className="hidden items-center gap-2 rounded-full bg-[#E09F00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#16381C] transition hover:bg-[#F0A800] md:flex shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M6 1L6 11M1 6L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          PLAN A SAILING
        </Link>

        {/* ── Mobile burger ─────────────────────────────────────────────────── */}
        <button
          className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          aria-label="Open menu"
        >
          <span className="h-0.5 w-6 bg-sand-50" />
          <span className="h-0.5 w-5 bg-sand-50" />
          <span className="h-0.5 w-6 bg-sand-50" />
        </button>
      </div>
    </header>
  </>
);
}
