import Link from "next/link";
import { pressLogos } from "@/lib/mockData";

export default function Footer() {
  return (
    <footer className="chart-grid bg-teal-950 text-sand-100">
      {/* Top CTA Banner */}
      <div className="container-content border-b border-teal-800/70 py-16">
        <span className="eyebrow mb-3 text-brass-300">Local Cruise Expertise</span>
        <h2 className="max-w-2xl font-display text-4xl italic text-sand-50 md:text-5xl">
          Ready to experience Vietnam’s UNESCO World Heritage Bay?
        </h2>
        <p className="mt-4 max-w-xl text-sand-100/70">
          Our Hanoi-based team of cruise specialists offers unbiased advice, best price guarantee, and 24/7 personal trip support.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/inquire"
            className="rounded-full bg-terracotta-500 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
          >
            Send an inquiry
          </Link>
          <Link
            href="/planning"
            className="rounded-full border border-brass-500/50 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-brass-300 transition hover:bg-brass-500 hover:text-teal-950"
          >
            Cruise Planning Hub
          </Link>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="container-content grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4">
        {/* Col 1: Cruises */}
        <div>
          <p className="eyebrow mb-4 text-brass-300">Cruises by Category</p>
          <ul className="space-y-2.5 font-mono text-xs text-sand-100/80">
            <li><Link href="/cruises" className="transition hover:text-brass-300">All Cruises</Link></li>
            <li><Link href="/cruises/luxury" className="transition hover:text-brass-300">Luxury Cruises</Link></li>
            <li><Link href="/cruises/5-star" className="transition hover:text-brass-300">5-Star Cruises</Link></li>
            <li><Link href="/cruises/boutique" className="transition hover:text-brass-300">Boutique Cruises</Link></li>
            <li><Link href="/cruises/family" className="transition hover:text-brass-300">Family Cruises</Link></li>
            <li><Link href="/cruises/private-charter" className="transition hover:text-brass-300">Private Charter Cruises</Link></li>
          </ul>
        </div>

        {/* Col 2: Tours & Packages */}
        <div>
          <p className="eyebrow mb-4 text-brass-300">Popular Tour Routes</p>
          <ul className="space-y-2.5 font-mono text-xs text-sand-100/80">
            <li><Link href="/tours/2-days-1-night" className="transition hover:text-brass-300">2 Days 1 Night Cruises</Link></li>
            <li><Link href="/tours/3-days-2-nights" className="transition hover:text-brass-300">3 Days 2 Nights Cruises</Link></li>
            <li><Link href="/tours/day-cruises" className="transition hover:text-brass-300">Halong Bay Day Cruises</Link></li>
            <li><Link href="/tours/lan-ha-bay" className="transition hover:text-brass-300">Lan Ha Bay Cruises</Link></li>
            <li><Link href="/tours/bai-tu-long-bay" className="transition hover:text-brass-300">Bai Tu Long Bay Cruises</Link></li>
            <li><Link href="/tours/hanoi-packages" className="transition hover:text-brass-300">Hanoi to Halong Packages</Link></li>
            <li><Link href="/tours/private-cruises" className="transition hover:text-brass-300">Private Halong Cruises</Link></li>
            <li><Link href="/tours/honeymoon" className="transition hover:text-brass-300">Honeymoon Cruises</Link></li>
            <li><Link href="/tours/family-packages" className="transition hover:text-brass-300">Family Cruise Packages</Link></li>
          </ul>
        </div>

        {/* Col 3: Travel Guides (EEAT) */}
        <div>
          <p className="eyebrow mb-4 text-brass-300">Travel Guides &amp; Insights</p>
          <ul className="space-y-2.5 font-mono text-xs text-sand-100/80">
            <li><Link href="/planning" className="text-brass-300 transition hover:underline">✦ Cruise Planning Hub</Link></li>
            <li><Link href="/guides/best-cruises" className="transition hover:text-brass-300">Best Halong Bay Cruises</Link></li>
            <li><Link href="/guides/bay-comparison" className="transition hover:text-brass-300">Halong vs Lan Ha vs Bai Tu Long</Link></li>
            <li><Link href="/guides/best-time-to-visit" className="transition hover:text-brass-300">Best Time to Visit Halong Bay</Link></li>
            <li><Link href="/guides/cruise-prices" className="transition hover:text-brass-300">Halong Bay Cruise Prices</Link></li>
            <li><Link href="/guides/how-to-choose" className="transition hover:text-brass-300">How to Choose a Cruise</Link></li>
          </ul>
        </div>

        {/* Col 4: Trust & Company */}
        <div>
          <p className="eyebrow mb-4 text-brass-300">About &amp; Trust</p>
          <ul className="space-y-2.5 font-mono text-xs text-sand-100/80">
            <li><Link href="/about" className="transition hover:text-brass-300">About Us</Link></li>
            <li><Link href="/contact" className="transition hover:text-brass-300">Contact &amp; Support</Link></li>
            <li><Link href="/inquire" className="transition hover:text-brass-300">Custom Booking Desk</Link></li>
            <li><span className="text-sand-100/50">Licensed Tour Operator ID: 01-1029/TCDL-GPLHQT</span></li>
          </ul>
          <p className="mt-4 text-xs text-sand-100/60 leading-relaxed">
            Head Office: Tuan Chau Marina &amp; Old Quarter, Hanoi, Vietnam.
          </p>
        </div>
      </div>

      {/* Bottom Copyright & Media */}
      <div className="container-content flex flex-col gap-4 border-t border-teal-800/70 py-8 text-xs text-sand-100/50 md:flex-row md:items-center md:justify-between">
        <p>As featured in {pressLogos.join(" · ")}</p>
        <p>© {new Date().getFullYear()} Ha Long Bay Cruises. All rights reserved.</p>
      </div>
    </footer>
  );
}
