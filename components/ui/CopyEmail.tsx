"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { site } from "@/data/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Email address that copies to the clipboard, falling back to mailto. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn("group inline-flex items-center gap-3 text-left", className)}
      aria-label={`Copy email address ${site.email}`}
    >
      <span className="break-all decoration-accent underline-offset-4 group-hover:underline">{site.email}</span>
      <span
        aria-hidden
        className="relative inline-flex h-6 min-w-6 items-center justify-center overflow-hidden text-muted transition-colors group-hover:text-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="ok"
              className="label-xs flex items-center gap-1 text-accent"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <Check className="size-3.5" /> Copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <Copy className="size-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
