import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getNextProject, getProject, projectTech, projects, type Project } from "@/data/projects";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.name} — ${project.type}. ${project.summary}`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name} — Muhammed Arshad`, description: project.summary },
  };
}

const enter = (d: number, dur = 0.8, y = 20) =>
  ({ "--d": `${d}s`, "--dur": `${dur}s`, "--y": `${y}px` }) as React.CSSProperties;

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);
  const tech = projectTech(project);

  const meta = [
    { term: "Category", value: project.label },
    { term: "Role", value: project.role },
    { term: "Platform", value: project.platform ?? null },
    { term: tech.term, value: tech.items.join(" · ") },
  ].filter((m): m is { term: string; value: string } => Boolean(m.value));

  return (
    <article>
      <header className="pb-16 pt-32 sm:pb-24 md:pt-40">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="enter-up flex flex-wrap items-center gap-3 text-xs text-muted" style={enter(0.1)}>
            <Link href="/work" className="transition hover:text-fg">
              Works
            </Link>
            <span aria-hidden className="opacity-40">
              /
            </span>
            <span aria-current="page" className="text-fg/70">
              {project.name}
            </span>
          </nav>

          <div className="mt-6 grid items-end gap-8 sm:mt-8 md:grid-cols-12 md:gap-16">
            <h1
              className="font-display enter-up text-balance text-[clamp(2.5rem,10vw,7rem)] font-semibold leading-[0.95] md:col-span-8"
              style={enter(0.2, 1, 40)}
            >
              {project.name}
            </h1>
            <p className="enter-up max-w-md text-sm text-muted sm:text-base md:col-span-4 md:text-lg" style={enter(0.35, 0.9)}>
              {project.tagline}
            </p>
          </div>

          <div
            className="enter-up mt-8 flex flex-col items-start gap-6 border-t border-line pt-8 sm:mt-16 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between"
            style={enter(0.45, 0.9)}
          >
            <dl className="flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-16">
              {meta.map((m) => (
                <div key={m.term}>
                  <dt className="label-xs">{m.term}</dt>
                  <dd className="mt-2 text-base font-medium tracking-tight">{m.value}</dd>
                </div>
              ))}
            </dl>
            <Button href="/contact">Discuss a project</Button>
          </div>
        </div>
      </header>

      <div className="container-x pb-16 sm:pb-24 md:pb-32">
        <div className="enter-up group overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-elevated)]" style={enter(0.55, 1, 40)}>
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
            <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">
              <ProjectCover project={project} priority sizes="(min-width: 1300px) 1200px, 92vw" />
            </div>
          </div>
        </div>
      </div>

      <CaseStudyBody project={project} />

      <nav aria-label="Next project" className="pb-16 sm:pb-24 md:pb-32">
        <div className="container-x">
          <p className="label-xs mb-6">[ Next project ]</p>
          <Reveal y={40}>
            <ProjectCard project={next} large as="h2" />
          </Reveal>
        </div>
      </nav>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 md:grid-cols-12 md:gap-16">
      <div className="md:col-span-3">
        <h2 className="label-xs md:sticky md:top-28">[ {title} ]</h2>
      </div>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

const has = <T,>(list?: T[]): list is T[] => Boolean(list?.length);

function CaseStudyBody({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const sections: { title: string; body: React.ReactNode }[] = [];

  sections.push({
    title: "Overview",
    body: (
      <Reveal className="flex max-w-[62ch] flex-col gap-4 sm:gap-6">
        <p className="font-display text-xl leading-snug sm:text-2xl">{cs.overview[0]}</p>
        {cs.overview.slice(1).map((p) => (
          <p key={p} className="text-sm leading-relaxed text-muted sm:text-base md:text-lg">
            {p}
          </p>
        ))}
      </Reveal>
    ),
  });

  if (has(cs.context))
    sections.push({
      title: "Problem / Context",
      body: (
        <Reveal className="flex max-w-[62ch] flex-col gap-4 text-sm leading-relaxed text-muted sm:gap-6 sm:text-base md:text-lg">
          {cs.context.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      ),
    });

  if (has(cs.contribution))
    sections.push({
      title: "My contribution",
      body: (
        <ul className="divide-y divide-line border-y border-line">
          {cs.contribution.map((c, i) => (
            <Reveal as="li" key={c} y={20} delay={i * 0.04} className="flex gap-5 py-4 sm:py-5">
              <span className="label-xs pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-base sm:text-lg">{c}</span>
            </Reveal>
          ))}
        </ul>
      ),
    });

  if (has(cs.features))
    sections.push({
      title: "Key features",
      body: (
        <ul className={cn("grid gap-4 sm:grid-cols-2 sm:gap-6", cs.features.length % 3 === 0 && "lg:grid-cols-3")}>
          {cs.features.map((f, i) => (
            <Reveal as="li" key={f.title} y={20} delay={(i % 3) * 0.06}>
              <Card index={i} title={f.title} body={f.body} />
            </Reveal>
          ))}
        </ul>
      ),
    });

  if (has(cs.implementation) || has(cs.flow))
    sections.push({
      title: "Technical implementation",
      body: (
        <div className="flex flex-col gap-10">
          {has(cs.flow) && <Flow steps={cs.flow} />}
          {has(cs.implementation) && (
            <dl className="divide-y divide-line border-y border-line">
              {cs.implementation.map((item) => (
                <Reveal key={item.title} y={20} className="grid gap-2 py-6 md:grid-cols-9 md:gap-8">
                  <dt className="font-display text-lg font-medium md:col-span-3 md:text-xl">{item.title}</dt>
                  <dd className="max-w-[58ch] text-sm leading-relaxed text-muted sm:text-base md:col-span-6">{item.body}</dd>
                </Reveal>
              ))}
            </dl>
          )}
        </div>
      ),
    });

  if (has(cs.challenges))
    sections.push({
      title: "Challenges",
      body: (
        <ol className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {cs.challenges.map((item, i) => (
            <Reveal as="li" key={item.title} y={20} delay={i * 0.06}>
              <Card index={i} title={item.title} body={item.body} />
            </Reveal>
          ))}
        </ol>
      ),
    });

  if (has(cs.outcome))
    sections.push({
      title: "Outcome",
      body: (
        <Reveal>
          {cs.outcome.map((p) => (
            <p key={p} className="font-display max-w-[30ch] text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
              {p}
            </p>
          ))}
        </Reveal>
      ),
    });

  const brief = sections.length <= 2;

  return (
    <div className="container-x flex flex-col gap-16 pb-16 sm:gap-24 sm:pb-24 md:pb-32">
      {sections.map((s) => (
        <Section key={s.title} title={s.title}>
          {s.body}
        </Section>
      ))}
      {brief && (
        <Reveal className="flex flex-wrap gap-3 md:pl-[calc(25%+1rem)]">
          <Button href="/contact">Ask me about it</Button>
          <Button href="/work/time-tact" variant="outline">
            Read the Time Tact case study
          </Button>
        </Reveal>
      )}
    </div>
  );
}

function Card({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="group relative isolate h-full overflow-hidden rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-accent hover:bg-surface/60 sm:p-8">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "var(--gradient-glow)" }}
      />
      <span className="label-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="font-display mt-6 text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

/** Three-step data-flow diagram. */
function Flow({ steps }: { steps: { label: string; body: string }[] }) {
  return (
    <Reveal>
      <ol aria-label="Data flow" className="grid gap-4 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => (
          <li key={step.label} className="relative flex flex-col gap-3 rounded-2xl border border-line bg-surface/40 p-6">
            <span className="label-xs flex items-center gap-2">
              <span aria-hidden className={cn("size-1.5 rounded-full", i === 1 ? "bg-accent" : "bg-fg/40")} />
              Step {i + 1}
            </span>
            <span className="font-display text-xl font-semibold">{step.label}</span>
            <span className="text-sm leading-relaxed text-muted">{step.body}</span>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -bottom-4 left-6 z-10 grid size-7 rotate-90 place-items-center rounded-full bg-accent text-accent-ink md:-right-[1.375rem] md:bottom-auto md:left-auto md:top-6 md:rotate-0"
              >
                <ArrowRight className="size-3.5" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
