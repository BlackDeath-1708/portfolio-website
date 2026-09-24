"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

export function ProjectList({ projects }: Props) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique] as const;
  }, [projects]);

  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              active === category
                ? "border-accent bg-accent/10 text-accent"
                : "border-black/10 text-foreground/60 hover:border-accent/40 dark:border-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {filtered.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
