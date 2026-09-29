import Image from "next/image";
import { AboutIcon, type AboutIconName } from "@/components/about/icons";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eyebrow } from "@/components/ui/styles";
import { whoIAm } from "@/lib/about-content";
import { siteConfig } from "@/lib/site-config";

const PANEL_ICONS: Record<string, AboutIconName> = {
  Education: "cap",
  Focus: "target",
  Building: "layers",
  Availability: "send",
};

export function WhoIAm() {
  return (
    <section aria-labelledby="who-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading id="who-title" index="01" label="Story" title="Who I Am" />
      </Reveal>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="mb-8 flex items-center gap-4">
            <Image
              src={siteConfig.avatarUrl}
              alt={`Photo of ${siteConfig.name}`}
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full object-cover ring-2 ring-accent/40 ring-offset-2 ring-offset-background"
            />
            <div>
              <p className="font-semibold">{siteConfig.name}</p>
              <p className={`${eyebrow} mt-1 text-foreground-muted`}>{siteConfig.positioning}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-foreground/75">
            {whoIAm.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <dl className="card flex flex-col divide-y divide-line">
            {whoIAm.panel.map((item) => (
              <div key={item.label} className="p-5">
                <dt className={`${eyebrow} flex items-center gap-3 text-foreground-muted`}>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <AboutIcon name={PANEL_ICONS[item.label] ?? "target"} className="h-4 w-4" />
                  </span>
                  {item.label}
                </dt>
                {item.lines.map((line) => (
                  <dd key={line} className="mt-1 pl-12 text-sm text-foreground/85">
                    {line}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
