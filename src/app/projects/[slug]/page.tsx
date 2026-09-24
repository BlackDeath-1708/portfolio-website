import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects" className="text-sm text-foreground/60 hover:text-foreground">
        ← All projects
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-2 text-foreground/70">{project.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl leading-relaxed text-foreground/80">
        {project.description}
      </p>

      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          View on GitHub
        </a>
      ) : (
        <p className="mt-8 inline-block rounded-full bg-black/5 px-5 py-2.5 text-sm text-foreground/60 dark:bg-white/10">
          Private repository / in progress
        </p>
      )}
    </div>
  );
}
