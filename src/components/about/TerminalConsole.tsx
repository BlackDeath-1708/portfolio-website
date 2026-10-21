"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Tone = "cmd" | "dim" | "ok" | "info" | "warn" | "alert" | "safe";
type Line = { id: number; tone: Tone; text: string; stamp?: string };
type Step = { tone: Tone; text: string; delay: number };

const MAX_LINES = 15;
const TYPE_DELAY_MS = 38;
const LOOP_PAUSE_MS = 3200;
const BAR_WIDTH = 24;

const TONE_CLASS: Record<Tone, string> = {
  cmd: "text-[#e6edf3]",
  dim: "text-[#6e7781]",
  ok: "text-[#3fb950]",
  info: "text-[#8b949e]",
  warn: "text-[#f0b429]",
  alert: "text-[#ff6b6b] font-semibold",
  safe: "text-[#2dd4bf]",
};

const BOOT_COMMAND = "sudo ./sentinel --mode detect --iface eth0";
const TRIAGE_COMMAND = "sentinel triage --last 5m";

const BOOT: Step[] = [
  { tone: "ok", text: "[ ok ] attached kprobe/tcp_connect", delay: 260 },
  { tone: "ok", text: "[ ok ] attached tracepoint/sys_enter_execve", delay: 220 },
  { tone: "ok", text: "[ ok ] baseline model loaded · 1,284 flows", delay: 320 },
  { tone: "dim", text: "listening on eth0 · press ctrl+c to stop", delay: 500 },
];

const NOISE: string[] = [
  "flow 10.0.4.17:443 → 10.0.2.9:51822  tls1.3  ok",
  "flow 10.0.1.4:22 → 10.0.7.31:60114  ssh  ok",
  "dns  api.internal → 10.0.0.2  NOERROR  3ms",
  "exec pid=2210 /usr/bin/python3 (parent=cron)  ok",
  "flow 10.0.2.9:5432 → 10.0.4.17:44218  pgsql  ok",
  "exec pid=3307 /usr/sbin/nginx -t  ok",
];

const SCENARIOS: Step[][] = [
  [
    { tone: "warn", text: "beacon 10.0.4.23 → 185.220.x.x  every 60.0s ±0.4s", delay: 700 },
    { tone: "alert", text: "ALERT  T1071 C2 beaconing · host=web-04 · score 0.94", delay: 600 },
    { tone: "info", text: "ebpf: execve pid=4821 (curl | sh) traced to nginx", delay: 700 },
    { tone: "safe", text: "CONTAINED  web-04 isolated · ruleset pushed in 212ms", delay: 800 },
  ],
  [
    { tone: "warn", text: "dns  entropy 4.8 · 312 TXT queries/min → x7f.example", delay: 700 },
    { tone: "alert", text: "ALERT  T1048 DNS tunnelling · host=db-02 · score 0.91", delay: 600 },
    { tone: "info", text: "ebpf: socket owner pid=5190 (unsigned binary)", delay: 700 },
    { tone: "safe", text: "CONTAINED  egress blocked · pid 5190 killed", delay: 800 },
  ],
  [
    { tone: "warn", text: "smb  10.0.7.31 → 14 hosts in 9s (baseline: 2)", delay: 700 },
    { tone: "alert", text: "ALERT  T1021 lateral movement · host=hr-11 · score 0.88", delay: 600 },
    { tone: "info", text: "ebpf: credential access via lsass handle", delay: 700 },
    { tone: "safe", text: "CONTAINED  session revoked · host quarantined", delay: 800 },
  ],
];

const TRIAGE_RESULT: Step[] = [
  { tone: "info", text: "scanned 48,210 flows · 3 alerts · 3 contained", delay: 500 },
  { tone: "ok", text: "mean time to contain: 0.24s", delay: 400 },
];

const STATIC_TRANSCRIPT: { tone: Tone; text: string }[] = [
  { tone: "cmd", text: `$ ${BOOT_COMMAND}` },
  ...BOOT.map(({ tone, text }) => ({ tone, text })),
  ...SCENARIOS[0].map(({ tone, text }) => ({ tone, text })),
];

// Module-level so ids stay unique when Strict Mode runs the effect twice.
let nextLineId = 0;

