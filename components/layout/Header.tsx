"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="enter-up fixed left-1/2 top-3 z-50 flex w-[min(94%,1100px)] -translate-x-1/2 items-center justify-between rounded-full border border-line bg-surface/60 px-3 py-2 backdrop-blur-xl [--y:-30px] md:top-5">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-elevated/80 py-1.5 pl-1.5 pr-4"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden
            className="font-display grid size-8 place-items-center rounded-full bg-accent text-sm font-bold tracking-normal text-accent-ink"
          >
            {site.initial}
          </span>
          <span className="text-sm font-medium">{site.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition hover:bg-elevated hover:text-fg",
                isActive(item.href) ? "bg-elevated text-fg" : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent hover:text-accent-ink md:inline-flex"
          >
            Hire Me
            <ArrowUpRight aria-hidden className="size-4 transition group-hover:rotate-45" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-elevated/80 text-fg md:hidden"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease }}
            className="fixed left-1/2 top-16 z-40 w-[min(94%,1100px)] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-4 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base text-fg transition hover:bg-elevated",
                    isActive(item.href) && "bg-elevated",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-ink"
              >
                Hire Me <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
