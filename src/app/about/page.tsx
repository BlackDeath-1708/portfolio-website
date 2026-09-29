import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { BeyondTheCode } from "@/components/about/BeyondTheCode";
import { CurrentlyExploring } from "@/components/about/CurrentlyExploring";
import { HowIThink } from "@/components/about/HowIThink";
import { Journey } from "@/components/about/Journey";
import { WhatIWorkOn } from "@/components/about/WhatIWorkOn";
import { WhoIAm } from "@/components/about/WhoIAm";
import { CtaCard } from "@/components/CtaCard";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

const TITLE = `About — ${siteConfig.name} | ${siteConfig.positioning}`;
const DESCRIPTION =
  "Learn about Sudhareshan V, his approach to cybersecurity, software engineering, security research, and the systems he builds.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: "profile",
  },
};

/** Who I am → how I think → what I build → where I'm going → let's build. */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoIAm />
      <HowIThink />
      <WhatIWorkOn />
      <Journey />
      <CurrentlyExploring />
      <BeyondTheCode />
      <section aria-labelledby="about-cta-title" className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
        <Reveal>
          <CtaCard id="about-cta-title" />
        </Reveal>
      </section>
    </>
  );
}
