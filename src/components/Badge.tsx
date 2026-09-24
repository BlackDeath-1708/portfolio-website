type Props = {
  children: React.ReactNode;
};

export function Badge({ children }: Props) {
  return (
    <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
      {children}
    </span>
  );
}
