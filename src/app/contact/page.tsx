import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { InfoGrid } from "@/components/ui/InfoGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { eyebrow } from "@/components/ui/styles";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about software engineering, cybersecurity, or research opportunities.",
};

const linkClass = "text-foreground transition-colors hover:text-accent";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Start a conversation."
        lead={
          <>
            <p>{siteConfig.openTo}.</p>
            <p className="mt-3 text-base text-foreground-muted">
              This site leans security-heavy because that&apos;s where my deepest work is, but I&apos;m applying just as
              seriously to general Software Engineering (SDE) roles — not only security-focused ones.
            </p>
          </>
        }
      />

      <section aria-label="Contact options" className="mx-auto grid max-w-6xl gap-5 px-6 pb-24 sm:pb-32 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card h-full p-6 sm:p-10">
            <h2 className={`${eyebrow} text-foreground-muted`}>Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex h-full flex-col gap-5">
            <InfoGrid
              items={[
                {
                  label: "Email",
                  wide: true,
                  value: (
                    <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                      {siteConfig.email}
                    </a>
                  ),
                },
                {
                  label: "GitHub",
                  value: (
                    <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      BlackDeath-1708 ↗
                    </a>
                  ),
                },
                {
                  label: "LinkedIn",
                  value: (
                    <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Profile ↗
                    </a>
                  ),
                },
                { label: "Location", value: siteConfig.location, wide: true },
                {
                  label: "Résumé",
                  wide: true,
                  value: (
                    <a href={siteConfig.resumeUrl} download className={linkClass}>
                      Download PDF ↓
                    </a>
                  ),
                },
              ]}
            />
            <div className="card flex items-start gap-3 px-5 py-4">
              <span className="status-dot mt-1.5 shrink-0" />
              <p className="font-mono text-xs leading-relaxed text-foreground/70">
                <span className="text-accent">Now —</span> {siteConfig.now}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
