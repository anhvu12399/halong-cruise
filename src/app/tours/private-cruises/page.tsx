import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Private Halong Bay Cruises | Private Charter & Tailor-Made Sailings",
  description:
    "Exclusive private Ha Long Bay & Lan Ha Bay cruises. Private ship charter, customized sailing route, dedicated captain & chef for families and groups.",
};

export default async function PrivateCruisesToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Private Halong Bay Cruises"
      eyebrow="100% Exclusive Vessel Hire &amp; Tailored Route"
      subtitle="Experience total freedom with an exclusive private charter boat. Tailor your sailing itinerary, dining schedule, and excursion activities with a dedicated captain and private crew."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
      descriptionParagraphs={[
        "Private Halong Bay Cruises give your private group exclusive ownership of the entire vessel. No sharing sundecks or dining tables with strangers — the ship, captain, chef, and guides are 100% dedicated to you.",
        "Whether you are planning a family reunion, a romantic wedding, or an executive retreat, private charter allows custom flexibility: linger longer at secret beach lagoons, skip crowded caves, or enjoy late-night sundeck celebrations.",
        "Our fleet offers private junks ranging from single-cabin luxury vessels to 10-cabin boutique yachts and mega private charters."
      ]}
      keyHighlights={[
        "100% Private vessel exclusivity for your group only",
        "Tailor-made sailing routes & flexible excursion timing",
        "Private chef crafting custom multi-course menus",
        "Ideal for anniversaries, family milestones & celebrations",
        "Private DCar Limousine transfer from Hanoi included"
      ]}
      filterFn={(c) => c.slug.includes("private") || c.slug.includes("charter") || c.cabinCount <= 10}
      allCruises={cruises}
      priceRangeText="Custom Quote (Based on ship & group size)"
      bestMonthsText="Year-Round"
      expertAdvice="Private charters for small groups of 4 to 8 guests often cost surprisingly close per person to booking individual luxury suites on commercial vessels."
      faqs={[
        {
          q: "Can we customize the menu on a private cruise?",
          a: "Absolutely! Our culinary team consults with you prior to departure to tailor all lunch and dinner menus to your dietary preferences, wine choices, and allergic needs."
        }
      ]}
    />
  );
}
