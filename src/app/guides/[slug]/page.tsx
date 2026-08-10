import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllGuides, getGuideBySlug, getRelatedCruisesForGuide } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = await getGuideBySlug(params.slug);
  if (!guide) notFound();
  const relatedCruises = await getRelatedCruisesForGuide(guide);

  return (
    <article className="bg-sand-50">
      <div className="relative h-[46vh] min-h-[340px] w-full overflow-hidden bg-teal-950">
        <Image src={guide.coverImage} alt={guide.title} fill priority className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/25 to-transparent" />
        <div className="container-content absolute inset-x-0 bottom-10">
          <p className="eyebrow mb-3 text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <Link href="/guides" className="hover:text-brass-300">Guides</Link>
          </p>
          <h1 className="max-w-3xl font-display text-4xl italic text-sand-50 md:text-5xl">{guide.title}</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-wideish text-sand-100/60">
            {guide.publishedAt} · {guide.readMinutes} min read{guide.region ? ` · ${guide.region}` : ""}
          </p>
        </div>
      </div>

      <div className="container-content max-w-2xl py-16 md:py-24">
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
