import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export function Intro() {
  return (
    <section id="about" aria-label="Introduction" className="section-y relative scroll-mt-24">
      <div className="container-x grid gap-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-3">
          <p className="label-xs">[ 01 — About ]</p>
        </div>
        <Reveal
          as="p"
          className="font-display text-balance text-xl leading-snug sm:text-2xl md:col-span-9 md:text-3xl lg:text-4xl"
        >
          Hi, I’m <span className="text-accent">{site.name}</span> — a full stack developer building
          software since <span className="text-accent">{site.since}</span>. I work across{" "}
          <em className="font-light italic text-muted">web, backend and desktop.</em> React and Next.js
          interfaces, Fastify and Express.js APIs, real-time features and Electron apps — built to
          work from interface to backend.
        </Reveal>
      </div>
    </section>
  );
}
