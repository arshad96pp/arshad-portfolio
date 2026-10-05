import { Code2, Monitor, Server, Database, Wrench } from "lucide-react";
import { skills } from "@/data/skills";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons = [Code2, Server, Monitor, Database, Wrench];

export function Toolkit({ label = "02 — Toolkit" }: { label?: string }) {
  return (
    <section aria-labelledby="toolkit-title" className="pt-16 sm:pt-24 md:pt-32">
      <div className="container-x">
        <SectionHeader id="toolkit-title" label={label} title="Tools I use" />
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {skills.map((group, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal
                as="li"
                key={group.id}
                y={20}
                delay={i * 0.06}
                className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-accent hover:bg-surface/60 sm:p-8 lg:p-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--gradient-glow)" }}
                />
                <div className="flex items-start justify-between gap-3">
                  <span className="label-xs leading-relaxed">{group.title}</span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted transition-all duration-300 group-hover:rotate-12 group-hover:border-accent group-hover:text-accent">
                    <Icon aria-hidden className="size-4" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl lg:text-xl">
                    {group.items.slice(0, 2).join(" · ")}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{group.note}</p>
                  {group.items.length > 2 && (
                    <p className="mt-3 text-sm leading-relaxed text-fg/70">{group.items.slice(2).join(" · ")}</p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
