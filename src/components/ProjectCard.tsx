import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-lg border border-black/10 p-5 transition-colors hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
    >
      <h3 className="font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-foreground/70 dark:bg-white/10"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}
