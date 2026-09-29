"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsClient } from "@/hooks/useIsClient";
import { siteConfig } from "@/lib/site-config";
import { isForcedDarkRoute } from "@/lib/theme-routes";

const SCROLL_THRESHOLD = 24;

function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const forceDark = isForcedDarkRoute(pathname);
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
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
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        links,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, delay: 0.08, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: "power2.in" });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isClient]);

  return (
    <header
      data-theme={forceDark ? "dark" : undefined}
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4"
    >
      <div
        className={`glass pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full p-1.5 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg shadow-black/20" : "shadow-none"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.name}, home`}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 rounded-full pr-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/[0.07] font-mono text-[11px] font-semibold tracking-tight">
            SV
          </span>
          <span className="hidden text-sm font-medium lg:inline">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 sm:flex">
          {siteConfig.nav.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-foreground/[0.07] text-foreground"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="relative z-40 flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-full sm:hidden"
          >
            <span
              className={`h-px w-4 bg-foreground transition-transform ${isOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-foreground transition-transform ${isOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {isClient &&
        createPortal(
          <div
            ref={overlayRef}
            id="mobile-nav"
            data-theme={forceDark ? "dark" : undefined}
            className="invisible fixed inset-0 z-20 flex flex-col justify-center bg-background/95 px-8 opacity-0 backdrop-blur-xl sm:hidden"
          >
            <nav aria-label="Primary mobile" className="flex flex-col gap-1">
              {siteConfig.nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    if (el) linksRef.current[i] = el;
                  }}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActiveRoute(pathname, item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-1 text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent aria-[current=page]:text-accent"
                >
                  <span className="font-mono text-xs text-foreground-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
