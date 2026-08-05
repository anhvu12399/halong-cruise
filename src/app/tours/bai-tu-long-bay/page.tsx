import { getAllCruises } from "@/lib/wp";
import CategoryListingPage from "@/components/CategoryListingPage";

export const metadata = {
  title: "Bai Tu Long Bay Cruises | Off-the-Beaten-Path & Wild Karsts",
  description:
    "Explore off-the-beaten-track Bai Tu Long Bay cruises. Secluded limestone wilderness, Thien Canh Son cave, Cap La island & untouched natural beauty.",
};

export default async function BaiTuLongBayToursPage() {
  const cruises = await getAllCruises();

  return (
    <CategoryListingPage
      title="Bai Tu Long Bay Cruises"
      eyebrow="Off-the-Beaten-Track Wilderness"
      subtitle="Located northeast of Ha Long, Bai Tu Long Bay represents the untouched, peaceful frontier of Tonkin Gulf — featuring hidden caves, floating fishing hamlets, and zero crowds."
      heroImage="https://cf.bstatic.com/xdata/images/hotel/max1280x900/372191245.jpg?k=bb6d2a9750e797d466a6d8cc1ddf56b7378189bb9dfdbfb0707408e1bd93b0a0"
      descriptionParagraphs={[
        "According to local legend, Bai Tu Long Bay is where the child dragon descended to protect Vietnam's coast. Today, it remains the most tranquil and wild sector of the World Heritage region.",
        "Strict environmental quotas limit the number of commercial cruise licenses in Bai Tu Long Bay, guaranteeing that when your ship anchors at Cap La or Cong Dam, you will likely be the only vessel in sight.",
        "Highlights include exploring Thien Canh Son Cave, kayaking around Vung Vieng floating village, and swimming off wild coral beaches."
      ]}
      keyHighlights={[
        "Maximum privacy & zero tourist boat congestion",
        "Thien Canh Son Cave with panoramic bay overlooks",
        "Vung Vieng floating fishing village cultural visit",
        "Kayaking around Cap La island & geological rock arches",
        "Untouched marine biodiversity & peaceful anchorages"
      ]}
      filterFn={(c) => c.region.toLowerCase().includes("bai tu long") || c.slug.includes("dragon") || c.slug.includes("emperor")}
      allCruises={cruises}
      priceRangeText="$280 – $600 / person"
      bestMonthsText="Nov – Apr"
      expertAdvice="Bai Tu Long Bay is ideal for nature purists, photographers, and repeat travelers to Vietnam who want a serene, raw nature experience without commercial crowds."
      faqs={[
        {
          q: "Why are there fewer cruises in Bai Tu Long Bay?",
          a: "The government strictly limits cruise permits in Bai Tu Long Bay to protect its pristine ecosystem and coral reefs."
        }
      ]}
    />
  );
}
