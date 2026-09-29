import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { InfoGrid } from "@/components/ui/InfoGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { eyebrow } from "@/components/ui/styles";
import { research } from "@/lib/research";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Ongoing network security research as a research intern at CAIR, DRDO, outside of shipped projects.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        label="Research"
        title="Network security research, in progress."
        lead="Applied research outside of shipped projects. The work itself is confidential — what can be shared is below."
      />

      <section aria-label="Research entries" className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 sm:pb-32">
        {research.map((entry) => (
          <Reveal key={entry.slug}>
            <div className="card glow relative overflow-hidden p-6 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className={`${eyebrow} text-accent`}>{entry.period}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">{entry.title}</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-warning/40 px-3 py-1 font-mono text-[11px] text-warning">
                  <span aria-hidden>●</span> Confidential
                </span>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <InfoGrid
                  items={[
                    { label: "Organisation", value: entry.org, wide: true },
                    { label: "Location", value: entry.location },
                    { label: "Period", value: entry.period },
                    { label: "Area", value: entry.area },
                    { label: "Details", value: entry.description },
                  ]}
                />
                <div className="card p-6">
                  <h3 className={`${eyebrow} text-foreground-muted`}>Tools in use</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {entry.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="card flex items-start gap-3 px-5 py-4">
            <span className="status-dot mt-1.5 shrink-0" />
            <p className="font-mono text-xs leading-relaxed text-foreground/70 sm:text-sm">
              <span className="text-accent">Now —</span> {siteConfig.now}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
