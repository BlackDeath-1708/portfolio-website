const MAX_LAYERS = 4;

/**
 * Neutral fallback visual for projects without a bespoke one: the project's
 * real stack drawn as connected layers — nothing invented.
 */
export function StackVisual({ stack }: { stack: string[] }) {
  const layers = stack.slice(0, MAX_LAYERS);

  return (
    <div className="flex h-full w-full items-center justify-center p-5" aria-hidden>
      <div className="flex w-full max-w-[240px] flex-col items-center">
        {layers.map((layer, i) => (
          <div key={layer} className="flex w-full flex-col items-center">
            <span
              className={`w-full rounded-lg border px-3 py-2 text-center font-mono text-[11px] ${
                i === 0 ? "border-accent/50 bg-accent/10 text-foreground" : "border-line bg-background/70 text-foreground/75"
              }`}
            >
              {layer}
            </span>
            {i < layers.length - 1 && (
              <svg viewBox="0 0 4 14" className="h-3.5 w-1">
                <line x1="2" y1="0" x2="2" y2="14" className="flow-line stroke-accent/80" strokeWidth="1.5" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
