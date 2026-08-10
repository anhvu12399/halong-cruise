"use client";

import { useState } from "react";

export default function ReadMore({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={open ? "" : "max-h-[15.5rem] overflow-hidden"}>{children}</div>
      {!open && (
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-ink-300/40 px-7 py-2.5 font-mono text-xs uppercase tracking-wideish text-ink-700 transition hover:border-terracotta-500 hover:text-terracotta-600"
          >
            Read more
          </button>
        </div>
      )}
    </div>
  );
}
