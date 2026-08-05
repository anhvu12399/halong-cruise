import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Halong Bay Honeymoon Cruises | Romantic Balcony Suites & Spa",
  description:
    "Romantic Ha Long Bay & Lan Ha Bay honeymoon cruises. Private balcony suites, candlelight dinners, couple spa packages, wine & romantic setup included.",
};

export default async function HoneymoonToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Halong Bay Honeymoon Cruises"
      eyebrow="Romantic Voyages &amp; Couple Celebrations"
      subtitle="Celebrate your love amidst one of the world's most romantic natural wonders. Enjoy private oceanview Jacuzzi suites, romantic candlelight dinners, and couple spa rituals."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o="
      descriptionParagraphs={[
        "A Ha Long Bay honeymoon cruise is an unforgettable romantic highlight. Wake up to misty limestone peaks right outside your floor-to-ceiling glass suite, sip morning coffee on your private balcony, and watch golden sunsets together.",
        "Our honeymoon packages include special romantic touches: flower &amp; swan towel cabin setup, complimentary sparkling wine upon arrival, private candlelight dinner served on your suite balcony or sundeck, and couple massage sessions.",
        "We recommend 5-star ships sailing in quiet Lan Ha Bay for maximum intimacy, peace, and pristine emerald water scenery."
      ]}
      keyHighlights={[
        "Honeymoon suite setup: fresh roses, swan towels & champagne",
        "Private balcony with oceanfront bathtub or Jacuzzi",
        "Candlelight dinner on private balcony or sundeck",
        "Couple spa discount & romantic sunset cocktail hour",
        "Quiet Lan Ha Bay sailing route away from crowds"
      ]}
      filterFn={(c) => c.tags.includes("honeymoon") || c.tags.includes("luxury")}
      allCruises={cruises}
      priceRangeText="$320 – $780 / person"
      bestMonthsText="Oct – Apr (Romantic crisp autumn & spring air)"
      expertAdvice="Mention that you are celebrating your honeymoon or wedding anniversary when booking — ships offer complimentary honeymoon cakes, wine, and room upgrades whenever available."
      faqs={[
        {
          q: "Can we have meals served in our private cabin?",
          a: "Yes! Most 5-star luxury ships offer private cabin room service for breakfast or romantic multi-course balcony dining upon request."
        }
      ]}
    />
  );
}
