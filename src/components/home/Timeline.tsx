import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/lib/home-content";

const CURRENT_YEAR = new Date().getFullYear();

/** Horizontal rail on desktop, vertical rail on mobile. Only dated, confirmed milestones. */
export function Timeline() {
  return (
    <section aria-labelledby="timeline-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading id="timeline-title" index="05" label="Timeline" title="The path so far." />
      </Reveal>
      <Reveal delay={100}>
        <ol className="relative mt-14 flex flex-col gap-10 border-l border-line pl-8 md:grid md:grid-cols-5 md:gap-6 md:border-t md:border-l-0 md:pt-10 md:pl-0">
          {timeline.map((milestone) => {
            const year = Number(milestone.year);
            const isFuture = year > CURRENT_YEAR;
            const isCurrent = year === CURRENT_YEAR;
            return (
              <li key={milestone.year} className="relative">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full md:-top-[calc(2.5rem+5px)] md:left-0 ${
                    isFuture ? "border border-accent bg-background" : "bg-accent shadow-[0_0_12px_var(--accent)]"
                  }`}
                />
                <p className={`font-mono text-2xl font-semibold ${isCurrent ? "text-accent" : "text-foreground"}`}>
                  {milestone.year}
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {milestone.items.map((item) => (
                    <li key={item} className="text-sm leading-snug text-foreground/65">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
