import Link from "next/link";

const NAV = [
  { href: "/cruises", label: "Cruises" },
  { href: "/#regions", label: "Regions" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-teal-800/60 bg-teal-950/95 backdrop-blur">
      <div className="container-content flex h-20 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 leading-none">
          <span className="font-display text-2xl italic text-sand-50">Ha Long</span>
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-brass-300">
            Bay&nbsp;Cruises
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-wideish text-sand-100/80 transition hover:text-brass-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

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
