type Props = {
  children: React.ReactNode;
};

export function Badge({ children }: Props) {
  return (
    <span className="inline-block rounded-md border border-line bg-foreground/[0.03] px-2 py-1 font-mono text-[11px] leading-none text-foreground/75">
      {children}
    </span>
  );
}
