import type { Metadata } from "next";
import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata: Metadata = {
  title: "Small Ship Ha Long Bay Cruises — Intimate & Uncrowded",
  description:
    "Ha Long Bay cruises on ships with under 20 cabins. Quieter routes, more personalised service, and a completely different experience to the big boats.",
  alternates: { canonical: "https://www.halongbestcruises.com/cruises/small-ship" },
};

export default async function SmallShipPage() {
  const cruises = await getAllCruises();
  return (
    <CategoryListingPage
      title="Small Ship Ha Long Bay Cruises"
      eyebrow="Boutique · Intimate · Uncrowded"
      subtitle="Under 20 cabins. More personalised. Further from the tourist routes."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/895524639.webp?k=ad1836bbd6de1032a92737816e5a95038c5d8fd9e649979d98a9f722afb4acdd&o="
      descriptionParagraphs={[
        "Ha Long Bay has hundreds of ships. The difference between a memorable cruise and a forgettable one often comes down to size. Small ships — typically 10 to 20 cabins — access smaller bays, move faster, and feel like a private experience even when fully booked.",
        "All our small-ship listings sail primarily through Lan Ha Bay and the quieter eastern reaches of Ha Long Bay, where the limestone formations are just as dramatic but the boat traffic is a fraction of the main tourist area.",
      ]}
      keyHighlights={[
        "Under 20 cabins — no crowding",
        "Access to quieter anchorages",
        "More attentive, personalised crew",
        "Lan Ha Bay and eastern Ha Long routes",
        "Often newer vessels with modern design",
      ]}
      filterFn={(c) =>
        c.tags.includes("small-ship") ||
        c.tags.includes("boutique") ||
        c.cabinCount <= 20
      }
      allCruises={cruises}
      priceRangeText="$149–$600+ per person"
      bestMonthsText="All year. Small ships are more comfortable in mild swell. Best: Oct–Apr."
      expertAdvice="If you've read a single bad review about Ha Long Bay being 'too crowded', the reviewer was almost certainly on a large ship. Twenty cabins changes everything."
      faqs={[
        {
          q: "What counts as a 'small ship' in Ha Long Bay?",
          a: "We define small ships as those with 20 cabins or fewer. These ships are sometimes called 'junk cruises' or 'boutique cruises'. They tend to have a better crew-to-guest ratio and a more personal atmosphere.",
        },
        {
          q: "Do small ships go to the same places as big ships?",
          a: "Small ships can access anchorages that larger vessels cannot. They often skip the main tourist routes in favour of Lan Ha Bay, the Cat Ba Island coast, and the quieter eastern sectors of the Ha Long Bay UNESCO zone.",
        },
        {
          q: "Are small ships less comfortable?",
          a: "Not necessarily. Many small ships are premium or luxury class. The 'size' refers to guest capacity, not service level. Some of the most expensive ships in Ha Long Bay have fewer than 15 cabins.",
        },
      ]}
    />
  );
}
