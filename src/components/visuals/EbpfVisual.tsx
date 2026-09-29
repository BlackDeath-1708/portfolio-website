const LAYERS = [
  { label: "User space", detail: "daemon ◂ ring buffer", tone: "border-line bg-background/60" },
  { label: "Kernel space", detail: "BPF-LSM · per-process policy", tone: "border-violet/40 bg-violet/10" },
  { label: "XDP / eBPF", detail: "classify at line rate", tone: "border-accent/50 bg-accent/10" },
  { label: "Network interface", detail: "NIC", tone: "border-line bg-background/60" },
];

/** eBPF/XDP card visual: the layer stack a packet climbs, with a drop branch at XDP. */
export function EbpfVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center p-5 pr-16" aria-hidden>
      <div className="relative flex w-full max-w-[300px] flex-col gap-1.5">
        {LAYERS.map((layer) => (
          <div
            key={layer.label}
            className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 ${layer.tone}`}
          >
            <span className="text-[11px] font-medium">{layer.label}</span>
            <span className="truncate font-mono text-[9px] text-foreground-muted">{layer.detail}</span>
          </div>
        ))}
        <svg viewBox="0 0 12 150" className="absolute top-2 -left-5 h-[calc(100%-1rem)] w-3" preserveAspectRatio="none">
          <line x1="6" y1="150" x2="6" y2="0" className="flow-line stroke-accent" strokeWidth="1.5" />
        </svg>
        <span className="absolute top-[58%] -right-2 translate-x-full rounded border border-warning/40 px-1.5 py-0.5 font-mono text-[9px] text-warning">
          XDP_DROP
        </span>
      </div>
    </div>
  );
}
