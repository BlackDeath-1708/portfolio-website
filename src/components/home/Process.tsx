import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/home-content";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
  "aria-hidden": true,
};

const ICONS: Record<string, ReactNode> = {
  Observe: (
    <svg {...ICON_PROPS}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Model: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4a2.5 2.5 0 012.5 2.5v5" />
    </svg>
  ),
  Detect: (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12l6-6" />
    </svg>
  ),
  Validate: (
    <svg {...ICON_PROPS}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" />
    </svg>
  ),
  Ship: (
    <svg {...ICON_PROPS}>
      <path d="M5 19l14-14M19 5h-6M19 5v6" />
      <path d="M5 13v6h6" />
    </svg>
  ),
};

export function Process() {
  return (
    <section aria-labelledby="process-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading id="process-title" index="04" label="How I build" title="Observe first. Ship last." />
      </Reveal>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 80} className="h-full">
            <div className="card relative flex h-full flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  {ICONS[step.title]}
                </span>
                <span className="font-mono text-xs text-foreground-muted">{step.index}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.text}</p>
              {i < processSteps.length - 1 && (
                <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden text-accent/70 lg:block">
                  →
                </span>
              )}
            </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
