import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Security tooling and full-stack software projects, including ODIN (real-time network threat detection), an eBPF/XDP kernel security tool, and PhishGuard.",
};

const caseStudyCount = projects.filter((project) => project.caseStudy).length;

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Security tooling and full-stack software."
        lead={`${projects.length} projects. ${caseStudyCount} have full case studies — the rest are focused summaries with source where it's public.`}
      />
      <section aria-label="All projects" className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
        <ProjectList projects={projects} />
      </section>
    </>
  );
}
