import { Magnetic } from "@/components/Magnetic";
import { buttonPrimary, buttonSecondary } from "@/components/ui/styles";
import { cta } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";

/** "Let's build something worth securing." — the shared closing call to action. */
export function CtaCard({ id = "cta-title" }: { id?: string }) {
  return (
    <div className="card glow relative h-full overflow-hidden p-8 sm:p-12">
      <h2 id={id} className="max-w-xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
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
  );
}
