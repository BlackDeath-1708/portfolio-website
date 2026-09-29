import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Tilt } from "@/components/Tilt";
import { projectVisuals } from "@/components/visuals";
import { StackVisual } from "@/components/visuals/StackVisual";
import type { Project } from "@/lib/projects";

const MAX_TAGS = 4;

export function splitTitle(title: string): { main: string; sub?: string } {
  const [main, sub] = title.split(" — ");
  return { main, sub };
}

type Props = {
  project: Project;
  index: number;
};

/** Project card with its custom visual, stretched link, and a separate GitHub link. */
export function ProjectCard({ project, index }: Props) {
  const Visual = projectVisuals[project.slug];
  const { main, sub } = splitTitle(project.title);

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-32px_var(--accent)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent">
      <Tilt className="relative h-56 overflow-hidden border-b border-line bg-[radial-gradient(90%_110%_at_50%_0%,var(--glow),transparent_70%)]">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          {Visual ? <Visual /> : <StackVisual stack={project.stack} />}
        </div>
      </Tilt>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-[11px] text-foreground-muted">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="tracking-wider uppercase">{project.category}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {main}
          </Link>
        </h3>
        {sub && <p className="mt-0.5 text-sm text-accent">{sub}</p>}
        <p className="mt-3 text-sm leading-relaxed text-foreground/65">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_TAGS).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-6 font-mono text-[11px] tracking-wider uppercase">
          <span className="text-accent">
            {project.caseStudy ? "Case study" : "Details"}
            <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${main} source on GitHub`}
              className="relative z-10 text-foreground-muted transition-colors hover:text-foreground"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
