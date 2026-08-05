import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Bai Tu Long Bay Cruises 2025 — Vietnam's Most Remote Bay",
  description:
    "Bai Tu Long Bay cruises 2025. The quietest, least-visited bay in northern Vietnam — national park coastline, mangrove lagoons, no crowds. From $249/person.",
  alternates: { canonical: "https://www.halongbestcruises.com/tours/bai-tu-long-bay" },
};

export default async function BaiTuLongPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Bai Tu Long Bay Cruises"
      eyebrow="Vietnam's Most Remote Bay · National Park"
      subtitle="Further north. Fewer boats. Mangrove lagoons, pristine beaches, and days without seeing another ship."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/420229710.webp?k=e7bdebdef0306a9d17bac45171c99ae969f974aff2911f37248e3e2ca570f025&o="
      descriptionParagraphs={[
        "Bai Tu Long Bay lies immediately northeast of Ha Long Bay, separated by a narrow channel. It covers a similarly vast area of limestone karst islands but receives a tiny fraction of the visitors — in part because day trips can't reach it, and in part because most cruise operators haven't shifted their routes this far north yet.",
        "For travellers who want the remoteness of northern Vietnam's bay scenery without the crowds, Bai Tu Long is the answer. Some ships anchor here for a full night in complete silence, with mangrove forests on one side and open Gulf of Tonkin on the other. It requires at least a 3-night itinerary.",
      ]}
      keyHighlights={[
        "The quietest bay in northern Vietnam",
        "National park coastline and mangrove forests",
        "Cai Beo and Van Don floating village visits",
        "Deserted beach anchorages",
        "Requires 3D2N minimum itinerary to reach",
        "Some ships anchor 2+ nights with no other boats in sight",
      ]}
      filterFn={(c) =>
        c.region === "Bai Tu Long Bay" ||
        c.tags.includes("bai-tu-long") ||
        c.name.toLowerCase().includes("bai tu long")
      }
      allCruises={cruises}
      priceRangeText="$249–$900+ per person (minimum 3D2N)"
      bestMonthsText="October–April. Avoid June–August when northeast winds can be strong."
      expertAdvice="Bai Tu Long requires at least 3 nights — ships need an extra half-day of sailing to reach it. If you're going this far, go luxury. The silence and scenery justify the extra spend."
      faqs={[
        {
          q: "Is Bai Tu Long Bay better than Ha Long Bay?",
          a: "It's a matter of preference. Bai Tu Long has fewer crowds, more raw natural scenery, and a much wilder feeling. Ha Long Bay has more famous karst formations and easier access. Many experienced travellers prefer Bai Tu Long.",
        },
        {
          q: "How far is Bai Tu Long Bay from Hanoi?",
          a: "The drive to Tuan Chau Harbour is roughly 3 hours from Hanoi, and then approximately 3–4 hours of sailing northeast to reach Bai Tu Long Bay. This is why a minimum 3D2N cruise is required.",
        },
        {
          q: "Which cruises go to Bai Tu Long Bay?",
          a: "Most 3D2N and longer itineraries reach Bai Tu Long Bay on the second night. Confirm with your operator — not all 3-night cruises go this far north. We can filter ships by those that include Bai Tu Long in our shortlist.",
        },
      ]}
    />
  );
}
