/** Feature names from the detector's write-up; the URL is a made-up example. */
const FEATURES = ["IP in URL", "Domain age", "Redirects"];

function Arrow() {
  return (
    <svg viewBox="0 0 4 18" className="h-4 w-1" aria-hidden>
      <line x1="2" y1="0" x2="2" y2="18" className="flow-line stroke-accent" strokeWidth="1.5" />
    </svg>
  );
}

/** Phishing Detector card visual: URL → feature extraction → classification → verdict. */
export function PhishingVisual() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-5" aria-hidden>
      <span className="max-w-full truncate rounded-md border border-line bg-background/80 px-3 py-1.5 font-mono text-[10px] text-foreground/80">
        http://login-verify.example.xyz/acc
      </span>
      <Arrow />
      <div className="flex flex-wrap justify-center gap-1.5">
        {FEATURES.map((feature) => (
          <span key={feature} className="rounded border border-line bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-foreground-muted">
            {feature}
          </span>
        ))}
      </div>
      <Arrow />
      <span className="rounded-md border border-violet/40 bg-violet/10 px-3 py-1 text-[11px] font-medium">
        Classifier + VirusTotal
      </span>
      <Arrow />
      <span className="rounded-md border border-warning/50 bg-warning/10 px-3 py-1 font-mono text-[10px] text-warning">
        verdict: phishing
      </span>
    </div>
  );
}
