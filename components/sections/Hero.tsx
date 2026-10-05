"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { site } from "@/data/site";

/** Entrance timing as CSS vars: delay, duration and rise distance. */
const enter = (d: number, dur = 0.8, y = 20) =>
  ({ "--d": `${d}s`, "--dur": `${dur}s`, "--y": `${y}px` }) as React.CSSProperties;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const bandY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative pb-16 pt-32 sm:pb-20 md:pb-24 md:pt-40"
    >
      <div className="container-x text-center">
        <p className="label-xs enter-up" style={enter(0.2)}>
          Hi, I’m {site.name} — a {site.role}
        </p>

        <motion.div style={reduce ? undefined : { scale }}>
          <h1
            id="hero-title"
            className="font-display enter-up mx-auto mt-4 max-w-5xl text-[clamp(2.4rem,9vw,6.5rem)] font-semibold leading-[0.95]"
            style={enter(0.3, 1, 40)}
          >
            Building Digital
            <br />
            <span className="font-light italic text-muted">Experiences</span>
            <span className="text-accent">.</span>
          </h1>
        </motion.div>

        <p
          className="enter-up mx-auto mt-6 max-w-136 text-balance text-base leading-relaxed text-muted md:mt-8 md:text-lg"
          style={enter(0.45, 0.9)}
        >
          I build websites, applications, and digital products—from interface to backend.
        </p>

        <div className="enter-up mt-8 flex flex-wrap justify-center gap-3" style={enter(0.55, 0.9)}>
          <Button href="#selected-work">View Projects</Button>
          <Button href="/contact" variant="outline">
            Let’s Talk
          </Button>
        </div>
      </div>

      {/* Moving background type + glow, with the scroll cue in front. */}
      <motion.div
        style={reduce ? undefined : { y: bandY }}
        className="container-x relative mt-8 grid h-32 place-items-center sm:mt-14 sm:h-[clamp(9rem,24vh,15rem)] md:mt-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[min(100%,46rem)] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
        />
        <div
          aria-hidden
          className="enter-fade pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
          style={enter(0.6, 1.2)}
        >
          <Marquee>
            <span className="font-display whitespace-nowrap pr-16 text-[clamp(3rem,12vw,11rem)] font-bold leading-none tracking-tighter text-fg/6">
              From interface to backend.
            </span>
            <span className="font-display whitespace-nowrap pr-16 text-[clamp(3rem,12vw,11rem)] font-bold leading-none tracking-tighter text-fg/6">
              From interface to backend.
            </span>
          </Marquee>
        </div>

        <a
          href="#about"
          aria-label="Scroll to introduction"
          className="enter-fade relative flex flex-col items-center gap-3 rounded-full px-3 py-2 text-muted transition-colors hover:text-fg"
          style={enter(1.2, 1)}
        >
          <span className="label-xs">Scroll</span>
          <ChevronDown aria-hidden className="nudge size-5" />
        </a>
      </motion.div>
    </section>
  );
}
