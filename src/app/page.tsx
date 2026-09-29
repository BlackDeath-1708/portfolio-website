import { ClosingCta } from "@/components/home/ClosingCta";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { OdinShowcase } from "@/components/home/OdinShowcase";
import { OpenSource } from "@/components/home/OpenSource";
import { Process } from "@/components/home/Process";
import { SecurityStack } from "@/components/home/SecurityStack";
import { ThinkingInPublic } from "@/components/home/ThinkingInPublic";
import { Timeline } from "@/components/home/Timeline";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <OdinShowcase />
      <SecurityStack />
      <Process />
      <Timeline />
      <ThinkingInPublic />
      <OpenSource />
      <ClosingCta />
    </>
  );
}
