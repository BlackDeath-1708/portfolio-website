import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-baseline gap-3">
        <span className="h-px w-8 bg-accent" />
        <h1 className="font-mono text-xs uppercase tracking-widest text-foreground/50">
          Work
        </h1>
      </div>
      <p className="mt-4 max-w-xl text-lg text-foreground/70">
        Things I&apos;ve built, mostly security-focused. ODIN and PhishGuard have full
        write-ups — the rest are quick summaries.
      </p>
      <div className="mt-10">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
