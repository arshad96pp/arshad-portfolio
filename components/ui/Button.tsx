import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
  external?: boolean;
  className?: string;
};

const styles = {
  primary: "bg-accent text-accent-ink shadow-[var(--shadow-primary)] hover:brightness-105",
  light: "bg-fg text-bg hover:bg-accent hover:text-accent-ink",
  outline: "border border-line bg-surface text-fg hover:border-accent hover:text-accent",
};

/** Pill button; the gap opens and the arrow turns on hover. */
export function Button({ href, children, variant = "primary", external, className }: Props) {
  const classes = cn(
    "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition-all duration-200 hover:gap-3",
    styles[variant],
    className,
  );
  const content = (
    <>
      {children}
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:rotate-45" />
    </>
  );

  // In-page anchors stay plain <a> so Lenis can smooth-scroll them.
  if (external || /^(#|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
