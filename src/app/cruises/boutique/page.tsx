import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Boutique Halong Bay Cruises | Small Ships & Intimate Sailing",
  description:
    "Experience small-scale boutique cruises in Ha Long & Lan Ha Bay. Intimate ships with under 20 cabins, personalized service, and authentic Indochine charm.",
};

export default async function BoutiqueCruisesPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Boutique Halong Bay Cruises"
      eyebrow="Small Ships &amp; Intimate Atmosphere"
      subtitle="Escape the crowds on small boutique vessels featuring under 20 handcrafted cabins, warm personalized service, and authentic Indochine heritage design."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/467942185.webp?k=9580531eb28c9c8e634700d2a64b6adbf3e920885c2bd5a97ead535c5b191cf5&o="
      descriptionParagraphs={[
        "Boutique cruises cater to travelers seeking intimacy, authenticity, and tranquil sailing. With fewer than 20 cabins onboard, these ships foster a warm, unhurried atmosphere where crew members get to know guests by name.",
        "Characterized by rich dark wood paneling, brass lanterns, hand-woven textiles, and classic Indochine aesthetic, boutique junks blend traditional craftsmanship with modern ensuite comfort.",
        "Boutique vessels are often smaller in size, allowing them to navigate narrower sea passages and anchor in quiet, pristine bays inaccessible to mega-vessels."
      ]}
      keyHighlights={[
        "Intimate fleet with only 10 to 20 private cabins",
        "Handcrafted wood & Indochine artistic detailing",
        "Higher crew-to-guest ratio for personal attention",
        "Exclusive access to off-the-beaten-path anchorages",
        "Custom culinary flexibility for dietary preferences"
      ]}
      filterFn={(c) => c.cabinCount <= 25 && c.cabinCount > 0}
      allCruises={cruises}
      priceRangeText="$290 – $580 / person"
      bestMonthsText="Oct – May"
      expertAdvice="Boutique ships like Heritage Cruise Binh Chuan or Nostalgia Cruise are ideal for couples and culture enthusiasts who appreciate art, history, and tranquil deck space."
      faqs={[
        {
          q: "Why choose a boutique cruise over a large vessel?",
          a: "Boutique ships offer fewer guests, quicker boarding/disembarkation during cave visits, quieter sundecks, and customized service tailored to your pace."
        }
      ]}
    />
  );
}
