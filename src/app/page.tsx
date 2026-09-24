import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const featured = projects.filter((project) => project.featured);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-lg text-foreground/70">{siteConfig.title}</p>
        <p className="mt-6 max-w-xl text-foreground/80">{siteConfig.tagline}</p>
        <div className="mt-8 flex gap-4 text-sm font-medium">
          <Link
            href="/projects"
            className="rounded-full bg-accent px-5 py-2.5 text-accent-foreground transition-opacity hover:opacity-90"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
          >
            Get in touch
          </Link>
          <a
            href={siteConfig.resumeUrl}
            download
            className="rounded-full border border-black/10 px-5 py-2.5 transition-colors hover:border-accent/40 dark:border-white/10"
          >
            Résumé
          </a>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
          Featured projects
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
