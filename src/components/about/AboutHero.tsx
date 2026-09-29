import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/components/ui/styles";
import { aboutHero, aboutStats, heroAnnotations, identity } from "@/lib/about-content";
import { siteConfig } from "@/lib/site-config";

const HEADLINE = "I build at the intersection of security, systems and software.";
const HIGHLIGHTS = { security: "text-accent", systems: "text-accent", software: "text-violet" };
const IMAGE_ALT = "Illustration of Sudhareshan working at a laptop";

const TONE_VARS = { accent: "var(--accent)", violet: "var(--violet)", success: "var(--success)" } as const;
/** Left edge (% of the backdrop) of the label column the hairlines run to. */
const LABEL_COLUMN = 76;
const START_DELAY_MS = 600;
const STAGGER_MS = 180;

/**
 * Engineering-drawing annotations: an anchor dot on an object in the scene,
 * a hairline that draws out to a right-hand label column, then the label.
 */
function HeroAnnotations() {
  return (
    <>
      {heroAnnotations.map((note, i) => {
        const color = TONE_VARS[note.tone];
        const top = `${note.y}%`;
        const delay = START_DELAY_MS + i * STAGGER_MS;
        return (
          <div key={note.label}>
            <span
              className="annotate-fade absolute -mt-[5px] -ml-[5px] h-2.5 w-2.5 rounded-full border-[1.5px] bg-background/60"
              style={{ left: `${note.x}%`, top, borderColor: color, boxShadow: `0 0 10px ${color}`, animationDelay: `${delay}ms` }}
            />
            <span
              className="annotate-line absolute h-px"
              style={{
                left: `calc(${note.x}% + 6px)`,
                top,
                width: `calc(${LABEL_COLUMN - note.x}% - 12px)`,
                background: `linear-gradient(to right, ${color}, color-mix(in srgb, ${color} 30%, transparent))`,
                animationDelay: `${delay + 150}ms`,
              }}
            />
            <span
              className="annotate-fade absolute -translate-y-1/2 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-foreground uppercase [text-shadow:0_1px_10px_var(--background)]"
              style={{ left: `${LABEL_COLUMN}%`, top, animationDelay: `${delay + 500}ms` }}
            >
              {note.label}
            </span>
          </div>
        );
      })}
    </>
  );
}

/** Desktop: the illustration as a full-bleed backdrop on the right, fading into the page. */
function DesktopBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] lg:block">
      <Image
        src="/about-hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 60vw, 1px"
        className="object-cover object-[45%_30%] opacity-90 dark:opacity-60"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 25%, transparent 60%), linear-gradient(to top, var(--background) 0%, transparent 35%)",
        }}
      />
      <HeroAnnotations />
    </div>
  );
}

/** Phones/tablets: the same illustration as an image card below the intro (overlay omitted — too small to read). */
function MobileImageCard() {
  return (
    <div className="card relative mt-10 aspect-[4/3] overflow-hidden lg:hidden">
      <Image
        src="/about-hero-bg.jpg"
        alt={IMAGE_ALT}
        fill
        sizes="(min-width: 1024px) 1px, 100vw"
        className="object-cover object-[45%_30%] dark:opacity-85"
      />
    </div>
  );
}

export function AboutHero() {
  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden">
      <DesktopBackdrop />
      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40">
        <div className="max-w-xl lg:min-h-[480px]">
          <Reveal>
            <p className={`${eyebrow} flex items-center gap-3 text-accent`}>
              <span className="h-px w-6 bg-accent" />
              {aboutHero.eyebrow}
            </p>
          </Reveal>
          <h1 id="about-title" className="mt-6 text-[2.3rem] leading-[1.08] font-semibold tracking-tight sm:text-[3rem]">
            <SplitReveal text={HEADLINE} highlights={HIGHLIGHTS} delay={0.1} />
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/75">{aboutHero.intro}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={siteConfig.resumeUrl} download className={buttonPrimary}>
                  Download résumé <span aria-hidden>↓</span>
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/work" className={buttonSecondary}>
                  View my work <span aria-hidden>→</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <MobileImageCard />
        {/* Screen-reader description of the decorative desktop backdrop. */}
        <p className="sr-only">{IMAGE_ALT}.</p>

        <Reveal delay={200} className="mt-12">
          <div className="card grid overflow-hidden backdrop-blur-md lg:grid-cols-[1.1fr_1fr]">
            <div className="border-b border-line p-5 font-mono text-xs sm:p-6 sm:text-[13px] lg:border-r lg:border-b-0">
              <p>
                <span className="text-success">sudhareshan@about:~$</span> whoami
              </p>
              <dl className="mt-4 grid grid-cols-[4.25rem_1fr] gap-y-1.5 sm:grid-cols-[5.5rem_1fr]">
                {identity.map((row) => (
                  <div key={row.key} className="contents">
                    <dt className="text-foreground-muted">{row.key}</dt>
                    <dd className="flex items-baseline gap-2 text-foreground/85">
                      <span className="text-foreground-muted">:</span>
                      {row.value}
                      {row.isLive && <span className="status-dot ml-1 self-center" aria-hidden />}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4">
              {aboutStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col-reverse justify-center border-line p-5 ${
                    i % 2 === 0 ? "border-r" : "sm:border-r"
                  } ${i < 2 ? "border-b sm:border-b-0" : ""} last:border-r-0`}
                >
                  <dt className="mt-1 text-xs text-foreground-muted">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-semibold text-accent">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
