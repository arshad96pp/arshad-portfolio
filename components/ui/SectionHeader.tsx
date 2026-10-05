import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** `[ 02 — Label ]` eyebrow over a display heading. */
export function SectionHeader({
  label,
  title,
  id,
  as: Tag = "h2",
  className,
}: {
  label?: string;
  title: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      {label && <p className="label-xs">[ {label} ]</p>}
      <Reveal>
        <Tag
          id={id}
          className={cn(
            "font-display text-balance text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.05]",
            label && "mt-4",
          )}
        >
          {title}
        </Tag>
      </Reveal>
    </div>
  );
}
