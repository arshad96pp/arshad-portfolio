import { cn } from "@/lib/cn";

const enter = (d: number, dur = 0.8, y = 20) =>
  ({ "--d": `${d}s`, "--dur": `${dur}s`, "--y": `${y}px` }) as React.CSSProperties;

/** Opening block for inner pages: `[ label ]`, a large display heading, optional lead. */
export function PageIntro({
  label,
  title,
  children,
  aside,
  className,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative pb-16 pt-32 sm:pb-24 md:pb-32 md:pt-40", className)}>
      <div className={cn("container-x", Boolean(aside) && "grid gap-8 md:grid-cols-12 md:gap-16")}>
        <div className={cn(Boolean(aside) && "md:col-span-7")}>
          <p className="label-xs enter-up" style={enter(0.1)}>
            [ {label} ]
          </p>
          <h1
            className="font-display enter-up mt-4 text-balance text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95]"
            style={enter(0.2, 1, 40)}
          >
            {title}
          </h1>
          {children && (
            <div className="enter-up" style={enter(0.35, 0.9)}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="enter-up md:col-span-5 md:pt-2" style={enter(0.4, 0.9)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
