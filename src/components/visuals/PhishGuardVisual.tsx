/** A sample of PhishGuard's real check types, rendered as an illustrative scan result. */
const FINDINGS = [
  { check: "Content-Security-Policy missing", severity: "High", tone: "text-warning border-warning/40" },
  { check: "Mixed content on HTTPS page", severity: "Medium", tone: "text-accent border-accent/40" },
  { check: "Cookie without Secure / HttpOnly", severity: "Medium", tone: "text-accent border-accent/40" },
];

/** PhishGuard card visual: a browser-extension scan panel. */
export function PhishGuardVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center p-5" aria-hidden>
      <div className="w-full max-w-[330px] overflow-hidden rounded-xl border border-line bg-background/85 shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-warning/80" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-success/80" />
          <span className="ml-2 flex-1 truncate rounded-md bg-foreground/[0.06] px-2 py-1 font-mono text-[10px] text-foreground-muted">
            https://example.com
          </span>
        </div>
        <ul className="flex flex-col gap-1.5 p-3">
          {FINDINGS.map((finding) => (
            <li
              key={finding.check}
              className="flex items-center justify-between gap-3 rounded-md bg-foreground/[0.03] px-2.5 py-1.5"
            >
              <span className="truncate text-[11px] text-foreground/80">{finding.check}</span>
              <span className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] ${finding.tone}`}>
                {finding.severity}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line px-3 py-2 font-mono text-[10px] text-foreground-muted">
          <span>9 checks per page</span>
          <span className="text-accent">remediation →</span>
        </div>
      </div>
    </div>
  );
}
