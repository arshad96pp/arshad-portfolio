import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

/** Facts taken directly from the portfolio's own content — nothing estimated. */
const stats = [
  { value: String(projects.length).padStart(2, "0"), label: "Projects in this portfolio" },
  { value: String(site.focus.length).padStart(2, "0"), label: site.focus.join(" · ") },
  { value: String(site.since), label: "Building software since" },
];

export function Stats() {
  return (
    <section aria-label="At a glance" className="border-y border-line bg-surface/30 py-12 sm:py-16 md:py-24">
      <dl className="container-x grid gap-6 sm:grid-cols-3 sm:gap-8 sm:divide-x sm:divide-line">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            y={20}
            delay={i * 0.1}
            className="flex flex-col-reverse items-center gap-2 sm:gap-3 sm:px-6 md:px-8"
          >
            <dt className="label-xs max-w-[24ch] text-center leading-relaxed">{s.label}</dt>
            <dd className="font-display text-4xl font-semibold leading-none tracking-tighter tabular-nums sm:text-5xl md:text-7xl">
              {s.value}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
