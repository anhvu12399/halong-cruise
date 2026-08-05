import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Lan Ha Bay Cruises | Pristine & Quiet Alternative to Halong",
  description:
    "Discover pristine Lan Ha Bay cruises. Quieter waters, white sand beaches, Dark & Light cave kayaking, and 5-star luxury ships departing from Got Harbour.",
};

export default async function LanHaBayToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Lan Ha Bay Cruises"
      eyebrow="Pristine, Uncrowded &amp; Quiet Waters"
      subtitle="Located directly south of Ha Long Bay, Lan Ha Bay features 400 limestone islets surrounded by clear emerald waters and pristine white sand beaches with 90% fewer tourist boats."
      heroImage="https://aw-d.tripcdn.com/images/1mc3d12000dq6s641C4EE.jpg"
      descriptionParagraphs={[
        "Lan Ha Bay is the modern traveler's secret alternative to traditional Ha Long Bay. Belonging to Cat Ba Archipelago, Lan Ha Bay offers the exact same dramatic karst topography but with significantly less marine traffic.",
        "Cruises departing from Got Harbour or Tuan Chau head straight into Lan Ha Bay, anchoring in quiet lagoons like Dark & Light Cave, Ao Ech, and Ba Trai Dao secluded beaches.",
        "The newest 5-star luxury ships (Capella, Heritage Binh Chuan, Stellar of the Seas, Orchid Classic) sail exclusively in Lan Ha Bay."
      ]}
      keyHighlights={[
        "90% Less boat congestion than central Ha Long Bay",
        "Pristine swimming beaches at Ba Trai Dao Islets",
        "Kayaking through Dark & Light Cave underwater tunnel",
        "Cat Ba Island rainforest excursions & Viet Hai village",
        "Modern luxury 5-star fleet with private balconies"
      ]}
      filterFn={(c) => c.region.toLowerCase().includes("lan ha")}
      allCruises={cruises}
      priceRangeText="$260 – $750 / person"
      bestMonthsText="Oct – May"
      expertAdvice="Lan Ha Bay is the best option for couples and luxury travelers seeking tranquility, pristine swimming spots, and newer 5-star ships."
      faqs={[
        {
          q: "What is the difference between Ha Long Bay and Lan Ha Bay?",
          a: "Both bays feature identical limestone karst scenery. Ha Long Bay has famous landmark caves (Sung Sot, Titov), while Lan Ha Bay is much quieter, cleaner, has natural sand beaches, and newer 5-star ships."
        }
      ]}
    />
  );
}
