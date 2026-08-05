import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "3 Days 2 Nights Halong Bay Cruises | Deep Bay Exploration",
  description:
    "Experience the ultimate 3-day 2-night Ha Long & Lan Ha Bay cruises. Explore secluded lagoons, Viet Hai village cycling, quiet beaches & unhurried sailing.",
};

export default async function ThreeDaysTwoNightsToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="3 Days 2 Nights Halong Bay Cruises"
      eyebrow="Immersive 3-Day Expeditions"
      subtitle="Go beyond the crowded tourist tracks. Spend 3 days and 2 nights exploring untouched lagoons, cycling in Viet Hai village, and relaxing on secluded island beaches."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/695679661.webp?k=916cf4caa19f160df7cf7e259a58c22f09bc4afb464e07e9c65ab1a9fe051eea&o="
      descriptionParagraphs={[
        "A 3-day 2-night cruise is highly recommended by travel experts for guests wanting an authentic, unhurried experience. Day 2 is the highlight of the trip: a day boat takes you deep into the quietest corners of Lan Ha Bay or Bai Tu Long Bay.",
        "Activities on Day 2 include cycling through the lush rainforest of Viet Hai Village on Cat Ba Island, kayaking in Ba Trai Dao secluded lagoons, and beach picnics.",
        "With two full nights on the bay, you get double the sunsets, double the stargazing from the sundeck, and a far more relaxing vacation pace."
      ]}
      keyHighlights={[
        "2 Full nights aboard in luxury suite accommodations",
        "Day 2 transfer to smaller day boat for deep bay exploration",
        "Bicycle ride through Viet Hai rainforest village on Cat Ba",
        "Kayaking & swimming in Ba Trai Dao pristine beaches",
        "7 Full gourmet meals included throughout the 3-day tour"
      ]}
      filterFn={(c) => c.durationDays >= 3}
      allCruises={cruises}
      priceRangeText="$340 – $920 / person"
      bestMonthsText="Oct – May (Ideal mild weather for cycling & kayaking)"
      expertAdvice="3D2N itineraries avoid the midday harbor rush on Day 2 when 2D1N ships return to port, giving you hours of private bay serenity."
      faqs={[
        {
          q: "Do I stay on the same ship for both nights?",
          a: "Most 5-star ships keep your main suite for both nights, while Day 2 excursion is conducted on a nimble day boat before returning to the mother vessel by 4:00 PM."
        }
      ]}
    />
  );
}
