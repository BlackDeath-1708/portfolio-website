"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BOOT_COMMANDS, PROMPT, runCommand } from "@/components/terminal/commands";

type Entry = { id: number; command: string; lines: string[]; isError?: boolean };

let nextId = 0;
const bootEntries = (): Entry[] =>
  BOOT_COMMANDS.map((command) => ({ id: nextId++, command, ...runCommand(command) }));

/** Easter-egg terminal: a small nav button that opens a modal shell over real site data. */
export function Terminal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [entries, setEntries] = useState<Entry[]>(bootEntries);
  const [value, setValue] = useState("");

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [entries]);

  function open() {
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = runCommand(value);
    setValue("");
    if (result.clear) {
      setEntries([]);
      return;
    }
    setEntries((prev) => [...prev, { id: nextId++, command: value, lines: result.lines, isError: result.isError }]);
    if (result.navigate) router.push(result.navigate);
    if (result.close) close();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="hidden h-8 items-center rounded-full px-2.5 font-mono text-[11px] text-foreground/60 transition-colors hover:text-accent md:flex"
      >
        <span className="text-accent">_</span>&nbsp;terminal
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Terminal"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(640px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          <span className="ml-3 font-mono text-[11px] text-foreground-muted">sudhareshan@portfolio — zsh</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close terminal"
            className="ml-auto font-mono text-xs text-foreground-muted hover:text-foreground"
          >
            esc
          </button>
        </div>

        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="h-[340px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
        >
          <div aria-live="polite">
            {entries.map((entry) => (
              <div key={entry.id} className="mb-2">
                <p>
                  <span className="text-success">{PROMPT}</span> {entry.command}
                </p>
                {entry.lines.map((line, i) => (
                  <p key={i} className={`whitespace-pre-wrap ${entry.isError ? "text-warning" : "text-foreground/75"}`}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <label htmlFor="terminal-input" className="shrink-0 text-success">
              {PROMPT}
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent caret-accent outline-none"
            />
          </form>
        </div>
      </dialog>
    </>
  );
}
