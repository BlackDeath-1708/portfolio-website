import { AboutIcon } from "@/components/about/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { thinking } from "@/lib/about-content";

const STEP_DELAY_MS = 220;

/** Five-stage process: the connector draws in, then nodes activate in sequence. */
export function HowIThink() {
  return (
    <section aria-labelledby="think-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading id="think-title" index="02" label="Approach" title="How I Think" description={thinking.intro} />
      </Reveal>
      <Reveal className="mt-14">
        <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          <span aria-hidden className="grow-y absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-accent to-violet lg:hidden" />
          <span aria-hidden className="grow-x absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-accent to-violet lg:block" />
          {thinking.steps.map((step, i) => (
            <li
              key={step.title}
              className="activate relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
              style={{ transitionDelay: `${400 + i * STEP_DELAY_MS}ms` }}
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background text-accent shadow-[0_0_24px_-8px_var(--accent)]">
                <AboutIcon name={step.icon} className="h-6 w-6" />
              </span>
              <div>
                <p className="font-mono text-xs text-accent">{step.index}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
