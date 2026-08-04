import Link from "next/link";

type Tone = "light" | "dark";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  cta,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: Tone;
  cta?: { label: string; href: string };
  align?: "left" | "center";
}) {
  const isDark = tone === "dark";
  return (
    <div className={`mb-14 flex flex-wrap items-end justify-between gap-6 ${align === "center" ? "text-center" : ""}`}>
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`h-px w-8 ${isDark ? "bg-brass-400" : "bg-terracotta-500"}`} />
          <p className={`eyebrow ${isDark ? "text-brass-300" : "text-terracotta-600"}`}>{eyebrow}</p>
        </div>
        <h2
          className={`mt-4 font-display text-4xl leading-[1.1] md:text-5xl ${
            isDark ? "text-sand-50" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className={`mt-4 text-lg ${isDark ? "text-sand-100/70" : "text-ink-500"}`}>{description}</p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className={`font-mono text-xs uppercase tracking-wideish underline underline-offset-4 ${
            isDark
              ? "text-brass-300 decoration-brass-400/40 hover:text-brass-200"
              : "text-terracotta-600 decoration-terracotta-500/40 hover:text-terracotta-700"
          }`}
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}