const sleep =(ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const pad = (value: number, size = 2) => String(value).padStart(size, "0");
const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

function timestamp(): string {
  const now = new Date();
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
}

function progressBar(percent: number): string {
  const filled = Math.round((percent / 100) * BAR_WIDTH);
  return `[${"█".repeat(filled)}${"░".repeat(BAR_WIDTH - filled)}] ${pad(percent, 3)}%`;
}

export function TerminalConsole() {
  const [lines, setLines] = useState<Line[]>([]);
  const [stats, setStats] = useState({ flows: 0, alerts: 0, contained: 0 });
  const isReduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || isReduced) return;

    let isCancelled = false;
    let isVisible = true;
    let flows = 0;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(root);

    const wait = async (ms: number) => {
      await sleep(ms);
      while (!isVisible && !isCancelled) await sleep(200);
    };

    const push = (tone: Tone, text: string, stamp?: string): number => {
      const id = nextLineId++;
      if (isCancelled) return id;
      setLines((prev) => [...prev, { id, tone, text, stamp }].slice(-MAX_LINES));
      return id;
    };

    const update = (id: number, text: string) =>
      setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text } : line)));

    const bumpFlows = () => {
      flows += 40 + Math.floor(Math.random() * 90);
      setStats((prev) => ({ ...prev, flows }));
    };

    const typeCommand = async (command: string) => {
      const id = push("cmd", "$ ");
      for (let i = 1; i <= command.length; i++) {
        if (isCancelled) return;
        update(id, `$ ${command.slice(0, i)}`);
        await wait(TYPE_DELAY_MS + Math.random() * 40);
      }
      await wait(300);
    };

    const playSteps = async (steps: Step[]) => {
      for (const step of steps) {
        if (isCancelled) return;
        await wait(step.delay);
        push(step.tone, step.text, timestamp());
        if (step.tone === "alert") setStats((prev) => ({ ...prev, alerts: prev.alerts + 1 }));
        if (step.tone === "safe") setStats((prev) => ({ ...prev, contained: prev.contained + 1 }));
      }
    };

    const playProgress = async (label: string) => {
      const id = push("info", `${label} ${progressBar(0)}`);
      for (let percent = 0; percent <= 100; percent += 4) {
        if (isCancelled) return;
        update(id, `${label} ${progressBar(percent)}`);
        await wait(45);
      }
    };

    const playNoise = async (count: number) => {
      for (let i = 0; i < count; i++) {
        if (isCancelled) return;
        await wait(380 + Math.random() * 380);
        bumpFlows();
        push("dim", pick(NOISE), timestamp());
      }
    };

    const run = async () => {
      await typeCommand(BOOT_COMMAND);
      await playSteps(BOOT);

      for (let round = 0; !isCancelled; round++) {
        await playNoise(4);
        await playSteps(SCENARIOS[round % SCENARIOS.length]);
        await playNoise(2);
        if (round % SCENARIOS.length === SCENARIOS.length - 1) {
          await wait(600);
          await typeCommand(TRIAGE_COMMAND);
          await playProgress("analysing");
          await playSteps(TRIAGE_RESULT);
          await wait(LOOP_PAUSE_MS);
        }
      }
    };

    void run();

    return () => {
      isCancelled = true;
      observer.disconnect();
    };
  }, [isReduced]);

  const visibleLines: Line[] = isReduced
    ? STATIC_TRANSCRIPT.map((line, id) => ({ id, ...line }))
    : lines;

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label="Animated terminal showing a security sentinel detecting and containing threats"
      className="absolute inset-0 flex flex-col overflow-hidden bg-[#0b0e14] font-mono text-[11.5px] leading-[1.7] sm:text-xs"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#11151c] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-[11px] text-[#6e7781]">sentinel — zsh — 96×24</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-widest text-[#3fb950]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#3fb950]" />
          LIVE
        </span>
      </div>

      <div aria-hidden className="relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-4 py-3">
        {visibleLines.map((line, index) => {
          const isLast = index === visibleLines.length - 1;
          return (
            <div key={line.id} className={`flex gap-3 whitespace-nowrap ${TONE_CLASS[line.tone]}`}>
              {line.stamp ? <span className="hidden text-[#484f58] sm:inline">{line.stamp}</span> : null}
              <span className="min-w-0 truncate">
                {line.text}
                {isLast && !isReduced ? (
                  <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-pulse bg-[#e6edf3]" />
                ) : null}
              </span>
            </div>
          );
        })}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(to bottom, #fff 0 1px, transparent 1px 3px)" }}
        />
      </div>

      <div className="flex items-center gap-5 border-t border-white/10 bg-[#11151c] px-4 py-2 text-[10.5px] text-[#6e7781]">
        <span>
          flows <span className="text-[#c9d1d9]">{stats.flows.toLocaleString()}</span>
        </span>
        <span>
          alerts <span className="text-[#f0b429]">{stats.alerts}</span>
        </span>
        <span>
          contained <span className="text-[#2dd4bf]">{stats.contained}</span>
        </span>
        <span className="ml-auto hidden sm:inline">ebpf · 12 probes</span>
      </div>
    </div>
  );
}
