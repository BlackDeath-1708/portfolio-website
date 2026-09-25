"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Wraps an interactive element (button/link) and gives it a subtle
 * magnetic pull toward the cursor on hover, Apple-style. Resets with a
 * spring-like transition on mouse leave. Disabled under
 * prefers-reduced-motion via the CSS media query in globals.css.
 */
export function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function handleMouseLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic inline-block transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
