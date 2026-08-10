import { getAllGuides } from "@/lib/wp";
import GuideCard from "@/components/GuideCard";

export const revalidate = 60;

export const metadata = {
  title: "Travel Guides",
  description: "Practical, unpadded guides to visiting Ha Long, Lan Ha and Bai Tu Long Bay.",
};

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <div className="bg-sand-50">
      <div className="chart-grid bg-teal-950 py-20 text-sand-100">
        <div className="container-content">
          <p className="eyebrow mb-3">Home / Guides</p>
          <h1 className="max-w-2xl font-display text-5xl text-sand-50">Travel guides</h1>
          <p className="mt-4 max-w-xl text-sand-100/70">
            Short, specific answers to the questions that actually change your booking — timing,
            which bay, what to pack.
          </p>
        </div>
      </div>

      <div className="container-content py-14">
        {guides.length === 0 ? (
          <p className="text-ink-500">No guides published yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
