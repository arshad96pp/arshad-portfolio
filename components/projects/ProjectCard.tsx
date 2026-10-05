import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";
import { cn } from "@/lib/cn";

/** Rounded image card: cover, bottom gradient, title + category, lime arrow. */
export function ProjectCard({
  project,
  large = false,
  as: Heading = "h3",
  priority = false,
}: {
  project: Project;
  large?: boolean;
  as?: "h2" | "h3";
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-elevated)]"
    >
      <div className={cn("relative", large ? "aspect-[16/10] sm:aspect-[16/8]" : "aspect-[4/3] sm:aspect-[16/11]")}>
        <div className="absolute inset-0 transition duration-700 group-hover:scale-[1.04]">
          <ProjectCover
            project={project}
            priority={priority}
            sizes={large ? "(min-width: 1300px) 1200px, 92vw" : "(min-width: 768px) 600px, 92vw"}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
          <div className="min-w-0">
            <Heading
              className={cn(
                "font-display truncate font-semibold",
                large ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl md:text-[1.75rem]",
              )}
            >
              {project.name}
            </Heading>
            <p className="label-xs mt-2 truncate">{project.label}</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition group-hover:rotate-45 sm:size-12">
            <ArrowUpRight aria-hidden className="size-4 sm:size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
