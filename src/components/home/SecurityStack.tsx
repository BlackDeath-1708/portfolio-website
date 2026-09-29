import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eyebrow } from "@/components/ui/styles";
import { securityStack } from "@/lib/home-content";

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Tool chips with an evidence tooltip ("where it was used"), shown on hover and keyboard focus. */
export function SecurityStack() {
  return (
    <section aria-labelledby="stack-title" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <Reveal>
        <SectionHeading
          id="stack-title"
          index="03"
          label="Security stack"
          title="Tools, and where they were used."
          description="Hover or focus a tool to see the project or role it comes from."
        />
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {securityStack.map((category, i) => (
          <Reveal key={category.label} delay={i * 70}>
            <div className="card h-full p-5">
              <h3 className={`${eyebrow} font-semibold text-accent`}>{category.label}</h3>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {category.tools.map((tool) => {
                  const tipId = `tip-${slug(category.label)}-${slug(tool.name)}`;
                  return (
                    <li key={tool.name} className="group">
                      <button
                        type="button"
                        aria-describedby={tipId}
                        className="rounded-md border border-line bg-foreground/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-foreground/80 transition-colors hover:border-accent/50 hover:text-foreground focus-visible:border-accent"
                      >
                        {tool.name}
                      </button>
                      <span
                        id={tipId}
                        role="tooltip"
                        className="pointer-events-none absolute inset-x-0 bottom-full z-20 mb-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs leading-snug text-foreground/80 opacity-0 shadow-xl transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
                      >
                        {tool.usedIn}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
