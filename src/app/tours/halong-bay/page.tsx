import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Ha Long Bay Cruises 2025 — All Ships, All Budgets",
  description:
    "Book the best Ha Long Bay cruises in 2025. 64 handpicked ships from day trips ($39) to 3-night luxury voyages ($900+). Expert advice and free shortlist.",
  alternates: { canonical: "https://www.halongbestcruises.com/tours/halong-bay" },
};

export default async function HalongBayPage() {
  const cruises = await getAllCruises();
  return (
    <CategoryListingPage
      title="Ha Long Bay Cruises"
      eyebrow="UNESCO World Heritage Site · 2,000+ Limestone Karsts"
      subtitle="The most iconic sailing in Southeast Asia — from day trips to three-night expeditions."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
      descriptionParagraphs={[
        "Ha Long Bay (Vietnamese: Vịnh Hạ Long) is a UNESCO World Heritage Site in Quang Ninh Province, northeastern Vietnam. Nearly 2,000 limestone karst islands rise from the emerald waters of the Gulf of Tonkin across an area of roughly 1,553 km². A cruise is the only way to properly experience it — there are no roads through the bay, and the most spectacular formations are only accessible by boat.",
        "The best Ha Long Bay cruises range from affordable day trips departing from Tuan Chau Island to immersive 3-night sailings that reach the quieter eastern bays beyond the main tourist routes. We list 64 personally reviewed ships at every price point.",
      ]}
      keyHighlights={[
        "UNESCO World Heritage Site since 1994",
        "Day trips from $39/person",
        "2D1N cruises from $149/person",
        "3D2N voyages from $249/person",
        "64 ships across all budgets and styles",
        "Departures daily from Hanoi and Tuan Chau",
      ]}
      filterFn={(c) =>
        c.region === "Ha Long Bay" ||
        c.tags.includes("halong") ||
        c.tags.includes("ha-long")
      }
      allCruises={cruises}
      priceRangeText="$39–$900+ per person depending on duration and ship category"
      bestMonthsText="October–April (dry season, clear skies). Peak: December–February."
      expertAdvice="First-time visitors often underestimate how large Ha Long Bay is. If you only have one night, choose a ship that sails to Lan Ha Bay — you'll escape 80% of the tourist boats with none of the visual trade-off."
      faqs={[
        {
          q: "How do I get from Hanoi to Ha Long Bay?",
          a: "Most cruise operators offer hotel pick-up in Hanoi (Old Quarter). The drive to Tuan Chau Harbour takes about 2.5–3 hours. Luxury transfers by private car or speedboat are also available.",
        },
        {
          q: "How long should I spend on Ha Long Bay?",
          a: "A day cruise gives you a taste, but an overnight sailing changes the experience entirely — you see the bay at dawn, after the day-trippers have left. Three nights is the sweet spot for the full experience.",
        },
        {
          q: "What is the difference between Ha Long Bay and Lan Ha Bay?",
          a: "Lan Ha Bay is directly adjacent to Ha Long Bay and shares identical geology, but receives far fewer tourists. Most overnight cruises now sail primarily through Lan Ha Bay for this reason.",
        },
        {
          q: "Is Ha Long Bay worth visiting?",
          a: "Yes — it consistently ranks as one of the natural wonders of the world and is unlike anything else in Southeast Asia. The key is choosing the right ship for your style and budget.",
        },
      ]}
    />
  );
}
