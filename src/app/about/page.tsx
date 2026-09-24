import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { achievements, experience, skills } from "@/lib/resume";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          About
        </h1>
      </div>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
        {siteConfig.bio}
      </p>

      <Reveal className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Experience
        </h2>
        <div className="relative mt-8 flex flex-col gap-12 border-l border-black/10 pl-8 dark:border-white/10">
          {experience.map((job) => (
            <div key={job.role} className="relative">
              <span className="absolute top-1.5 -left-[calc(2rem+4.5px)] h-2.5 w-2.5 rounded-full bg-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">{job.role}</h3>
                <span className="font-mono text-xs text-foreground/50">{job.period}</span>
              </div>
              <p className="text-sm text-accent">{job.org}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/70">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Skills & stack
        </h2>
        <div className="mt-8 flex flex-col gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="text-sm font-medium text-foreground/60">{category}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li key={skill}>
                    <Badge>{skill}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-20">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Achievements
        </h2>
        <ul className="mt-8 flex flex-col gap-4">
          {achievements.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
