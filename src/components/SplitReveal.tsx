"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Optional per-word classes, keyed by the word without trailing punctuation. */
  highlights?: Record<string, string>;
};

const TRAILING_PUNCTUATION = /^(.*?)([.,;:!?]*)$/;

/**
 * Splits text into words, each masked by an overflow-hidden wrapper, and
 * animates them up-and-into-place with a slight blur — the GSAP word-reveal
 * pattern for hero headlines. Skips the animation entirely under
 * prefers-reduced-motion.
 */
export function SplitReveal({ text, className, delay = 0, highlights }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const wordEls = container.querySelectorAll("[data-word]");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(wordEls, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.fromTo(
      wordEls,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.08,
        delay,
        ease: "power3.out",
      },
    );
  }, [delay, text]);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => {
        const [, core, punctuation] = word.match(TRAILING_PUNCTUATION) ?? [word, word, ""];
        const highlight = highlights?.[core];
        return (
          <span key={i} className="inline-block overflow-hidden pb-1">
            <span data-word className="inline-block">
              {highlight ? <span className={highlight}>{core}</span> : core}
              {punctuation}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </span>
  );
}
