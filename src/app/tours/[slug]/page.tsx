import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCruises, getTourCollectionBySlug } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";
import { Cruise } from "@/lib/types";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const collection = await getTourCollectionBySlug(params.slug);
  if (!collection) return {};
  
  return {
    title: `${collection.title} — Ha Long Best Cruises`,
    description: collection.descriptionParagraphs?.[0] || "",
    alternates: { canonical: `https://www.halongbestcruises.com/tours/${params.slug}` },
  };
}

export default async function TourCollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getTourCollectionBySlug(params.slug);
  if (!collection) {
    notFound();
  }

  const cruises = await getAllCruises();
  
  // Dynamic filter: try to match region name, or tags, or just return true if it's a generic style and match tags
  const filterFn = (c: Cruise) => {
    const slugLower = params.slug.toLowerCase();
    const regionLower = c.region.toLowerCase();
    const tagsLower = c.tags.map(t => t.toLowerCase());
    
    // Exact tag match is strongest indicator
    if (tagsLower.includes(slugLower) || tagsLower.includes(slugLower.replace(/-/g, ""))) return true;
    
    // Region match
    if (regionLower.replace(/[\s-]/g, "").includes(slugLower.replace(/-/g, ""))) return true;
    
    // Fallback: style match (e.g., 2d1n, day-trip)
    if (slugLower === "day-cruises" && c.durationDays === 1) return true;
    if (slugLower === "2-days-1-night" && c.durationDays === 2) return true;
    if (slugLower === "3-days-2-nights" && c.durationDays === 3) return true;
    
    return false;
  };

  return (
    <CategoryListingPage
      title={collection.title}
      eyebrow={collection.eyebrow}
      subtitle={collection.subtitle}
      heroImage={collection.heroImage || "https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp"}
      descriptionParagraphs={collection.descriptionParagraphs}
      keyHighlights={collection.keyHighlights}
      filterFn={filterFn}
      allCruises={cruises}
      priceRangeText={collection.priceRangeText}
      bestMonthsText={collection.bestMonthsText}
      expertAdvice={collection.expertAdvice}
      faqs={collection.faqs.map(f => ({ q: f.question, a: f.answer }))}
    />
  );
}
