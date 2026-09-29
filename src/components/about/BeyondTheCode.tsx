import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beyondTheCode } from "@/lib/about-content";

/** Abstract "path" contours — a journey motif, deliberately not a stock photo. */
function Contours() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-20,${190 - i * 14} C80,${150 - i * 18} 160,${210 - i * 12} 240,${160 - i * 16} S380,${120 - i * 10} 440,${140 - i * 14}`}
          fill="none"
          className={i === 4 ? "stroke-accent/70" : "stroke-foreground/10"}
          strokeWidth={i === 4 ? 1.4 : 1}
        />
      ))}
      <path
        d="M-20,134 C80,78 160,162 240,96 S380,80 440,84"
        fill="none"
        className="flow-line-slow stroke-accent"
        strokeWidth="1.4"
      />
      <circle cx="240" cy="96" r="4" className="fill-accent" />
      <circle cx="240" cy="96" r="10" className="fill-accent/15" />
    </svg>
  );
}

export function BeyondTheCode() {
  return (
    <section aria-labelledby="beyond-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <div className="card grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
          <div className="relative h-48 border-b border-line bg-[radial-gradient(80%_100%_at_60%_40%,var(--glow-violet),transparent_70%)] md:h-auto md:border-r md:border-b-0">
            <Contours />
          </div>
          <div className="p-8 sm:p-10">
            <SectionHeading id="beyond-title" index="06" label="Human side" title="Beyond the Code" />
            <p className="mt-5 text-base leading-relaxed text-foreground/75">{beyondTheCode}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
