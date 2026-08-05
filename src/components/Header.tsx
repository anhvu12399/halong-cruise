"use client";

import { useState } from "react";
import Link from "next/link";

// ── Inline SVG icons (thin-stroke, luxury) ────────────────────────────────────
const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className="opacity-60">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Ornament = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden className="shrink-0">
    <path d="M7 1C7 1 4 5 1 5C4 5 7 9 7 9C7 9 10 5 13 5C10 5 7 1 7 1Z" stroke="#C4A55A" strokeWidth="1" fill="none" />
  </svg>
);

// Cruise style icons
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
      className="group flex items-center gap-2.5 rounded-lg px-3 py-2 transition hover:bg-teal-900/70"
    >
      <span className="h-px w-3 bg-brass-500/30 transition group-hover:w-4 group-hover:bg-brass-400" />
      <span
        className="text-[10px] uppercase text-sand-100/70 transition group-hover:text-brass-300"
        style={{ fontFamily: "var(--font-label)", letterSpacing: "0.14em" }}
      >
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
    "flex cursor-pointer items-center gap-1.5 py-7 text-[11px] uppercase transition";
  const labelStyle = { fontFamily: "var(--font-label)", letterSpacing: "0.18em" };

  return (
    <div className="relative" onMouseEnter={() => onEnter(id)}>
      {href ? (
        <Link
          href={href}
          className={`${labelClass} ${active ? "text-brass-300" : "text-sand-100/75 hover:text-brass-300"}`}
          style={labelStyle}
        >
          {label} <ChevronDown />
        </Link>
      ) : (
        <span
          className={`${labelClass} ${active ? "text-brass-300" : "text-sand-100/75 hover:text-brass-300"}`}
          style={labelStyle}
        >
          {label} <ChevronDown />
        </span>
      )}

      {active && (
        <div className="absolute left-0 top-full min-w-[220px] rounded-xl border border-teal-800/60 bg-teal-950/98 p-3 shadow-2xl backdrop-blur-md">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header
      className="sticky top-0 z-40 border-b border-teal-800/40 bg-teal-950/96 backdrop-blur-md"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container-content flex h-[72px] items-center justify-between">

        {/* ── Brand ────────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-baseline gap-2.5 leading-none">
          {/* Ornamental diamond */}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="mb-0.5">
            <path d="M5 0.5L9.5 5L5 9.5L0.5 5Z" stroke="#C4A55A" strokeWidth="0.8" fill="none" />
          </svg>
          <span
            className="font-display text-[1.6rem] italic font-light leading-none text-sand-50 tracking-[-0.01em]"
          >
            Ha Long
          </span>
          <span
            className="text-[9px] uppercase text-brass-400 leading-none"
            style={{ fontFamily: "var(--font-label)", letterSpacing: "0.22em" }}
          >
            Bay&nbsp;Cruises
          </span>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────────────── */}
        <nav className="hidden items-center gap-7 md:flex">
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
            {/* Featured item */}
            <Link
              href="/planning"
              className="mb-2 flex items-center gap-2 rounded-lg border border-brass-500/20 bg-brass-500/10 px-3 py-2 transition hover:border-brass-400/40"
            >
              <Ornament />
              <span
                className="text-[10px] uppercase text-brass-300"
                style={{ fontFamily: "var(--font-label)", letterSpacing: "0.14em" }}
              >
                Planning Hub
              </span>
            </Link>
            {GUIDE_ITEMS.map((item) => (
              <DropdownLink key={item.href} {...item} />
            ))}
          </NavItem>

          <Link
            href="/about"
            className="text-[11px] uppercase text-sand-100/70 transition hover:text-brass-300"
            style={{ fontFamily: "var(--font-label)", letterSpacing: "0.18em" }}
          >
            About Us
          </Link>
        </nav>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <Link
          href="/inquire"
          className="hidden items-center gap-2 rounded-full border border-terracotta-500 bg-terracotta-500 px-5 py-2.5 text-sand-50 transition hover:bg-terracotta-600 md:flex"
          style={{ fontFamily: "var(--font-label)", fontSize: "9px", letterSpacing: "0.2em" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M6 1L6 11M1 6L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          PLAN A SAILING
        </Link>

        {/* ── Mobile burger ─────────────────────────────────────────────────── */}
        <button
          className="flex flex-col items-center justify-center gap-1 p-2 md:hidden"
          aria-label="Open menu"
        >
          <span className="h-px w-6 bg-sand-100/70" />
          <span className="h-px w-4 bg-sand-100/70" />
          <span className="h-px w-6 bg-sand-100/70" />
        </button>
      </div>
    </header>
  );
}
