import Image from "next/image";
import Link from "next/link";
import DividerHeading from "@/components/DividerHeading";

export const metadata = {
  title: "About Us | Local Ha Long Bay Cruise Experts & License",
  description:
    "Learn about Ha Long Bay Cruises. Licensed local Vietnamese cruise desk, local expertise, unbiased advice, responsible travel & 24/7 guest support.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[50vh] w-full bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/749638399.webp?k=9d3aefd241f0c12537840e57970e2567330167d4a516f3746826967a5bb54164&o="
          alt="About Us - Local Cruise Experts"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[50vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <span className="text-brass-300">About Us</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              EEAT Authority &amp; Local Expertise
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              About Ha Long Bay Cruises
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              We are an independent, Hanoi-based cruise advisory desk dedicated to curating exceptional small-ship sailing experiences across Ha Long, Lan Ha, and Bai Tu Long Bay.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative & EEAT Pillars */}
      <section className="container-content py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed text-ink-700">
            <h3 className="font-display text-3xl italic text-ink-900">Our Story &amp; Local Roots</h3>
            <p>
              Founded in Hanoi by passionate maritime travel specialists, our mission is to eliminate confusion and help international travelers find their ideal vessel with transparent pricing, zero hidden fees, and unbiased advice.
            </p>
            <p>
              We inspect ships in person, inspect cabin standards, taste culinary menus, test safety gear, and maintain direct relationships with fleet captains and cruise management.
            </p>
            <p>
              Because we are based locally in Hanoi and Tuan Chau Marina, we provide real-time weather monitoring, seamless limousine transfers, and 24/7 on-ground assistance throughout your stay in Vietnam.
            </p>
          </div>

          <div className="rounded-3xl border border-brass-500/30 bg-teal-950 p-8 text-sand-50 space-y-6">
            <div>
              <span className="eyebrow text-brass-300">EEAT Standards</span>
              <h4 className="font-display text-2xl italic text-sand-50 mt-1">Why Travelers Trust Us</h4>
            </div>

            <div className="space-y-4 text-sm text-sand-100/80 border-t border-teal-800/60 pt-4">
              <div>
                <strong className="text-brass-300 block font-mono uppercase text-xs">1. Official Tourism Licensing</strong>
                <span>Licensed International Tour Operator ID: 01-1029/TCDL-GPLHQT under Vietnam National Administration of Tourism.</span>
              </div>

              <div>
                <strong className="text-brass-300 block font-mono uppercase text-xs">2. Unbiased Vessel Inspection</strong>
                <span>We inspect all 64 fleet vessels independently and rank ships based on empirical safety, food quality, and passenger feedback.</span>
              </div>

              <div>
                <strong className="text-brass-300 block font-mono uppercase text-xs">3. Best Price &amp; No Hidden Fees</strong>
                <span>Direct fleet contracts guarantee official rates with all bay entrance tickets, kayaking, and meals included.</span>
              </div>

              <div>
                <strong className="text-brass-300 block font-mono uppercase text-xs">4. Responsible Travel &amp; Eco-Commitment</strong>
                <span>We actively support eco-certified ships equipped with modern wastewater treatment systems to protect Tonkin Gulf biodiversity.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-20 text-center text-sand-100 border-t border-teal-800/60">
        <div className="container-content max-w-2xl">
          <h3 className="font-display text-4xl italic text-sand-50">Speak to Our Hanoi Team</h3>
          <p className="mt-3 text-sand-100/80">Have questions about cruise options or custom trip planning? Reach out to us anytime.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/inquire"
              className="rounded-full bg-terracotta-500 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-sand-50 transition hover:bg-terracotta-600"
            >
              Send an Inquiry
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-brass-500/50 px-8 py-3.5 font-mono text-xs uppercase tracking-wideish text-brass-300 transition hover:bg-brass-500 hover:text-teal-950"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
