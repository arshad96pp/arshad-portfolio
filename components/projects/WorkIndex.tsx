"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Filter = "All" | ProjectCategory;

/** One large card, then a row of two — repeated. A trailing single card goes full width. */
function rows(list: Project[]) {
  const out: { large: boolean; items: Project[] }[] = [];
  for (let i = 0; i < list.length; ) {
    if (out.length % 2 === 0 || i === list.length - 1) {
      out.push({ large: true, items: [list[i]] });
      i += 1;
    } else {
      out.push({ large: false, items: list.slice(i, i + 2) });
      i += 2;
    }
  }
  return out;
}

export function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const counts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((c) => [c, projects.filter((p) => p.categories.includes(c)).length]),
      ) as Record<ProjectCategory, number>,
    [],
  );

  return (
    <section aria-label="Projects" className="pb-32">
      <div className="container-x">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-8 flex flex-wrap gap-1 self-start rounded-full md:mb-12"
        >
          {(["All", ...categories] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                filter === f ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full border border-line bg-elevated"
                  transition={{ duration: 0.4, ease }}
                />
              )}
              <span className="relative">
                {f}
                <span className="ml-1.5 font-mono text-[0.6875rem] text-muted">
                  {f === "All" ? projects.length : counts[f]}
                </span>
              </span>
            </button>
          ))}
        </div>

        <p role="status" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease }}
            className="grid gap-4 sm:gap-6"
          >
            {rows(visible).map((row, r) => (
              <div key={r} className={cn("grid gap-4 sm:gap-6", !row.large && "md:grid-cols-2")}>
                {row.items.map((p) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.9, ease }}
                  >
                    <ProjectCard project={p} large={row.large} as="h2" priority={r === 0} />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
