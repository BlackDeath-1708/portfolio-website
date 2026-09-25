"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Magnetic } from "@/components/Magnetic";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = linksRef.current.filter(Boolean);
    if (!overlay) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (prefersReducedMotion) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.set(links, { y: 0, opacity: 1 });
        return;
      }
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.1, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: "power2.in" });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 z-30 w-full transition-[padding,background-color,backdrop-filter] duration-300 ${
        isScrolled
          ? "border-b border-black/5 bg-background/80 py-3 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/5"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          aria-label={`SV. — ${siteConfig.name}, Home`}
          className="font-mono text-sm font-semibold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          SV<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 text-sm sm:flex">
          {siteConfig.nav.map((item) => (
            <Magnetic key={item.href} strength={0.4}>
              <Link
                href={item.href}
                className="inline-block text-foreground/60 transition-colors hover:text-accent focus-visible:text-accent"
              >
                {item.label}
              </Link>
            </Magnetic>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative z-40 flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`h-px w-5 bg-foreground transition-transform ${isOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-transform ${isOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        ref={overlayRef}
        id="mobile-nav"
        className="invisible fixed inset-0 z-30 flex flex-col justify-center bg-background px-8 opacity-0 sm:hidden"
      >
        <nav aria-label="Primary mobile" className="flex flex-col gap-2">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
              onClick={() => setIsOpen(false)}
              className="text-5xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
