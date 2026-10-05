"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const MotionLink = motion.create(Link);

/** Collaboration card + large closing line, shown above the footer on every page but Contact. */
export function Collaborate() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section aria-label="Work together" className="pb-16 sm:pb-24 md:pb-32">
      <div className="mx-auto w-[min(94%,1200px)]">
        <MotionLink
          href="/contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="group relative isolate block overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center md:py-20"
        >
          <div aria-hidden className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-glow)" }} />
          <p className="label-xs">[ Let’s collaborate ]</p>
          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl md:text-6xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted">
            Let’s work together to build it — from interface to backend.
          </p>
          <span className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-medium tracking-tight text-accent-ink shadow-[var(--shadow-primary)] transition-all duration-200 group-hover:gap-3 group-hover:brightness-105">
            Start a project
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:rotate-45" />
          </span>
        </MotionLink>

        <p className="font-display mt-16 text-balance text-4xl font-semibold text-muted/70 sm:text-5xl md:mt-24 md:text-7xl">
          Let’s build something <span className="block text-fg">great together.</span>
        </p>
      </div>
    </section>
  );
}
