import Image from "next/image";
import Link from "next/link";
import type { FrontendPageContent } from "@/lib/types";

export default function FrontendCmsPage({ page }: { page: FrontendPageContent }) {
  return (
    <div className="bg-sand-50">
      <section className="relative min-h-[50vh] overflow-hidden bg-teal-950">
        {page.heroImage && <Image src={page.heroImage} alt={page.heroTitle} fill priority className="object-cover opacity-45" />}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/45 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80"><Link href="/">Home</Link> / <span className="text-brass-300">{page.heroTitle}</span></p>
          <div className="max-w-3xl">
            {page.eyebrow && <span className="eyebrow rounded-full border border-brass-500/30 bg-brass-500/20 px-4 py-1.5 text-brass-300">{page.eyebrow}</span>}
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">{page.heroTitle}</h1>
            {page.heroSubtitle && <p className="mt-4 text-lg leading-relaxed text-sand-100/80">{page.heroSubtitle}</p>}
          </div>
        </div>
      </section>
      {page.contentHtml && <section className="container-content py-16 md:py-24"><div className="prose mx-auto max-w-4xl" dangerouslySetInnerHTML={{ __html: page.contentHtml }} /></section>}
      {page.sections.map((section, index) => (
        <section key={index} className={index % 2 ? "bg-sand-100/60 py-16" : "container-content py-16"}>
          <div className="container-content grid items-center gap-10 md:grid-cols-2">
            <div><h2 className="font-display text-3xl italic text-ink-900">{section.title}</h2><div className="prose mt-5" dangerouslySetInnerHTML={{ __html: section.text }} /></div>
            {section.image && <div className="relative aspect-[4/3] overflow-hidden rounded-3xl"><Image src={section.image} alt={section.title} fill className="object-cover" /></div>}
          </div>
        </section>
      ))}
    </div>
  );
}
