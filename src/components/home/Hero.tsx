import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/components/ui/styles";
import { heroStats } from "@/lib/home-content";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-4 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="relative z-10">
          <Reveal>
            <p className={`${eyebrow} font-semibold text-accent`}>{siteConfig.name}</p>
            <p className={`${eyebrow} mt-2 text-foreground-muted`}>{siteConfig.positioning}</p>
          </Reveal>

          <h1
            id="hero-title"
            className="mt-7 max-w-2xl text-[2.5rem] leading-[1.06] font-semibold tracking-tight sm:text-[3.4rem]"
          >
            <SplitReveal text={siteConfig.headline} delay={0.1} />
          </h1>

          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/70">
              {siteConfig.heroSupport}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/work" className={buttonPrimary}>
                  Explore my work <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={siteConfig.resumeUrl} download className={buttonSecondary}>
                  Download résumé
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-line pt-6">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col-reverse border-l border-line pl-4 first:border-l-0 first:pl-0"
                >
                  <dt className="mt-1 text-xs text-foreground-muted">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-semibold text-accent sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <HeroScene className="glow h-[280px] sm:h-[420px] lg:h-[580px]" />
      </div>
    </section>
  );
}
