const STAGES = [
  { label: "Process", detail: "/proc" },
  { label: "Socket", detail: "netlink" },
  { label: "Packet", detail: "NFQUEUE" },
  { label: "Policy", detail: "JA3 · SNI" },
];

const VERDICTS = [
  { label: "allow", tone: "text-success border-success/40" },
  { label: "deny", tone: "text-warning border-warning/40" },
  { label: "throttle", tone: "text-accent border-accent/40" },
];

/** Endpoint Firewall card visual: Process → Socket → Packet → Policy, then a verdict. */
export function FirewallVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-5" aria-hidden>
      <div className="flex w-full max-w-[360px] items-center">
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="flex flex-1 items-center">
            <div className="flex w-full flex-col items-center gap-1.5">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
                  i === STAGES.length - 1 ? "border-accent/60 bg-accent/10" : "border-line bg-background/70"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${i === STAGES.length - 1 ? "bg-accent" : "bg-foreground/40"}`} />
              </span>
              <span className="text-[11px] font-medium">{stage.label}</span>
              <span className="font-mono text-[9px] text-foreground-muted">{stage.detail}</span>
            </div>
            {i < STAGES.length - 1 && (
              <svg viewBox="0 0 24 4" className="-mt-9 h-1 w-6 shrink-0">
                <line x1="0" y1="2" x2="24" y2="2" className="flow-line stroke-accent" strokeWidth="1.5" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {VERDICTS.map((verdict) => (
          <span key={verdict.label} className={`rounded border px-2 py-0.5 font-mono text-[10px] ${verdict.tone}`}>
            {verdict.label}
          </span>
        ))}
      </div>
    </div>
  );
}
