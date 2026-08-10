import Image from "next/image";
import Link from "next/link";

type Tile = { label: string; sub: string; href: string; image: string; className?: string };

const GRID_TILES: Tile[] = [
  {
    label: "Luxury",
    sub: "Full-service ships, top cabins",
    href: "/cruises?tag=luxury",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.jpg?k=211297536d21da0f27b9567678c717d3603a4d909e41167d9b6503efd4bc55f8&o=&hp=1"
  },
  {
    label: "Deluxe",
    sub: "Comfortable, well-priced",
    href: "/cruises?tag=deluxe",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783924563.jpg?k=a0d48a2293f3571e21b105f812db19e32e2bcbaf230265aeb05a952bc38e6a48&o=&hp=1"
  },
  {
    label: "Budget",
    sub: "Simple, well-run, cheaper",
    href: "/cruises?tag=budget",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/695679661.jpg?k=0271e0a81f9c399af5accd5208c9b7f7fc2981650258d6ab8c3ba047c947c210&o="
  },
  {
    label: "Newest",
    sub: "Launched in the last year",
    href: "/cruises?tag=newest",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/784071520.jpg?k=31b1d21db5f33cfa693f5ab9a6f6a700d1012452cf2c9bd06ca620ba5b261391&o=&hp=1"
  },
  {
    label: "Honeymoon",
    sub: "Quiet cabins, private decks",
    href: "/cruises?tag=honeymoon",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783837209.jpg?k=df265778c00a5ca16d1de270923158ac047ecfd7c0b4629f10dd43e51fee1803&o=&hp=1"
  },
  {
    label: "Family",
    sub: "Space to spread out",
    href: "/cruises?tag=family",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832267.jpg?k=bc96c9560b7e6617cf6912d6b1de15bab50fe85de580292f0862ce9f3067cd6a&o=&hp=1"
  },
];

const TALL_TILE: Tile = {
  label: "Best Cruises",
  sub: "Our highest-rated sailings",
  href: "/cruises?tag=best",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832272.jpg?k=dc2dc14fa9419a54dc554a93fc4303cb266cb2d75b77f636327670b15fee875b&o=&hp=1",
};

const GROUP_TILE: Tile = {
  label: "Group",
  sub: "Charters & larger parties",
  href: "/cruises?tag=group",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/783833865.jpg?k=6ddeaf6503dc35dd4cc96f955335bfaaba5d6b28fb81a0fecb80703ce9591ba6&o=&hp=1",
};

function TileCard({ tile, badge }: { tile: Tile; badge?: string }) {
  return (
    <Link href={tile.href} className={`group relative overflow-hidden rounded-2xl ${tile.className ?? ""}`}>
      <Image
        src={tile.image}
        alt={tile.label}
        fill
        unoptimized
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/85 via-teal-950/20 to-transparent transition group-hover:from-teal-950/95" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-xl italic text-sand-50 md:text-2xl">{tile.label}</p>
        <p className="mt-0.5 hidden font-mono text-[11px] uppercase tracking-wideish text-sand-100/70 md:block">
          {tile.sub}
        </p>
      </div>
      {badge && (
        <span className="eyebrow absolute right-4 top-4 rounded-full bg-terracotta-500 px-3 py-1 text-sand-50">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function CategoryTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[190px]">
      {GRID_TILES.map((tile) => (
        <TileCard key={tile.label} tile={tile} />
      ))}

      <TileCard
        tile={{ ...TALL_TILE, className: "col-span-2 md:col-start-4 md:row-start-1 md:row-span-2" }}
        badge="Editors' Picks"
      />

      <TileCard tile={{ ...GROUP_TILE, className: "col-span-2 md:col-span-1" }} />

      <Link
        href="/cruises"
        className="col-span-2 flex items-center justify-between rounded-2xl border border-brass-500/40 bg-teal-950 px-6 py-5 transition hover:border-brass-400 md:col-span-2"
      >
        <span className="font-mono text-xs uppercase tracking-wideish text-brass-300">
          Special deals — best offers
        </span>
        <span className="font-mono text-xs uppercase tracking-wideish text-sand-100/70">View all →</span>
      </Link>
    </div>
  );
}
