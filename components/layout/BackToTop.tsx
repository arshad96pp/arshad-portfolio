"use client";

import { ArrowUp } from "lucide-react";
import { lenisStore } from "@/lib/lenis";

export function BackToTop() {
  const toTop = () => {
    const lenis = lenisStore.get();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
    // Return focus to the top of the document for keyboard users.
    document.getElementById("top")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      className="group grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-accent hover:text-accent"
    >
      <ArrowUp aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
