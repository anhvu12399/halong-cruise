const ICONS: { match: RegExp; svg: JSX.Element }[] = [
  {
    match: /spa|massage/i,
    svg: (
      <path d="M12 3c2 3 3 5 3 7a3 3 0 11-6 0c0-2 1-4 3-7zM6 14c1 2 2 3 2 4.5a2 2 0 11-4 0C4 17 5 16 6 14zM18 14c1 2 2 3 2 4.5a2 2 0 11-4 0c0-1.5 1-2.5 2-4.5z" />
    ),
  },
  { match: /pool|jacuzzi/i, svg: <path d="M3 17c1.5 1 2.5 1 4 0s2.5-1 4 0 2.5 1 4 0 2.5-1 4 0M4 12h16M7 8a2 2 0 104 0 2 2 0 00-4 0z" /> },
  {
    match: /wifi/i,
    svg: <path d="M5 9a11 11 0 0114 0M8 12.5a6.5 6.5 0 018 0M11.5 16a2 2 0 011 0M12 18.5h.01" />,
  },
  {
    match: /kayak|canoe|bicycle|fishing/i,
    svg: <path d="M3 15l7-9 3 3-9 9-3-1 2-2zM12 9l6 6M17 19l4-4" />,
  },
  {
    match: /yoga|sunrise/i,
    svg: <path d="M12 3v4M8 9a4 4 0 118 0c0 2-1.5 3-4 6-2.5-3-4-4-4-6zM4 21c2-4 5-6 8-6s6 2 8 6" />,
  },
  { match: /garden|kitchen/i, svg: <path d="M12 21V9M12 9C9 9 6 7 6 4c3 0 5 2 6 5zM12 9c3 0 6-2 6-5-3 0-5 2-6 5z" /> },
];

const DEFAULT: JSX.Element = <path d="M12 3l2.3 5.5L20 9l-4.4 3.8L17 19l-5-3.2L7 19l1.4-6.2L4 9l5.7-.5L12 3z" />;

function iconFor(label: string) {
  return ICONS.find((i) => i.match.test(label))?.svg ?? DEFAULT;
}

export default function AmenityIcons({ features }: { features: string[] }) {
  const shown = features.slice(0, 4);
  if (shown.length === 0) return null;

  return (
    <div className="flex items-center gap-2.5">
      {shown.map((f) => (
        <div
          key={f}
          title={f}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-300/30 text-ink-500 transition hover:border-terracotta-500 hover:text-terracotta-600"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
            {iconFor(f)}
          </svg>
        </div>
      ))}
    </div>
  );
}
