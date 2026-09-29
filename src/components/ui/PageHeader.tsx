import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { eyebrow } from "@/components/ui/styles";

type Props = {
  label: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Inner-page header: mono label, animated display H1, optional lead and extras. */
export function PageHeader({ label, title, lead, children }: Props) {
  return (
    <header className="relative mx-auto max-w-6xl px-6 pt-36 pb-12 sm:pt-44">
      <p className={`${eyebrow} flex items-center gap-3 text-foreground-muted`}>
        <span className="h-px w-6 bg-accent" />
        {label}
      </p>
      <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
        <SplitReveal text={title} />
      </h1>
      {lead && (
        <Reveal delay={150}>
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">{lead}</div>
        </Reveal>
      )}
      {children && (
        <Reveal delay={250}>
          <div className="mt-8">{children}</div>
        </Reveal>
      )}
    </header>
  );
}
