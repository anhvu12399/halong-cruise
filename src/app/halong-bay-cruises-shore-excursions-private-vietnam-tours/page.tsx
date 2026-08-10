import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuides, getGuideBySlug, getRelatedCruisesForGuide } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Halong Bay Cruises & Shore Excursions | Private Vietnam Tours",
    description:
      "Book Halong Bay cruises, private shore excursions and tailor-made Vietnam tours. Local experts, private transfers, guides and flexible itineraries.",
  };
}

export default async function HalongBayCruisesShoreExcursionsPage() {
  let guide = await getGuideBySlug("halong-bay-cruises-shore-excursions-private-vietnam-tours");
  if (!guide) {
    guide = await getGuideBySlug("halong-bay-cruises-shore-excursions");
  }
  if (!guide) {
    guide = await getGuideBySlug("halong-bay-cruises-shore-excursions-vietnam-tours");
  }
  if (!guide) {
    guide = await getGuideBySlug("asia-shore-excursions");
  }
  if (!guide) {
    const all = await getAllGuides();
    guide = all[0];
  }
  if (!guide) notFound();

  const extraImage = "/images/halong-shore-excursions-hero.jpg";
  const relatedCruises = await getRelatedCruisesForGuide(guide);

  return (
    <article className="bg-sand-50">
      {/* Hero banner always uses the Featured Image from WordPress backend */}
      <div className="relative h-[48vh] min-h-[360px] w-full overflow-hidden bg-teal-950">
        <Image src={guide.coverImage} alt={guide.title} fill priority className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/25 to-transparent" />
        <div className="container-content absolute inset-x-0 bottom-10">
          <p className="eyebrow mb-3 text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">
              Home
            </Link>
          </p>
          <h1 className="max-w-3xl font-display text-4xl italic text-sand-50 md:text-5xl">{guide.title}</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-wideish text-sand-100/60">
            {guide.publishedAt} · {guide.readMinutes} min read{guide.region ? ` · ${guide.region}` : ""}
          </p>
        </div>
      </div>

      <div className="container-content max-w-2xl py-16 md:py-24">
        {/* Additional inline photo inside the article content */}
        <div className="mb-10 overflow-hidden rounded-2xl border border-ink-300/20 shadow-sm">
          <Image
            src={extraImage}
            alt="Ha Long Bay Luxury Cruise Aerial View"
            width={1200}
            height={700}
            className="w-full object-cover"
          />
        </div>

        <div
          className="prose-guide space-y-5 text-lg leading-relaxed text-ink-700"
          dangerouslySetInnerHTML={{ __html: guide.bodyHtml }}
        />

        {relatedCruises.length > 0 && (
          <div className="mt-20 border-t border-ink-300/20 pt-14">
            <p className="eyebrow mb-3">Sailings this applies to</p>
            <h2 className="mb-8 font-display text-3xl italic text-ink-900">Worth a look</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedCruises.map((c) => (
                <CruiseCard key={c.slug} cruise={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
