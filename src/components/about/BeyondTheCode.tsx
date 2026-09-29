import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beyondTheCode } from "@/lib/about-content";

const IMAGE_ALT =
  "Illustration of Sudhareshan at a glass whiteboard at dusk, sketching a network-detection pipeline and eBPF endpoint-security diagrams";

export function BeyondTheCode() {
  return (
    <section aria-labelledby="beyond-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <div className="card grid overflow-hidden lg:grid-cols-[1.35fr_1fr]">
          <div className="group relative aspect-[3/2] overflow-hidden border-b border-line lg:aspect-auto lg:min-h-[400px] lg:border-r lg:border-b-0">
            <Image
              src="/beyond-the-code.jpg"
              alt={IMAGE_ALT}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-[30%_center] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 hidden lg:block"
              style={{ backgroundImage: "linear-gradient(to right, transparent 70%, var(--surface) 100%)" }}
            />
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
