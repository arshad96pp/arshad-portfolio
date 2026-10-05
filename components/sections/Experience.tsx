import { Briefcase } from "lucide-react";
import { experience } from "@/data/experience";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="section-y">
      <div className="container-x">
        <Reveal as="h2" id="experience-title" className="font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold">
          Journey Through My Career
        </Reveal>
        <div aria-hidden className="mt-8 flex items-center gap-4">
          <span className="font-display text-xl">{site.since}</span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-display text-xl">Present</span>
        </div>

        <ol className="mt-8 divide-y divide-line">
          {experience.map((role) => (
            <Reveal
              as="li"
              key={`${role.start}-${role.title}`}
              y={20}
              className="grid grid-cols-1 items-start gap-2 py-6 sm:py-8 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-center gap-3 lg:col-span-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
                  <Briefcase aria-hidden className="size-4" />
                </span>
                <h3 className="font-display text-base font-medium sm:text-lg md:text-xl">{role.title}</h3>
              </div>
              <p className="label-xs pl-[52px] lg:col-span-3 lg:pl-0 lg:pt-3">
                <time>{role.start}</time> — <time>{role.end}</time>
              </p>
              <div className="pl-[52px] lg:col-span-5 lg:pl-0 lg:pt-2.5">
                {role.company && <p className="text-sm font-medium">{role.company}</p>}
                <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-muted">{role.summary}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
