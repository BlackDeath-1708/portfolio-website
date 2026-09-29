import { AboutIcon } from "@/components/about/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eyebrow } from "@/components/ui/styles";
import { exploring } from "@/lib/about-content";

/** Active directions, phrased as work in progress rather than claimed expertise. */
export function CurrentlyExploring() {
  return (
    <section aria-labelledby="exploring-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="exploring-title"
          index="05"
          label="Next"
          title="Currently Exploring"
          description="Areas I'm actively building in and want to go deeper on."
        />
      </Reveal>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exploring.map((direction, i) => (
          <li key={direction.title}>
            <Reveal delay={i * 70} className="h-full">
              <div className="card flex h-full gap-4 p-5 transition-colors hover:border-accent/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet/40 bg-violet/10 text-violet">
                  <AboutIcon name={direction.icon} />
                </span>
                <div>
                  <p className={`${eyebrow} text-accent`}>{direction.verb}</p>
                  <h3 className="mt-1 font-semibold tracking-tight">{direction.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{direction.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
