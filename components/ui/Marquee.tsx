import { cn } from "@/lib/cn";

/**
 * Seamless marquee: two identical tracks, each translating -50% over 40s.
 * Each track repeats `items` twice so it is always wider than the viewport.
 */
export function Marquee({
  children,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      {[0, 1].map((n) => (
        <div key={n} aria-hidden={n === 1 || undefined} className={cn("flex shrink-0 animate-marquee", trackClassName)}>
          {children}
          {children}
        </div>
      ))}
    </div>
  );
}
