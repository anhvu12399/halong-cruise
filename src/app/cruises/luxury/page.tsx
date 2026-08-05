import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Luxury Halong Bay Cruises | 5-Star & Ultra Luxury Fleet",
  description:
    "Discover the finest 5-star & ultra-luxury small ships in Ha Long Bay & Lan Ha Bay. Private balcony suites, fine dining, infinity pools & butler service.",
};

export default async function LuxuryCruisesPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Luxury Halong Bay Cruises"
      eyebrow="Ultra Luxury &amp; 5-Star Fleet"
      subtitle="Experience Vietnam’s iconic bay aboard world-class 5-star ships featuring floor-to-ceiling panoramic glass, private balcony suites, gourmet multi-course dining, and heated infinity pools."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
      descriptionParagraphs={[
        "Our curated luxury cruise collection represents the pinnacle of Vietnamese maritime hospitality. Designed for discerning travelers, these state-of-the-art vessels combine traditional French Indochine design with modern architectural elegance.",
        "Onboard, guests enjoy spacious suite accommodations starting from 28m² to over 100m² President Suites, complete with private ocean-view bathtubs, private sundecks, Nespresso coffee machines, and 24-hour butler service.",
        "Culinary offerings on our luxury ships elevate the journey into a gastronomic feast, featuring fresh Gulf of Tonkin seafood fused with international fine dining paired with curated wine lists."
      ]}
      keyHighlights={[
        "100% Private balcony suites with panoramic bay view",
        "Heated onboard infinity pools & Jacuzzis",
        "Multi-course fine dining & à la carte menu",
        "Free high-speed Wi-Fi & Starlink satellite network",
        "Complimentary kayaking, bamboo boat & cave entry fees"
      ]}
      filterFn={(c) => c.tags.includes("luxury") || (c.startingPrice !== null && c.startingPrice >= 300)}
      allCruises={cruises}
      priceRangeText="$320 – $850 / person"
      bestMonthsText="Oct – Apr (Peak Season)"
      expertAdvice="For maximum privacy and uncrowded waters, choose luxury sailings that explore Lan Ha Bay (departing from Got Harbour) where ships anchor in quiet, pristine lagoons away from heavy day boat traffic."
      faqs={[
        {
          q: "What makes a cruise categorized as Ultra Luxury?",
          a: "Ultra Luxury vessels feature a maximum guest capacity of under 50-60 passengers, minimum cabin sizes of 28m², private balconies for all suites, fine dining culinary programs, and high crew-to-guest ratios (1:2)."
        },
        {
          q: "Are luxury transfer services available from Hanoi?",
          a: "Yes! All luxury cruises offer DCar Limousine van transfers (9 leather recliner seats) or private Mercedes/SUV transfers with hotel pickup in Hanoi."
        }
      ]}
    />
  );
}
