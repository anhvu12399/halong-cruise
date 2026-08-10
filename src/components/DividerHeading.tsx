export default function DividerHeading({ title, tone = "light" }: { title: string; tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <div className="mb-14 flex items-center gap-6">
      <span className={`h-px flex-1 ${isDark ? "bg-brass-500/40" : "bg-terracotta-500/30"}`} />
      <h2 className={`shrink-0 font-display text-3xl italic md:text-4xl ${isDark ? "text-sand-50" : "text-ink-900"}`}>
        {title}
      </h2>
      <span className={`h-px flex-1 ${isDark ? "bg-brass-500/40" : "bg-terracotta-500/30"}`} />
    </div>
  );
}
