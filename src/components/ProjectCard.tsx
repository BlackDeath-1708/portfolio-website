import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-lg border border-black/10 p-5 transition-all hover:border-accent/40 hover:shadow-[0_0_24px_-8px_var(--color-accent)] dark:border-white/10"
    >
      <h3 className="font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>
    </Link>
  );
}
