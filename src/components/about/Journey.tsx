import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eyebrow } from "@/components/ui/styles";
import { journey, undatedRecognition } from "@/lib/about-content";

const CURRENT_YEAR = new Date().getFullYear();

/** Horizontal on desktop, vertical on mobile; the rail grows in as it enters view. */
export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="journey-title"
          index="04"
          label="Timeline"
          title="My Journey"
          description="Dated, confirmed milestones from 2023 to graduation."
        />
      </Reveal>
      <Reveal className="mt-14">
        <ol className="relative grid gap-10 pl-10 md:grid-cols-5 md:gap-6 md:pt-12 md:pl-0">
          <span aria-hidden className="grow-y absolute top-1 bottom-1 left-[5px] w-px bg-gradient-to-b from-accent to-violet md:hidden" />
          <span aria-hidden className="grow-x absolute top-[5px] right-0 left-0 hidden h-px bg-gradient-to-r from-accent to-violet md:block" />
          {journey.map((stop, i) => {
            const year = Number(stop.year);
            const isFuture = year > CURRENT_YEAR;
            return (
              <li key={stop.year} className="activate relative" style={{ transitionDelay: `${300 + i * 180}ms` }}>
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-10 h-3 w-3 rounded-full md:-top-12 md:left-0 ${
                    isFuture ? "border border-violet bg-background" : "bg-accent shadow-[0_0_14px_var(--accent)]"
                  }`}
                />
                <p className={`font-mono text-2xl font-semibold ${year === CURRENT_YEAR ? "text-accent" : ""}`}>
                  {stop.year}
                  {isFuture && <span className="ml-2 align-middle font-mono text-[10px] text-violet uppercase">goal</span>}
                </p>
                <ul className="mt-2 flex flex-col gap-1">
                  {stop.items.map((item) => (
                    <li key={item} className="text-sm leading-snug text-foreground/70">
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-3 flex flex-wrap gap-1">
                  {stop.tags.map((tag) => (
                    <li key={tag} className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-foreground-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Reveal>
      {undatedRecognition.length > 0 && (
        <Reveal className="mt-12">
          <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-baseline sm:gap-6">
            <p className={`${eyebrow} shrink-0 text-foreground-muted`}>Also along the way</p>
            <ul className="flex flex-col gap-1.5 text-sm text-foreground/75">
              {undatedRecognition.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  );
}
