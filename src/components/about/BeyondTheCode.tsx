import { TerminalConsole } from "@/components/about/TerminalConsole";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beyondTheCode } from "@/lib/about-content";

export function BeyondTheCode() {
  return (
    <section aria-labelledby="beyond-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <div className="card grid overflow-hidden lg:grid-cols-[1.35fr_1fr]">
          <div className="relative aspect-[3/2] overflow-hidden border-b border-line lg:aspect-auto lg:min-h-[400px] lg:border-r lg:border-b-0">
            <TerminalConsole />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <SectionHeading id="beyond-title" index="06" label="Human side" title="Beyond the Code" />
            <p className="mt-5 text-base leading-relaxed text-foreground/75">{beyondTheCode}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
