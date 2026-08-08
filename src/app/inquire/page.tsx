import { getAllCruises } from "@/lib/wp";
import InquiryForm from "@/components/InquiryForm";

export const metadata = { title: "Plan a Sailing" };

export default async function InquirePage({
  searchParams,
}: {
  searchParams: { cruise?: string };
}) {
  const cruises = await getAllCruises();

  return (
    <div className="bg-sand-50">
      <div className="chart-grid bg-gradient-to-b from-[#1B431D] via-[#16381C] to-[#102A14] py-20 text-sand-100 border-b border-[#E09F00]/30">
        <div className="container-content">
          <p className="eyebrow mb-3">Home / Inquire</p>
          <h1 className="max-w-xl font-display text-5xl italic text-sand-50">Plan a sailing</h1>
          <p className="mt-4 max-w-lg text-sand-100/70">
            Tell us roughly what you're after and we'll come back with a short, specific list —
            not a brochure.
          </p>
        </div>
      </div>

      <div className="container-content max-w-2xl py-16 md:py-24">
        <InquiryForm cruises={cruises} defaultSlug={searchParams.cruise} />
      </div>
    </div>
  );
}
