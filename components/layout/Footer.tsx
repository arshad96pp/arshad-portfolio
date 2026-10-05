import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Collaborate } from "@/components/sections/Collaborate";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { BackToTop } from "./BackToTop";

const pill =
  "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-muted transition hover:border-accent hover:text-fg sm:px-4";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <Collaborate />
      <footer className="border-t border-line bg-surface/40 py-10 md:py-12">
        <div className="mx-auto flex w-[min(94%,1200px)] flex-col items-center gap-6 text-center md:flex-row md:flex-wrap md:justify-between md:gap-5 md:text-left">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <span
              aria-hidden
              className="font-display grid size-9 place-items-center rounded-full bg-accent text-sm font-bold tracking-normal text-accent-ink"
            >
              {site.initial}
            </span>
            <span>
              <span className="block text-sm font-medium">{site.name}</span>
              <span className="label-xs block">{site.role}</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm md:gap-3">
            <a href={`mailto:${site.email}`} className={pill}>
              <Mail aria-hidden className="size-3.5" />
              {site.email}
            </a>
            <a href={site.phoneHref} className={pill}>
              <Phone aria-hidden className="size-3.5" />
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-fg px-3 py-2 text-bg transition hover:bg-accent hover:text-accent-ink sm:px-4"
            >
              Get in touch
              <ArrowUpRight aria-hidden className="size-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-full border border-line bg-surface text-muted transition hover:border-accent hover:text-accent"
            >
              <LinkedInIcon className="size-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <BackToTop />
          </div>
        </div>
        <p className="label-xs mt-8 px-4 text-center">
          © {year} — Designed &amp; developed by {site.name}
        </p>
      </footer>
    </>
  );
}
