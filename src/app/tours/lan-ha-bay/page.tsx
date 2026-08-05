import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Lan Ha Bay Cruises 2025 — Less Crowded, Equally Stunning",
  description:
    "Best Lan Ha Bay cruise packages 2025. Identical scenery to Ha Long Bay with 80% fewer tourist boats. From $149/person. Expert advice and free shortlist.",
  alternates: { canonical: "https://www.halongbestcruises.com/tours/lan-ha-bay" },
};

export default async function LanHaBayPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Lan Ha Bay Cruises"
      eyebrow="Adjacent to Ha Long · 80% Fewer Tourist Boats"
      subtitle="The same spectacular limestone karsts as Ha Long Bay — with a fraction of the traffic."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o="
      descriptionParagraphs={[
        "Lan Ha Bay is directly south of Ha Long Bay, separated by Cat Ba Island. It shares the same dramatic limestone karst geology — over 400 islands and islets rising from emerald water — but falls outside the most densely visited part of the UNESCO zone. The result: identical scenery with dramatically fewer tourist boats.",
        "Most cruise operators have shifted a significant portion of their itineraries to Lan Ha Bay over the past five years. Ships anchor in secluded coves that 2D1N Ha Long Bay tours can't reach, and the kayaking routes through mangrove tunnels and floating fish farms are among the most scenic in northern Vietnam.",
      ]}
      keyHighlights={[
        "400+ karst islands — same geology as Ha Long Bay",
        "Dramatically fewer tourist boats",
        "Mangrove kayaking and cave exploration",
        "Cat Ba Island National Park access",
        "Floating fishing village tours",
        "Combined Ha Long + Lan Ha routes available",
      ]}
      filterFn={(c) =>
        c.region === "Lan Ha Bay" ||
        c.tags.includes("lan-ha") ||
        c.tags.includes("lan-ha-bay") ||
        c.name.toLowerCase().includes("lan ha")
      }
      allCruises={cruises}
      priceRangeText="$149–$600 per person (2D1N to 3D2N)"
      bestMonthsText="October–May. Lan Ha is more sheltered from northeast winds than Ha Long."
      expertAdvice="If someone tells you Lan Ha Bay is 'worse' than Ha Long Bay, they haven't been. It's the same bay geology with the bonus of Cat Ba Island, mangrove forest, and roughly ten times fewer boats."
      faqs={[
        {
          q: "What is the difference between Ha Long Bay and Lan Ha Bay?",
          a: "Lan Ha Bay is directly adjacent to Ha Long Bay but is less crowded and, in our opinion, slightly more beautiful for extended cruising. The geology is identical — limestone karsts rising from emerald water. Lan Ha also provides access to Cat Ba Island National Park.",
        },
        {
          q: "Do Ha Long Bay cruises go to Lan Ha Bay?",
          a: "Many 2D1N and 3D2N cruises now sail primarily through Lan Ha Bay rather than the main Ha Long Bay tourist zone. Always confirm the specific anchorages with your operator before booking.",
        },
        {
          q: "How do I get to Lan Ha Bay?",
          a: "Most cruise operators depart from Tuan Chau Harbour in Ha Long City. Some depart from Cat Ba Island directly. The harbour to Lan Ha Bay sailing time is approximately 1.5–2 hours.",
        },
      ]}
    />
  );
}
