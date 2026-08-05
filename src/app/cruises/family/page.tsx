import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Family Halong Bay Cruises | Connecting Suites & Kid-Friendly",
  description:
    "Family-friendly Ha Long Bay & Lan Ha Bay cruises. Interconnecting cabins, child-friendly menus, swimming pools, kayaking, and safety-certified vessels.",
};

export default async function FamilyCruisesPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Family Halong Bay Cruises"
      eyebrow="Family Friendly &amp; Connecting Suites"
      subtitle="Memorable family adventures aboard safety-certified ships featuring spacious interconnecting family suites, kid-friendly meals, swimming pools, and engaging activities."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o="
      descriptionParagraphs={[
        "Cruising Ha Long Bay with family creates lifelong memories. Our family-selected vessels feature spacious connecting cabins with internal doors, allowing parents to enjoy privacy while keeping children close.",
        "Onboard amenities for families include shallow sundeck pools, life vests in child sizes, interactive cooking classes (making fresh Vietnamese spring rolls), kayaking, and beach excursions at Titov or Ba Trai Dao.",
        "Culinary teams gladly accommodate fussy eaters with child-friendly Western and Asian options alongside full multi-course adult menus."
      ]}
      keyHighlights={[
        "Interconnecting family suites & triple/quad options",
        "Sundeck swimming pools & safe railing protection",
        "Child life jackets & lightweight tandem kayaks",
        "Special children's meal menus & flexible dining times",
        "Engaging activities: spring roll making, squid fishing"
      ]}
      filterFn={(c) => c.tags.includes("family") || c.cabins.some(cb => cb.name.toLowerCase().includes("family") || cb.name.toLowerCase().includes("connecting"))}
      allCruises={cruises}
      priceRangeText="$260 – $520 / person (Child discounts up to 50%)"
      bestMonthsText="Mar – Aug (Warm water for family swimming)"
      expertAdvice="Children under 4 years old often stay free of charge when sharing existing bedding with parents, while children aged 5-11 receive a 25% to 50% discount on cruise fares."
      faqs={[
        {
          q: "Are family cruises safe for young toddlers?",
          a: "Yes. All modern 5-star ships feature high solid balcony railings, non-slip sundecks, and toddler-size life vests."
        }
      ]}
    />
  );
}
