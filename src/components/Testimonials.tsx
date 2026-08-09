const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    country: "🇬🇧 United Kingdom",
    cruise: "Heritage Cruise Binh Chuan",
    stars: 5,
    quote:
      "Genuinely the highlight of our three-week Vietnam trip. The Heritage team knew every cave, every fishing village. We saw maybe three other boats in two days — extraordinary.",
    nights: "3D2N",
  },
  {
    name: "Thomas Bauer",
    country: "🇩🇪 Germany",
    cruise: "Emperor Cruise",
    stars: 5,
    quote:
      "We compared six operators before booking. The price was the same but the cabin was three times bigger than what we'd have got through the OTAs. Booking direct was the right call.",
    nights: "2D1N",
  },
  {
    name: "Priya Sharma",
    country: "🇮🇳 India",
    cruise: "Capella Cruise",
    stars: 5,
    quote:
      "Travelled with my parents (65+) and two kids under 10. The team matched us to a ship with the right cabin layout, an elevator, and a sunset-facing deck. Perfect.",
    nights: "2D1N",
  },
  {
    name: "Jessica & Dan Park",
    country: "🇦🇺 Australia",
    cruise: "La Regina Grand Cruise",
    stars: 5,
    quote:
      "Honeymoon trip. They upgraded our cabin without us even asking. Champagne at sunset, cooking class in the morning. If you're celebrating anything — go luxury. Worth every cent.",
    nights: "3D2N",
  },
  {
    name: "Marc Lefèvre",
    country: "🇫🇷 France",
    cruise: "Dragon Legend Cruise",
    stars: 5,
    quote:
      "I was skeptical of booking a cruise online from the other side of the world. The team answered every question within hours. The ship, the food, the kayaking — nothing disappointed.",
    nights: "2D1N",
  },
  {
    name: "Lauren & Chris Webb",
    country: "🇨🇦 Canada",
    cruise: "Grand Pioneers Cruise",
    stars: 5,
    quote:
      "We did the day cruise first — loved it so much we extended to a 3-night sailing on the spot. The booking team made it seamless. Ha Long Bay is one of those places that just works.",
    nights: "Day → 3D2N",
  },
];

const TEAM = [
  {
    name: "Linh Tran",
    role: "Ha Long Bay Specialist",
    experience: "9 years on the water",
    initial: "L",
    bio: "Born in Quang Ninh province, Linh has sailed every bay in northern Vietnam. She's aboard every new ship before it makes our shortlist.",
  },
  {
    name: "Minh Nguyen",
    role: "Booking & Logistics",
    experience: "7 years",
    initial: "M",
    bio: "Former Hanoi tour guide turned operations lead. Minh handles transfer coordination, last-minute changes, and group itineraries.",
  },
  {
    name: "An Pham",
    role: "Customer Experience",
    experience: "5 years",
    initial: "A",
    bio: "An follows up with every customer after their trip. The feedback she collects is how we decide which ships stay on the list and which don't.",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-brass-400" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

type TeamSection = {
  eyebrow: string;
  title: string;
  members: { name: string; role: string; experience: string; initial: string; image: string; bio: string }[];
};

type ContactStrip = {
  whatsappLabel: string;
  whatsapp: string;
  emailLabel: string;
  email: string;
  officeLabel: string;
  office: string;
  hours: string;
};

export default function Testimonials({ data, title, eyebrow, ratingText, teamSection, contactStrip }: {
  data?: { quote: string; author: string; location: string }[];
  title?: string;
  eyebrow?: string;
  ratingText?: string;
  teamSection?: TeamSection;
  contactStrip?: ContactStrip;
}) {
  const displayTestimonials = data && data.length > 0
    ? data.map((item) => ({
        name: item.author || "Verified Traveller",
        country: item.location || "International Guest",
        cruise: "Ha Long Bay Cruise",
        stars: 5,
        quote: item.quote,
        nights: "Verified",
      }))
    : TESTIMONIALS;
  const displayTeam = teamSection?.members?.length ? teamSection.members : TEAM.map((member) => ({ ...member, image: "" }));
  const whatsapp = contactStrip?.whatsapp || "+84 905 999 888";
  const email = contactStrip?.email || "hello@halongbestcruises.com";
  return (
    <section className="bg-sand-100/60 py-24 md:py-32">
      <div className="container-content">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <span className="eyebrow">{eyebrow || "Real travellers · Verified stays"}</span>
          <div className="flex items-center gap-1.5 rounded-full bg-teal-950 px-3 py-1">
            <svg viewBox="0 0 20 20" className="h-3 w-3 fill-brass-400" aria-hidden>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-wideish text-brass-300">{ratingText || "4.9 / 5 · 500+ reviews"}</span>
          </div>
        </div>
        <h2 className="font-display text-4xl italic text-ink-900 md:text-5xl">
          {title || "What our travellers say."}
        </h2>

        {/* Testimonials grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-sand-200 bg-sand-50 p-7 shadow-sm"
            >
              <div>
                <Stars n={t.stars} />
                <blockquote className="mt-4 text-ink-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-sand-200 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-950 font-display text-lg italic text-sand-50">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-ink-900 text-sm">{t.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wideish text-ink-500">
                    {t.country} · {t.cruise}
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-teal-950/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wideish text-teal-800">
                  {t.nights}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00AF87] text-white font-bold text-xs">TA</div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wideish text-ink-500">TripAdvisor</p>
              <p className="font-semibold text-ink-900 text-sm">Certificate of Excellence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4285F4] text-white font-bold text-xs">G</div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wideish text-ink-500">Google Reviews</p>
              <p className="font-semibold text-ink-900 text-sm">4.9 ★ · 312 reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-950 text-sand-50 font-bold text-xs">HB</div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wideish text-ink-500">Since 2015</p>
              <p className="font-semibold text-ink-900 text-sm">10+ years on the bay</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mt-20 border-t border-sand-200 pt-16">
          <p className="eyebrow">{teamSection?.eyebrow || "The people behind the site"}</p>
          <h2 className="mt-3 font-display text-3xl italic text-ink-900 md:text-4xl">{teamSection?.title || "Our team."}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {displayTeam.map((m) => (
              <div key={m.name} className="flex gap-5">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-950 font-display text-2xl italic text-sand-50">
                    {m.initial || m.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-ink-900">{m.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-500">{m.role}</p>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{m.bio}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wideish text-ink-400">{m.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-16 grid gap-4 rounded-2xl bg-teal-950 p-8 text-sand-50 md:grid-cols-3">
          <a
            href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.855L.057 23.25a.75.75 0 00.921.921l5.395-1.476A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.74-.51-5.3-1.4l-.38-.22-3.94 1.08 1.08-3.94-.22-.38A10 10 0 1112 22z" />
              </svg>
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-400">{contactStrip?.whatsappLabel || "WhatsApp"}</p>
              <p className="text-sand-50 group-hover:text-brass-300 transition">{whatsapp}</p>
            </div>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-3 group">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-800">✉</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-400">{contactStrip?.emailLabel || "Email"}</p>
              <p className="text-sand-50 group-hover:text-brass-300 transition text-sm">{email}</p>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-800">📍</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wideish text-brass-400">{contactStrip?.officeLabel || "Office"}</p>
              <p className="text-sand-50/80 text-sm">{contactStrip?.office || "Hanoi Old Quarter, Vietnam"}</p>
              <p className="font-mono text-[10px] text-sand-100/50">{contactStrip?.hours || "Mon–Sat · 8am–8pm ICT"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
