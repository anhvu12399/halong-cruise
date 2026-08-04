import Link from "next/link";
import { getAllCruises } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";

export const metadata = { title: "All Cruises" };

const REGION_FILTERS = ["Ha Long Bay", "Lan Ha Bay", "Bai Tu Long Bay"];

export default async function CruisesPage({
  searchParams,
}: {
  searchParams: { region?: string; days?: string };
}) {
  const cruises = await getAllCruises();

  const filtered = cruises.filter((c) => {
    const regionMatch = searchParams.region ? c.region.includes(searchParams.region) : true;
    const daysMatch = searchParams.days ? c.durationDays >= Number(searchParams.days) : true;
    return regionMatch && daysMatch;
  });

  return (
    <div className="bg-sand-50">
      <div className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content">
          <p className="eyebrow mb-3">Home / Cruises</p>
          <h1 className="max-w-2xl font-display text-5xl italic text-sand-50">All sailings</h1>
          <p className="mt-4 max-w-xl text-sand-100/70">
            {cruises.length} small-ship cruises across Ha Long, Lan Ha and Bai Tu Long Bay, sorted by
            nothing in particular — filter by region or minimum length to narrow it down.
          </p>
        </div>
      </div>

      <div className="container-content py-14">
        <div className="mb-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wideish">
          <Link
            href="/cruises"
            className={`rounded-full border px-4 py-2 transition ${
              !searchParams.region
                ? "border-terracotta-500 bg-terracotta-500 text-sand-50"
                : "border-ink-300 text-ink-500 hover:border-terracotta-500 hover:text-terracotta-600"
            }`}
          >
            All regions
          </Link>
          {REGION_FILTERS.map((r) => (
            <Link
              key={r}
              href={`/cruises?region=${encodeURIComponent(r)}`}
              className={`rounded-full border px-4 py-2 transition ${
                searchParams.region === r
                  ? "border-terracotta-500 bg-terracotta-500 text-sand-50"
                  : "border-ink-300 text-ink-500 hover:border-terracotta-500 hover:text-terracotta-600"
              }`}
            >
              {r}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-ink-500">No sailings match that filter yet. Try All regions.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cruise) => (
              <CruiseCard key={cruise.slug} cruise={cruise} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
