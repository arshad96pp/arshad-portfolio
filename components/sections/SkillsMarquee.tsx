import { marquee } from "@/data/skills";
import { Marquee } from "@/components/ui/Marquee";

export function SkillsMarquee() {
  const items = marquee.map((item) => (
    <span key={item} className="font-display flex items-center gap-12 text-2xl md:text-3xl">
      {item}
      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
    </span>
  ));

  return (
    <section aria-label="Services and technologies" className="border-y border-line bg-surface/40 py-8 backdrop-blur">
      <p className="sr-only">{marquee.join(", ")}</p>
      <div aria-hidden>
        <Marquee trackClassName="gap-12 pr-12">{items}</Marquee>
      </div>
    </section>
  );
}
