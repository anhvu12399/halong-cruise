import Image from "next/image";
import Link from "next/link";

type Tile = { label: string; sub: string; href: string; img: string; badge?: string; className?: string };

const STYLE_TILES: Tile[] = [
  {
    label: "Best Value",
    sub: "From $99 · Well-run ships",
    href: "/cruises/best-value",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o=",
    badge: "Most Popular",
  },
  {
    label: "Deluxe",
    sub: "$150–$350 · Comfortable & stylish",
    href: "/cruises/deluxe",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o=",
  },
  {
    label: "Luxury",
    sub: "$400+ · Premium service",
    href: "/cruises/luxury",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o=",
  },
  {
    label: "Family",
    sub: "Family suites · Child activities",
    href: "/cruises/family",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o=",
  },
  {
    label: "Couples",
    sub: "Romance · Honeymoon · Sunsets",
    href: "/cruises/couples",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/411409062.webp?k=dd0f7b9297bb345b5350265a4466db99778914c17805d5a46a25ab5db2f8df33&o=",
    badge: "Honeymoon ♥",
  },
  {
    label: "Group",
    sub: "8+ people · Charter options",
    href: "/cruises/group",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/540224451.webp?k=9275ad9f8fdad3bc9867f4f78fce11784317bb543b6539c8255cb7f4bd1ff16d&o=",
  },
  {
    label: "Small Ship",
    sub: "Under 20 cabins · Quiet bays",
    href: "/cruises/small-ship",
    img: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o=",
  },
];

function StyleTile({ tile }: { tile: Tile }) {
  return (
    <Link
      href={tile.href}
      data-track="category_click"
      data-category={tile.label.toLowerCase().replace(/\s+/g, "-")}
      className={`group relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-auto md:h-52 ${tile.className ?? ""}`}
    >
      <Image
        src={tile.img}
        alt={tile.label + " cruises"}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent transition group-hover:from-teal-950" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-xl italic text-sand-50">{tile.label}</p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wideish text-sand-100/70">{tile.sub}</p>
      </div>
      {tile.badge && (
        <span className="absolute right-3 top-3 rounded-full bg-terracotta-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wideish text-sand-50">
          {tile.badge}
        </span>
      )}
    </Link>
  );
}

export default function CategoryTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
      {/* Row 1: Best Value spans 2 cols (hero tile), + Deluxe + Luxury */}
      <StyleTile tile={{ ...STYLE_TILES[0], className: "col-span-2 md:col-span-2 md:row-span-1" }} />
      <StyleTile tile={STYLE_TILES[1]} />
      <StyleTile tile={STYLE_TILES[2]} />

      {/* Row 2: Family + Couples spans 2 cols + Group */}
      <StyleTile tile={STYLE_TILES[3]} />
      <StyleTile tile={{ ...STYLE_TILES[4], className: "col-span-2 md:col-span-1" }} />
      <StyleTile tile={STYLE_TILES[5]} />

      {/* Row 3: Small ship + All cruises CTA */}
      <StyleTile tile={STYLE_TILES[6]} />
      <Link
        href="/cruises"
        data-track="category_click"
        data-category="all-cruises"
        className="col-span-1 flex items-center justify-between rounded-2xl border border-brass-500/40 bg-teal-950 px-5 py-4 transition hover:border-brass-400 md:col-span-3"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-300">All 64 ships</p>
          <p className="mt-0.5 font-display text-lg italic text-sand-50">Browse the full fleet →</p>
        </div>
        <span className="hidden rounded-full border border-brass-500/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wideish text-brass-300 md:block">
          Filter &amp; compare
        </span>
      </Link>
    </div>
  );
}
