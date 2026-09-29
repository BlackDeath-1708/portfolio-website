import { CtaCard } from "@/components/CtaCard";
import { Reveal } from "@/components/Reveal";
import { eyebrow } from "@/components/ui/styles";
import { systemStatus } from "@/lib/home-content";

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
          <CtaCard />
        </Reveal>
      </div>
    </section>
  );
}
