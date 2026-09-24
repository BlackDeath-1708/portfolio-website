import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { research } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Research
        </h1>
      </div>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">
        Ongoing research work, outside of shipped projects.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {research.map((entry, index) => (
          <Reveal key={entry.slug} delay={index * 60}>
            <div className="rounded-lg border border-black/10 p-6 dark:border-white/10 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
                <span className="font-mono text-xs text-foreground/50">{entry.period}</span>
              </div>
              <p className="mt-1 text-sm text-accent">
                {entry.org} — {entry.location}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-foreground/40">
                {entry.area}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
                {entry.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {entry.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
