import type { ReactNode } from "react";
import { eyebrow } from "@/components/ui/styles";

export type InfoItem = { label: string; value: ReactNode; wide?: boolean };

/** Bordered label/value card (the About page's Education pattern, generalised). */
export function InfoGrid({ items }: { items: InfoItem[] }) {
  return (
    <dl className="card grid gap-x-8 gap-y-5 p-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className={item.wide ? "sm:col-span-2" : undefined}>
          <dt className={`${eyebrow} text-foreground-muted`}>{item.label}</dt>
          <dd className="mt-1.5 text-sm text-foreground/85">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
