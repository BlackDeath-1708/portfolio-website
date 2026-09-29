import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/components/ui/styles";
import { aboutHero, aboutStats, heroCallouts, identity } from "@/lib/about-content";
import { siteConfig } from "@/lib/site-config";

const HEADLINE = "I build at the intersection of security, systems and software.";
const HIGHLIGHTS = { security: "text-accent", systems: "text-accent", software: "text-violet" };
const IMAGE_ALT = "Illustration of Sudhareshan working at a laptop";

const DOT_TONES = { accent: "bg-accent", violet: "bg-violet", success: "bg-success" } as const;
const CALLOUT_DELAY_MS = 180;

/** Floating glass callouts pinned to the illustration's empty areas — real work areas, real stacks. */
function HeroCallouts() {
  return (
    <>
      {heroCallouts.map((callout, i) => (
        <div
          key={callout.label}
          className={`absolute ${callout.position} animate-[callout-in_0.8s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none`}
          style={{ animationDelay: `${600 + i * CALLOUT_DELAY_MS}ms` }}
        >
          <div
            className="glass float-slow min-w-[220px] rounded-2xl px-4 py-3 shadow-2xl shadow-black/25"
            style={{ animationDelay: `${i * -2.3}s` }}
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${DOT_TONES[callout.tone]} shadow-[0_0_8px_currentColor]`} />
              <span className="font-mono text-[10px] tracking-[0.18em] text-foreground-muted uppercase">
                {callout.label}
              </span>
              {callout.tag && (
                <span className="ml-auto rounded-full border border-violet/40 px-1.5 py-px font-mono text-[9px] text-violet">
                  {callout.tag}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[13px] font-medium text-foreground">{callout.meta}</p>
          </div>
        </div>
      ))}
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
      <HeroCallouts />
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
