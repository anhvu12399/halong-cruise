import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import { getAllCruises } from "@/lib/wp";

export const metadata = {
  title: "Contact Us & Support | Ha Long Bay Cruise Desk",
  description:
    "Contact our local Hanoi cruise support desk. 24/7 WhatsApp assistance, email inquiries, office location, and instant trip planning help.",
};

export default async function ContactPage() {
  const cruises = await getAllCruises();
  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative min-h-[45vh] w-full bg-teal-950">
        <Image
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/783832264.webp?k=332fd8224c34a103fadc0be18c2fd4fd3cc281dc81ca0777a453eacede034e92&o="
          alt="Contact Us"
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />
        <div className="container-content relative flex min-h-[45vh] flex-col justify-between py-14">
          <p className="eyebrow text-sand-100/80">
            <Link href="/" className="hover:text-brass-300">Home</Link> /{" "}
            <span className="text-brass-300">Contact Us</span>
          </p>

          <div className="max-w-3xl">
            <span className="eyebrow rounded-full bg-brass-500/20 px-4 py-1.5 text-brass-300 border border-brass-500/30">
              24/7 Guest Support
            </span>
            <h1 className="mt-4 font-display text-4xl italic text-sand-50 md:text-6xl">
              Contact Our Local Team
            </h1>
            <p className="mt-4 text-lg text-sand-100/80 leading-relaxed">
              We are here to help you plan the perfect voyage. Reach out via form, email, or instant messaging.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-content py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr,1.3fr]">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <span className="eyebrow text-terracotta-600">Local Offices</span>
              <h3 className="font-display text-3xl italic text-ink-900 mt-2">Hanoi &amp; Tuan Chau Marina</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">
                Our main booking office is located in Hanoi Old Quarter, with our port operations team based directly at Tuan Chau International Marina.
              </p>
            </div>

            <div className="space-y-4 border-t border-ink-300/20 pt-6 font-mono text-sm text-ink-700">
              <div>
                <span className="block text-xs uppercase text-ink-400">Hanoi Head Office</span>
                <span className="text-ink-900 font-semibold">Old Quarter, Hoan Kiem, Hanoi, Vietnam</span>
              </div>

              <div>
                <span className="block text-xs uppercase text-ink-400">Port Logistics Office</span>
                <span className="text-ink-900 font-semibold">Tuan Chau International Marina, Quang Ninh</span>
              </div>

              <div>
                <span className="block text-xs uppercase text-ink-400">Email Inquiry</span>
                <span className="text-terracotta-600 font-semibold">booking@halongbaycruises.com</span>
              </div>

              <div>
                <span className="block text-xs uppercase text-ink-400">24/7 WhatsApp &amp; Phone Support</span>
                <span className="text-ink-900 font-semibold">+84 98 123 4567</span>
              </div>

              <div>
                <span className="block text-xs uppercase text-ink-400">Working Hours</span>
                <span className="text-ink-900 font-semibold">Mon – Sun: 7:00 AM – 10:00 PM (GMT+7)</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-ink-300/20 bg-sand-100/50 p-6 md:p-8">
            <h3 className="font-display text-2xl italic text-ink-900 mb-6">Send an Inquiry</h3>
            <InquiryForm cruises={cruises} />
          </div>
        </div>
      </section>
    </div>
  );
}
