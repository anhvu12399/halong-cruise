import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFrontendPage, getGuideBySlug, getRelatedCruisesForGuide } from "@/lib/wp";
import CruiseCard from "@/components/CruiseCard";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const route = "/" + params.slug.join("/");
  const page = await getFrontendPage(route);
  if (page) {
    return {
      title: page.metaTitle || page.heroTitle,
      description: page.metaDescription || page.heroSubtitle,
    };
  }

  if (params.slug.length === 1) {
    const guide = await getGuideBySlug(params.slug[0]);
    if (guide) {
      return {
        title: guide.title,
        description: guide.excerpt,
      };
    }
  }

  return {};
}

export default async function DynamicSlugPage({ params }: { params: { slug: string[] } }) {
  const route = "/" + params.slug.join("/");
  const page = await getFrontendPage(route);
  if (page) {
    return (
      <div className="bg-sand-50">
        {/* Hero */}
        <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden bg-teal-950">
          {page.heroImage && (
            <Image src={page.heroImage} alt={page.heroTitle} fill priority className="object-cover opacity-75" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/30 to-transparent" />
          <div className="container-content absolute inset-x-0 bottom-10">
            <p className="eyebrow mb-3 text-sand-100/80">
              <Link href="/" className="hover:text-brass-300">
                Home
              </Link>{" "}
              / <span className="text-brass-300">{page.eyebrow || route.replace("/", "")}</span>
            </p>
            <h1 className="max-w-3xl font-display text-4xl italic text-sand-50 md:text-5xl">{page.heroTitle}</h1>
            {page.heroSubtitle && <p className="mt-3 max-w-xl text-sand-100/80">{page.heroSubtitle}</p>}
          </div>
        </section>

        {/* Main content */}
        {page.contentHtml && (
          <div className="container-content max-w-2xl py-16 md:py-24">
            <div
              className="prose-guide space-y-5 text-lg leading-relaxed text-ink-700"
              dangerouslySetInnerHTML={{ __html: page.contentHtml }}
            />
          </div>
        )}

        {/* Additional sections */}
        {page.sections.length > 0 && (
          <div className="container-content space-y-16 pb-20 md:pb-28">
            {page.sections.map((section, i) => (
              <div
                key={i}
                className={`grid items-center gap-8 md:gap-14 ${
                  section.image ? "md:grid-cols-2" : ""
                } ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  {section.title && <h2 className="font-display text-3xl italic text-ink-900">{section.title}</h2>}
                  {section.text && (
                    <div
                      className="prose-guide mt-4 space-y-4 text-ink-700"
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    />
                  )}
                </div>
                {section.image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={section.image} alt={section.title} fill className="object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Check if it's a guide slug at the root level (e.g. /my-guide-slug)
  if (params.slug.length === 1) {
    const guideSlug = params.slug[0];
    const guide = await getGuideBySlug(guideSlug);
    if (guide) {
      const relatedCruises = await getRelatedCruisesForGuide(guide);
      return (
        <article className="bg-sand-50">
          <div className="relative h-[46vh] min-h-[340px] w-full overflow-hidden bg-teal-950">
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
  }

  notFound();
}
