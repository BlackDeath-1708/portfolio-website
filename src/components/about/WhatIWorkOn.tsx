import { AboutIcon } from "@/components/about/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workAreas } from "@/lib/about-content";

export function WhatIWorkOn() {
  return (
    <section aria-labelledby="work-on-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="work-on-title"
          index="03"
          label="Focus areas"
          title="What I Work On"
          description="Key areas I focus on, with the tools I've actually used in projects and roles."
          action={{ label: "See the projects", href: "/work" }}
        />
      </Reveal>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {workAreas.map((area, i) => (
          <li key={area.title}>
            <Reveal delay={i * 80} className="h-full">
              <div className="group card flex h-full flex-col p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_50px_-30px_var(--accent)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <AboutIcon name={area.icon} />
                  </span>
                  <span className="font-mono text-xs text-foreground-muted">{area.index}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{area.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {area.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-md border border-line bg-foreground/[0.03] px-2 py-1 font-mono text-[11px] text-foreground/65 transition-colors group-hover:border-accent/30 group-hover:text-foreground"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
