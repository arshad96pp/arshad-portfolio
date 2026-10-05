import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";

export function SelectedWork() {
  const [lead, ...rest] = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="selected-work" aria-labelledby="selected-work-title" className="section-y scroll-mt-24">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-4 sm:gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-xs">[ 02 — Selected Works ]</p>
            <h2 id="selected-work-title" className="font-display mt-3 text-[clamp(2rem,7vw,3.75rem)] font-semibold">
              Latest Works
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent md:self-auto"
          >
            See all projects
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6">
          <Reveal y={40}>
            <ProjectCard project={lead} large />
          </Reveal>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <Reveal key={p.slug} y={40}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
