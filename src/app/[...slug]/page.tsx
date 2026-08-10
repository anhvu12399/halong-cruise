import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFrontendPage } from "@/lib/wp";

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const route = "/" + params.slug.join("/");
  const page = await getFrontendPage(route);
  if (!page) return {};
  return {
    title: page.metaTitle || page.heroTitle,
    description: page.metaDescription || page.heroSubtitle,
  };
}

export default async function FrontendManagedPage({ params }: { params: { slug: string[] } }) {
  const route = "/" + params.slug.join("/");
  const page = await getFrontendPage(route);
  if (!page) notFound();

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
          {page.heroSubtitle && (
            <p className="mt-3 max-w-xl text-sand-100/80">{page.heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Main content */}
      {page.contentHtml && (
        <div className="container-content max-w-2xl py-16 md:py-24">
          <div className="prose-guide space-y-5 text-lg leading-relaxed text-ink-700" dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
        </div>
      )}

      {/* Additional sections — alternating image/text, same pattern as cabin listings */}
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
                {section.title && (
                  <h2 className="font-display text-3xl italic text-ink-900">{section.title}</h2>
                )}
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
