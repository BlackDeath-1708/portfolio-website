import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Magnetic } from "@/components/Magnetic";
import { projects } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title ?? "Project not found" };
}

const caseStudySections = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "Approach" },
  { key: "challenge", label: "The hard part" },
  { key: "result", label: "Result" },
] as const;

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/work"
        className="font-mono text-xs uppercase tracking-widest text-foreground-muted transition-colors hover:text-accent"
      >
        ← All work
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-3 text-lg text-foreground/70">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      {project.caseStudy ? (
        <div className="mt-10 flex flex-col gap-10">
          {caseStudySections.map(({ key, label }) => (
            <div key={key}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                {label}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80">
                {project.caseStudy![key]}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 max-w-2xl text-base leading-relaxed text-foreground/80">
          {project.description}
        </p>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {project.liveUrl && (
          <Magnetic>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Live demo
            </a>
          </Magnetic>
        )}
        {project.repoUrl ? (
          <Magnetic>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                project.liveUrl
                  ? "border border-black/10 hover:border-accent/40 dark:border-white/10"
                  : "bg-accent text-accent-foreground hover:opacity-90"
              }`}
            >
              View on GitHub
            </a>
          </Magnetic>
        ) : (
          <p className="inline-block rounded-full bg-black/5 px-5 py-2.5 text-sm text-foreground/60 dark:bg-white/10">
            Private repository / in progress
          </p>
        )}
      </div>
    </div>
  );
}
