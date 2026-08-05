import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "5 Star Halong Bay Cruises | Certified 5-Star Ships 2026",
  description:
    "Book official 5-star Halong Bay & Lan Ha Bay cruises. Premium oceanview suites, sundeck bar, spa treatments, kayaking and 5-star service guarantee.",
};

export default async function FiveStarCruisesPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="5-Star Halong Bay Cruises"
      eyebrow="Certified 5-Star Vessel Selection"
      subtitle="Discover our selection of officially rated 5-star ships in Ha Long Bay, offering flawless safety standards, plush oceanfront cabins, and comprehensive 5-star hospitality."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o="
      descriptionParagraphs={[
        "5-Star Halong Bay cruises are officially inspected and certified by the Quang Ninh Tourism Department for maritime safety, room size, onboard amenities, and service quality.",
        "Equipped with modern steel hulls, state-of-the-art navigation technology, and luxurious interior fittings, these vessels provide a safe and opulent haven while sailing through limestone islands.",
        "Passengers enjoy full-board dining, morning Tai Chi sessions, cooking classes, evening squid fishing, and guided shore excursions to Sung Sot Cave, Dark & Light Cave, and Titov Island."
      ]}
      keyHighlights={[
        "Official 5-Star government safety certification",
        "Spacious en-suite cabins with ocean view balconies",
        "Full-board meals included in all packages",
        "Onboard spa, sauna & sundeck lounge bar",
        "Daily excursions with professional English-speaking guides"
      ]}
      filterFn={(c) => c.tags.includes("luxury") || c.tags.includes("best")}
      allCruises={cruises}
      priceRangeText="$280 – $650 / person"
      bestMonthsText="Year-Round Sailing"
      expertAdvice="Booking 5-star cruises 2-3 months in advance is recommended during peak season (October through April) as popular balcony suites sell out fast."
      faqs={[
        {
          q: "What is included in a 5-star cruise booking?",
          a: "Bookings include full meals (breakfast, lunch, dinner, brunch), welcome drink, excursion entrance tickets, kayaking, guide fees, and cabin accommodation."
        }
      ]}
    />
  );
}
