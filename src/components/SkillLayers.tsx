"use client";

import { useState } from "react";
import { Badge } from "@/components/Badge";

type Layer = {
  label: string;
  items: readonly string[];
};

type Props = {
  layers: Layer[];
};

export function SkillLayers({ layers }: Props) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
      {layers.map((layer, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={layer.label}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-foreground-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-lg font-semibold tracking-tight transition-colors sm:text-xl ${isOpen ? "text-accent" : "text-foreground"}`}
                >
                  {layer.label}
                </span>
              </span>
              <span
                aria-hidden
                className={`font-mono text-xl text-foreground-muted transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <ul className="flex flex-wrap gap-2 pb-6 pl-11">
                  {layer.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
