import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 border-b border-black/10 py-8 transition-colors first:border-t dark:border-white/10 sm:flex-row sm:items-baseline sm:gap-8"
    >
      <span className="font-mono text-sm text-foreground/30 sm:w-10 sm:shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
            {project.title}
          </h3>
          <span
            aria-hidden
            className="translate-x-0 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          >
            →
          </span>
        </div>
        <p className="mt-1 text-sm text-foreground/60">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
