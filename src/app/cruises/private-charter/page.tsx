import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Private Charter Halong Bay Cruises | Exclusive Vessel Hire",
  description:
    "Charter a private cruise ship in Ha Long Bay & Lan Ha Bay for corporate retreats, private family celebrations, weddings, or intimate milestone events.",
};

export default async function PrivateCharterCruisesPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Private Charter Cruises"
      eyebrow="Exclusive Vessel Hire &amp; Private Parties"
      subtitle="Take full control of your voyage by chartering an entire luxury ship exclusively for your family, private group, corporate retreat, or wedding celebration."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/411409062.webp?k=dd0f7b9297bb345b5350265a4466db99778914c17805d5a46a25ab5db2f8df33&o="
      descriptionParagraphs={[
        "A private cruise charter grants your group complete exclusivity over the vessel, crew, dining room, sundeck, and sailing itinerary. Whether hosting 4 guests on a private luxury junk or 80 guests on a mega-yacht, chartering ensures ultimate freedom.",
        "Customized itineraries can be arranged to suit your desires — from secluded island beach BBQs, sunset DJ parties on the sundeck, to tailored team-building challenges and corporate gala dinners.",
        "Our charter management team coordinates all logistics including private limousine transfers, custom menus, branding, entertainment, and port permissions."
      ]}
      keyHighlights={[
        "100% Exclusive use of ship, crew, and onboard amenities",
        "Fully flexible sailing route & excursion schedule",
        "Customized culinary menus & beverage bar packages",
        "Dedicated event coordination, live music & DJ setups",
        "Ideal for anniversaries, weddings & corporate retreats"
      ]}
      filterFn={(c) => c.slug.includes("private") || c.slug.includes("legend") || c.slug.includes("charter") || c.cabinCount <= 12}
      allCruises={cruises}
      priceRangeText="Custom Charter Quote (Based on ship size & dates)"
      bestMonthsText="Year-Round Private Bookings"
      expertAdvice="Chartering a small 1-cabin to 5-cabin private junk (such as Legend Halong or Bhaya Private) often costs less per person than booking individual suites on a large commercial ship for groups of 6 to 10."
      faqs={[
        {
          q: "How far in advance should we book a private charter?",
          a: "For full vessel charter, we recommend reserving 4 to 9 months in advance, especially for autumn peak dates or holiday celebrations."
        }
      ]}
    />
  );
}
