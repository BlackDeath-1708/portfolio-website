import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/components/ui/styles";
import { cta, systemStatus } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";

const TONES = { success: "text-success", accent: "text-accent" } as const;

/** System status card + closing call to action. */
export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-6xl px-6 pt-8 pb-24 sm:pb-32">
      <div className="grid gap-5 lg:grid-cols-[1fr_2.2fr]">
        <Reveal>
          <div className="card h-full p-6">
            <p className={`${eyebrow} text-foreground-muted`}>System status</p>
            <dl className="mt-6 flex flex-col gap-4">
              {systemStatus.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                  <dt className="flex items-center gap-2.5 text-foreground/75">
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${item.tone === "success" ? "bg-success" : "bg-accent"}`}
                    />
                    {item.label}
                  </dt>
                  <dd className={`font-mono text-xs ${TONES[item.tone]}`}>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card glow relative h-full overflow-hidden p-8 sm:p-12">
            <h2 id="cta-title" className="max-w-xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
              {cta.lead} <span className="text-gradient">{cta.highlight}</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-foreground/70">{cta.support}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={`mailto:${siteConfig.email}`} className={buttonPrimary}>
                  Start a conversation <span aria-hidden>↗</span>
                </a>
              </Magnetic>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                GitHub
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
