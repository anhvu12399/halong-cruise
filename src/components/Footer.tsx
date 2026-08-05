import Link from "next/link";
import { pressLogos } from "@/lib/mockData";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Planning Hub", href: "/planning" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Responsible Travel", href: "/#responsible-travel" },
      { label: "Contact", href: "/inquire" },
    ],
  },
  {
    title: "Regions",
    links: [
      { label: "Ha Long Bay", href: "/cruises?region=Ha+Long+Bay" },
      { label: "Lan Ha Bay", href: "/cruises?region=Lan+Ha+Bay" },
      { label: "Bai Tu Long Bay", href: "/cruises?region=Bai+Tu+Long+Bay" },
    ],
  },
  {
    title: "Cruises",
    links: [
      { label: "All Cruises", href: "/cruises" },
      { label: "2-Day Sailings", href: "/cruises?days=2" },
      { label: "3+ Day Sailings", href: "/cruises?days=3" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="chart-grid bg-teal-950 text-sand-100">
      <div className="container-content border-b border-teal-800/70 py-16">
        <p className="eyebrow mb-3">Start planning</p>
        <h2 className="max-w-xl font-display text-4xl italic text-sand-50 md:text-5xl">
          Where should the boat take you?
        </h2>
        <Link
          href="/inquire"
          className="mt-8 inline-block rounded-full bg-terracotta-500 px-7 py-3 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
        >
          Send an inquiry
        </Link>
      </div>

      <div className="container-content grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-xl italic text-sand-50">Ha Long Bay Cruises</p>
          <p className="mt-3 max-w-[22ch] text-sm text-sand-100/70">
            Independent booking desk for small-ship sailings across Ha Long, Lan Ha and Bai Tu Long Bay.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="space-y-2.5 text-sm text-sand-100/80">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-brass-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-content flex flex-col gap-4 border-t border-teal-800/70 py-8 text-xs text-sand-100/50 md:flex-row md:items-center md:justify-between">
        <p>As featured in {pressLogos.join(" · ")}</p>
        <p>© {new Date().getFullYear()} Ha Long Bay Cruises. All rights reserved.</p>
      </div>
    </footer>
  );
}
