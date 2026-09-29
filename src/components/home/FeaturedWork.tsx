import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects";

/** Asymmetric grid: two wide cards, then three narrow. */
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "sm:col-span-2 lg:col-span-2"];

export function FeaturedWork() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section aria-labelledby="featured-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="featured-title"
          index="01"
          label="Featured work"
          title="Security systems, built end to end."
          description="Detection pipelines, endpoint controls and security tooling — each with a write-up or its source."
          action={{ label: "All projects", href: "/work" }}
        />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70} className={SPANS[index] ?? "lg:col-span-2"}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
