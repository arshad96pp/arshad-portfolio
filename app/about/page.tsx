import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Toolkit } from "@/components/sections/Toolkit";
import { Experience } from "@/components/sections/Experience";
import { Button } from "@/components/ui/Button";
import { education, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammed Arshad is a full stack developer in India working across web applications, backend services, REST APIs, real-time features and Electron desktop apps.",
  alternates: { canonical: "/about" },
};

const areas = [
  { label: "Web", value: "Applications · Dashboards" },
  { label: "Backend", value: "REST APIs · Real-time" },
  { label: "Desktop", value: "Electron · Cross-platform" },
  { label: "Content", value: "Payload CMS · API-driven" },
];

const interests = [
  {
    title: "Building complete applications",
    body: "Owning a feature end to end — the interface, the API it talks to and the data behind it.",
  },
  {
    title: "Solving hard problems",
    body: "Offline data, sync, background performance — the parts that don’t show up in a mockup.",
  },
  {
    title: "Working across platforms",
    body: "Web, backend services, real-time features and cross-platform desktop — following the problem wherever it lives.",
  },
  {
    title: "Exploring technologies",
    body: "Picking up new tools when they genuinely make the product better.",
  },
  {
    title: "Building for growth",
    body: "Clear component architecture, state management and API boundaries that keep a product easy to extend.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="01 — About"
        title={
          <>
            From interface <span className="font-light italic text-muted">to backend</span>
            <span className="text-accent">.</span>
          </>
        }
        aside={
          <>
            <h2 className="font-display text-balance text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
              A {site.role} based in <span className="text-accent">{site.location}</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
              I’m {site.name}. I work across the frontend and the backend — web applications, APIs,
              real-time features and cross-platform desktop apps.
            </p>
          </>
        }
      >
        <p className="label-xs mt-6">I’m a full stack developer based in {site.location}</p>
      </PageIntro>

      <section aria-label="What I work on" className="border-y border-line bg-surface/30 py-12 sm:py-16 md:py-24">
        <dl className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {areas.map((a, i) => (
            <Reveal key={a.label} y={20} delay={i * 0.06} className="flex min-w-0 flex-col-reverse gap-2">
              <dd className="font-display text-base font-medium sm:text-lg lg:text-2xl">{a.value}</dd>
              <dt className="label-xs">{a.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      <section aria-label="Story" className="section-y">
        <div className="container-x grid gap-6 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <p className="label-xs">[ Story ]</p>
          </div>
          <Reveal className="flex max-w-[62ch] flex-col gap-4 text-sm leading-relaxed text-muted sm:gap-6 sm:text-base md:col-span-9 md:text-lg">
            <p className="font-display text-xl leading-snug text-fg sm:text-2xl">
              I’ve worked as a software developer since {site.since}. Today I’m at{" "}
              <span className="text-accent">Pixbit Solutions</span>, building production applications
              across the stack — interfaces, APIs and the services behind them.
            </p>
            <p>
              Before that I was at Trogon Media, shipping client-facing web applications, application
              features and REST APIs.
            </p>
            <p>
              The projects I enjoy most have real problems inside them: a cross-platform Electron app
              that has to keep its tracking data intact when the network drops, a CRM where role-based
              access has to run through a Fastify API and the React dashboards on top of it, or
              products like Acute and Moi Wash where the application, the dashboard and the backend
              all have to fit together.
            </p>
            <p>
              My usual toolkit is React and Next.js on the client; Fastify and Express.js on the
              server, with Payload CMS where content needs managing; Socket.io for real-time work; and
              Electron.js for the desktop. I care most about the parts people rarely see but always
              feel — structure, state, data flow and performance.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/work">See my work</Button>
              <Button href="/contact" variant="outline">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Toolkit />

      <section aria-labelledby="interests-title" className="pt-16 sm:pt-24 md:pt-32">
        <div className="container-x">
          <p className="label-xs">[ 03 — What I enjoy ]</p>
          <Reveal as="h2" id="interests-title" className="font-display mt-4 text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.05]">
            The work I gravitate to
          </Reveal>
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {interests.map((item, i) => (
              <Reveal as="li" key={item.title} y={20} className="grid gap-2 py-6 sm:py-8 md:grid-cols-12 md:gap-8">
                <span className="label-xs md:col-span-1 md:pt-2">0{i + 1}</span>
                <h3 className="font-display text-xl font-medium md:col-span-5 md:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted md:col-span-6 md:text-base">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Experience />

      <section aria-labelledby="education-title" className="pb-16 sm:pb-24 md:pb-32">
        <div className="container-x">
          <Reveal as="h2" id="education-title" className="font-display text-[clamp(1.75rem,6vw,3rem)] font-semibold">
            Education
          </Reveal>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {education.map((e) => (
              <Reveal as="li" key={e.title} y={20} className="grid gap-2 py-6 sm:py-8 lg:grid-cols-12 lg:items-center lg:gap-8">
                <h3 className="font-display text-base font-medium sm:text-lg md:text-xl lg:col-span-4">{e.title}</h3>
                <p className="label-xs lg:col-span-3">{e.status}</p>
                <p className="text-sm font-medium lg:col-span-5">{e.institution}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
