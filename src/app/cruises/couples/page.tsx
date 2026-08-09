import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Ha Long Bay Cruises for Couples & Honeymoon",
  description:
    "Romantic Ha Long Bay cruise packages for couples and honeymoons. Private balcony suites, sunset decks, and personal butler service on the bay.",
  alternates: { canonical: "https://www.halongbestcruises.com/cruises/couples" },
};

export default async function CouplesPage() {
  const cruises = await getAllCruises();
  return (
    <CategoryListingPage
      cmsSlug="couples"
      title="Couples & Honeymoon Ha Long Bay Cruises"
      eyebrow="Romance · Honeymoon · Couples"
      subtitle="Private balcony suites, sunset decks, and moments that stay with you long after you're home."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/411409062.webp?k=dd0f7b9297bb345b5350265a4466db99778914c17805d5a46a25ab5db2f8df33&o="
      descriptionParagraphs={[
        "Ha Long Bay is one of the world's great romantic destinations — and a cruise is the only way to truly experience it. Most couples opt for a 3-night sailing on a boutique ship with fewer than 20 cabins: space to breathe, a private balcony, and a bay that feels like it exists just for you.",
        "Honeymoon couples often receive complimentary cabin upgrades, sparkling wine, and decorated rooms when booked through us. Ask us to arrange it when you request your shortlist.",
      ]}
      keyHighlights={[
        "Private balcony suites with bay views",
        "Couples-only boats available on request",
        "Complimentary honeymoon upgrades",
        "Sunset cocktail decks",
        "In-cabin Jacuzzi options on select ships",
      ]}
      filterFn={(c) =>
        c.tags.includes("couples") ||
        c.tags.includes("honeymoon") ||
        c.tags.includes("romance")
      }
      allCruises={cruises}
      priceRangeText="$249–$900+ per person"
      bestMonthsText="October–December for cool, clear evenings. March–May for calm seas."
      expertAdvice="Don't underestimate a 3-night sailing for a honeymoon. Two nights on the water is lovely; three nights is transformative. If budget allows, go three."
      faqs={[
        {
          q: "Which Ha Long Bay cruises are best for honeymoons?",
          a: "Boutique luxury ships with fewer than 20 cabins, private balcony suites, and sunset decks are ideal. Ships like La Regina Grand, Capella, and Heritage Cruise Binh Chuan are perennial honeymoon favourites.",
        },
        {
          q: "Can we get a private cabin for two?",
          a: "Yes — all cabins on our listed ships are private double-occupancy. For complete privacy, a private charter gives you the entire vessel.",
        },
        {
          q: "How do I arrange honeymoon extras?",
          a: "Simply mention it in your shortlist request or WhatsApp us. We coordinate complimentary wine, room decoration, and early boarding with the ship directly.",
        },
      ]}
    />
  );
}
