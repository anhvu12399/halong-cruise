"use client";

import { useState, useEffect } from "react";
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
    "flex cursor-pointer items-center gap-1.5 py-6 text-xs font-bold uppercase tracking-[0.18em] text-sand-50 transition hover:text-brass-300";

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

export default function Header({ menu, announcementBar }: { menu?: any; announcementBar?: any }) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 30) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false); // Scroll down -> hide
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true); // Scroll up -> show
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Top Announcement Bar ── */}
      {showBanner && (
        <div className="relative z-50 flex items-center justify-between bg-teal-900/95 backdrop-blur-sm px-4 py-2 text-xs text-sand-50 transition">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 text-center font-mono">
            <span className="font-semibold tracking-wide">
              {announcementBar?.text || "2 x 1 Special Offer & Summer Promotion aboard"}{" "}
              <Link href={announcementBar?.linkUrl || "/cruises"} className="underline underline-offset-4 hover:text-brass-300">
                {announcementBar?.linkText || "Ha Long & Lan Ha Luxury Cruises"}
              </Link>
            </span>
            <Link
              href="/cruises"
              className="inline-flex items-center rounded bg-brass-400 px-3 py-0.5 font-bold text-teal-950 transition hover:bg-brass-300 text-[11px]"
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

      {/* ── Header Navbar ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isAtTop
            ? "bg-gradient-to-b from-teal-950/90 via-teal-950/50 to-transparent border-b border-transparent shadow-none"
            : "bg-teal-950/90 backdrop-blur-md border-b border-teal-800/80 shadow-2xl"
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="container-content flex h-20 items-center justify-between">
          {/* ── Brand / Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 leading-none">
            {menu?.logo ? (
              <img
                src={menu.logo}
                alt={menu.logoAlt || "Ha Long Bay Cruises"}
                width={menu.logoWidth || 180}
                height={48}
                className="h-10 max-h-12 w-auto object-contain"
              />
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold italic leading-none text-sand-50 tracking-tight">
                  Ha Long
                </span>
                <span className="font-label text-[10px] font-bold uppercase tracking-widest text-brass-300 leading-none">
                  Bay Cruises
                </span>
              </div>
            )}
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-8 md:flex">
            <NavItem
              id="cruises"
              label={menu?.cruisesLabel || "Cruises"}
              href="/cruises"
              active={activeDropdown === "cruises"}
              onEnter={setActiveDropdown}
            >
              {(menu?.cruises || []).map((item: any) => (
                <DropdownLink key={item.href} {...item} />
              ))}
            </NavItem>

            <NavItem
              id="tours"
              label={menu?.toursLabel || "Tours & Packages"}
              active={activeDropdown === "tours"}
              onEnter={setActiveDropdown}
            >
              {(menu?.tours || []).map((item: any) => (
                <DropdownLink key={item.href} {...item} />
              ))}
            </NavItem>

            <NavItem
              id="guides"
              label={menu?.guidesLabel || "Travel Guides"}
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
              {(menu?.guides || []).map((item: any) => (
                <DropdownLink key={item.href} {...item} />
              ))}
            </NavItem>

            <Link
              href="/about"
              className="text-xs font-bold uppercase tracking-[0.18em] text-sand-50 transition hover:text-brass-300"
            >
              {menu?.aboutLabel || "About Us"}
            </Link>
          </nav>

          {/* ── CTA ── */}
          <Link
            href={menu?.ctaUrl || "/inquire"}
            className="hidden items-center gap-2 rounded-full bg-brass-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-teal-950 transition hover:bg-brass-300 md:flex shadow-sm"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M6 1L6 11M1 6L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {menu?.ctaLabel || "PLAN A SAILING"}
          </Link>

          {/* ── Mobile burger ── */}
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
