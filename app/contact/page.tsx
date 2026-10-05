import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactForm } from "@/components/ui/ContactForm";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Muhammed Arshad — full stack developer working across web, backend and desktop applications.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="Contact"
        title={
          <>
            Have a project <span className="font-light italic text-muted">in mind</span>
            <span className="text-accent">?</span>
          </>
        }
      >
        <p className="mt-6 max-w-xl text-sm text-muted sm:text-base md:text-lg">
          Tell me what you’re building. I’ll get back to you about how I can help — from interface to
          backend.
        </p>
      </PageIntro>

      <section aria-label="Contact details and form" className="pb-16 sm:pb-24 md:pb-32">
        <div className="container-x grid gap-6 md:grid-cols-12 md:gap-6">
          <Reveal className="flex flex-col gap-4 sm:gap-6 md:col-span-5">
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <p className="label-xs">Email</p>
              <CopyEmail className="font-display mt-4 text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium" />
              <p className="mt-3 text-sm text-muted">
                Click to copy, or{" "}
                <a href={`mailto:${site.email}`} className="text-fg underline decoration-fg/30 underline-offset-4 transition hover:decoration-accent">
                  open in your mail app
                </a>
                .
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-1 lg:grid-cols-2">
              <a
                href={site.phoneHref}
                className="group rounded-3xl border border-line bg-surface p-6 transition hover:border-accent sm:p-8"
              >
                <span className="flex items-center justify-between">
                  <span className="label-xs">Phone</span>
                  <Phone aria-hidden className="size-4 text-muted transition group-hover:text-accent" />
                </span>
                <span className="mt-4 block text-base font-medium">{site.phone}</span>
              </a>
              <a
                href={site.linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-line bg-surface p-6 transition hover:border-accent sm:p-8"
              >
                <span className="flex items-center justify-between">
                  <span className="label-xs">LinkedIn</span>
                  <LinkedInIcon className="size-4 text-muted transition group-hover:text-accent" />
                </span>
                <span className="mt-4 block text-base font-medium">View profile ↗</span>
              </a>
            </div>
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <p className="label-xs">Based in</p>
              <p className="mt-4 text-base font-medium">{site.location}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-line bg-surface p-6 sm:p-8 md:col-span-7 md:p-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
