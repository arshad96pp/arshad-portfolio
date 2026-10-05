import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Abstract, typographic project cover. These are deliberately not
 * screenshots — they're compositions that hint at the product's shape.
 * If `project.image` is set, the real image is used instead.
 */
export function ProjectCover({
  project,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 66vw, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { cover } = project;

  return (
    <div
      className={cn("@container relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor: cover.tone }}
    >
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute left-1/2 top-[40%] h-[90%] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-70"
            style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
          />
          <GridLines />
          {cover.variant === "desktop" && <DesktopComposition project={project} />}
          {cover.variant === "dashboard" && <DashboardComposition project={project} />}
          {cover.variant === "browser" && <BrowserComposition project={project} />}
          {cover.variant === "roles" && <RolesComposition project={project} />}
          {cover.variant === "cart" && <CartComposition project={project} />}
          {cover.variant === "chat" && <ChatComposition project={project} />}
          {cover.variant === "mark" && <MarkComposition project={project} />}
        </div>
      )}
    </div>
  );
}

function GridLines() {
  return (
    <div
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
        backgroundSize: "12.5% 16.666%",
        maskImage: "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
      }}
    />
  );
}

function Monogram({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute select-none font-display font-semibold leading-none tracking-[-0.07em] text-fg/[0.03]",
        className,
      )}
    >
      {text}
    </span>
  );
}

/* Time Tact — a desktop window with an activity timeline. */
function DesktopComposition({ project }: { project: Project }) {
  const rows = [
    [18, 22, 9, 31],
    [8, 40, 14, 12],
    [26, 12, 30, 6],
    [12, 18, 10, 38],
  ];
  return (
    <>
      <Monogram text={project.cover.monogram} className="-bottom-[6%] -right-[3%] text-[38cqw]" />
      <div className="absolute inset-x-[7%] top-[8%] bottom-[34%] sm:bottom-[28%] flex flex-col border border-fg/15 bg-bg/90 rounded-xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:inset-x-[10%]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2 rounded-full bg-fg/20" />
          <span className="size-2 rounded-full bg-fg/20" />
          <span className="size-2 rounded-full bg-fg/20" />
          <span className="label-xs tracking-[0.12em] ml-3 text-[0.625rem] text-muted/70">time tact</span>
          <span className="ml-auto flex items-center gap-1.5 text-[0.625rem] text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="label-xs tracking-[0.12em] text-[0.625rem]">tracking</span>
          </span>
        </div>
        <div className="flex flex-1">
          <div className="hidden w-[22%] flex-col gap-2 border-r border-line p-3 sm:flex">
            {[70, 52, 60, 44].map((w, i) => (
              <span key={i} className="h-1.5 bg-fg/10" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-[7%] p-[5%]">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[clamp(1.25rem,4.4cqw,2.75rem)] leading-none tracking-tight text-fg/85">
                06:42:18
              </span>
              <span className="label-xs tracking-[0.12em] text-[0.625rem] text-muted/70">active</span>
            </div>
            <div className="flex flex-col gap-2">
              {rows.map((row, r) => (
                <div key={r} className="flex h-2.5 gap-1">
                  {row.map((w, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-full",
                        (r + i) % 3 === 0 ? "bg-accent/80" : i % 2 ? "bg-fg/8" : "bg-fg/20",
                      )}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="aspect-[16/10] flex-1 border border-line bg-fg/[0.04]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Shared window chrome for the abstract compositions. */
function Frame({
  label,
  className,
  children,
  dots = true,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
  dots?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col border border-fg/15 bg-bg/90 rounded-xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
        {dots && (
          <>
            <span className="size-2 rounded-full bg-fg/20" />
            <span className="size-2 rounded-full bg-fg/20" />
            <span className="size-2 rounded-full bg-fg/20" />
          </>
        )}
        <span className={cn("label-xs tracking-[0.12em] text-[0.625rem] text-muted/70", dots && "ml-3")}>{label}</span>
      </div>
      {children}
    </div>
  );
}

/* Acute — sidebar navigation and a dashboard of panels. */
function DashboardComposition({ project }: { project: Project }) {
  return (
    <>
      <Monogram text={project.cover.monogram} className="-bottom-[8%] -left-[2%] text-[40cqw]" />
      <Frame label={project.name.toLowerCase()} className="absolute inset-x-[7%] top-[8%] bottom-[34%] sm:bottom-[28%] sm:inset-x-[10%]">
        <div className="flex flex-1">
          <div className="hidden w-[20%] flex-col gap-2.5 border-r border-line p-3 sm:flex">
            {[64, 48, 72, 40, 56].map((w, i) => (
              <span key={i} className={cn("h-1.5", i === 1 ? "bg-accent/80" : "bg-fg/10")} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-[4%] p-[4%]">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex aspect-[16/9] flex-col justify-end gap-1.5 border border-line p-2">
                  <span className={cn("h-2 w-1/2", i === 0 ? "bg-fg/50" : "bg-fg/25")} />
                  <span className="h-1 w-3/4 bg-fg/10" />
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col border border-line">
              {[0, 1, 2, 3, 4].map((r) => (
                <div key={r} className="flex flex-1 items-center gap-3 border-b border-line px-3 last:border-b-0">
                  <span className={cn("size-1.5", r === 2 ? "bg-accent" : "bg-fg/25")} />
                  <span className="h-1.5 bg-fg/15" style={{ width: `${[38, 30, 44, 26, 34][r]}%` }} />
                  <span className="ml-auto h-1.5 w-[14%] bg-fg/[0.07]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    </>
  );
}

/* Web projects — a browser frame with a typographic page. */
function BrowserComposition({ project }: { project: Project }) {
  const host = project.name.includes(".") ? project.name.toLowerCase() : "web application";
  return (
    <>
      <Monogram text={project.cover.monogram} className="-right-[2%] -top-[14%] text-[52cqw]" />
      <Frame label={host} className="absolute inset-x-[7%] top-[8%] bottom-[34%] sm:bottom-[28%] sm:inset-x-[12%]">
        <div className="flex flex-1 flex-col justify-between gap-[6%] p-[6%]">
          <div className="flex items-center justify-between">
            <span className="h-2 w-[18%] bg-fg/40" />
            <span className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-6 bg-fg/15" />
              ))}
            </span>
          </div>
          <span className="font-display font-semibold leading-[0.85] tracking-[-0.06em] text-fg/85 text-[13cqw]">
            {project.name}
          </span>
          <div className="grid grid-cols-3 gap-2">
            <span className="aspect-[4/3] bg-fg/[0.06]" />
            <span className="aspect-[4/3] bg-accent/70" />
            <span className="aspect-[4/3] bg-fg/[0.06]" />
          </div>
        </div>
      </Frame>
    </>
  );
}

/* CRM — the same system seen by two roles. */
function RolesComposition({ project }: { project: Project }) {
  return (
    <>
      <Monogram text={project.cover.monogram} className="-bottom-[10%] -right-[2%] text-[34cqw]" />
      <div className="absolute inset-x-[7%] top-[8%] bottom-[36%] sm:bottom-[30%] grid grid-cols-[1.25fr_1fr] gap-[3%] sm:inset-x-[10%]">
        <Frame label="role: admin" dots={false}>
          <div className="flex flex-1 flex-col gap-2 p-[6%]">
            {[0, 1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="flex items-center gap-2">
                <span className={cn("size-1.5", r === 0 ? "bg-accent" : "bg-fg/25")} />
                <span className="h-1.5 bg-fg/15" style={{ width: `${[52, 40, 60, 34, 48, 42][r]}%` }} />
                <span className="ml-auto h-1.5 w-[16%] bg-fg/[0.07]" />
              </div>
            ))}
            <span className="label-xs tracking-[0.12em] mt-auto text-[0.625rem] text-muted/70">REST · Fastify</span>
          </div>
        </Frame>
        <Frame label="role: user" dots={false} className="translate-y-[12%]">
          <div className="flex flex-1 flex-col gap-2 p-[8%]">
            <span className="h-[30%] bg-fg/[0.06]" />
            <span className="h-1.5 w-3/4 bg-fg/30" />
            <span className="h-1.5 w-1/2 bg-fg/15" />
            <span className="mt-auto h-6 w-1/2 bg-accent/70" />
          </div>
        </Frame>
      </div>
    </>
  );
}

/* E-commerce — product grid with a cart summary. */
function CartComposition({ project }: { project: Project }) {
  return (
    <>
      <Monogram text={project.cover.monogram} className="-left-[2%] -top-[12%] text-[48cqw]" />
      <Frame label="cart" className="absolute inset-x-[7%] top-[8%] bottom-[34%] sm:bottom-[28%] sm:inset-x-[10%]">
        <div className="grid flex-1 grid-cols-[1fr] sm:grid-cols-[1.6fr_1fr]">
          <div className="grid grid-cols-3 content-center gap-2 p-[5%]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className={cn("aspect-square", i === 4 ? "bg-accent/70" : "bg-fg/[0.06]")} />
                <span className="h-1 w-3/4 bg-fg/20" />
              </div>
            ))}
          </div>
          <div className="hidden flex-col gap-3 border-l border-line p-[8%] sm:flex">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="size-4 bg-fg/[0.08]" />
                <span className="h-1.5 flex-1 bg-fg/15" />
              </div>
            ))}
            <span className="mt-auto h-px bg-fg/15" />
            <span className="label-xs tracking-[0.12em] flex h-7 items-center justify-center bg-fg text-[0.625rem] text-bg">checkout</span>
          </div>
        </div>
      </Frame>
    </>
  );
}

/* MyNikkah — a live conversation. */
function ChatComposition({ project }: { project: Project }) {
  const bubbles: { side: "l" | "r"; w: number }[] = [
    { side: "l", w: 46 },
    { side: "r", w: 38 },
    { side: "l", w: 56 },
    { side: "r", w: 30 },
  ];
  return (
    <>
      <Monogram text={project.cover.monogram} className="-bottom-[8%] -right-[3%] text-[40cqw]" />
      <Frame label="chat" className="absolute inset-x-[14%] top-[8%] bottom-[34%] sm:bottom-[28%] sm:inset-x-[24%]">
        <div className="flex flex-1 flex-col justify-end gap-2.5 p-[6%]">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className={cn("h-6 sm:h-7", b.side === "r" ? "self-end bg-accent/75" : "self-start bg-fg/[0.1]")}
              style={{ width: `${b.w}%` }}
            />
          ))}
          <span className="label-xs tracking-[0.12em] mt-1 flex items-center gap-1.5 text-[0.625rem] text-muted/70">
            <span className="size-1.5 rounded-full bg-accent" /> live
          </span>
          <span className="mt-2 h-8 border border-line" />
        </div>
      </Frame>
    </>
  );
}

/* A quiet typographic plate, for projects best represented by name alone. */
function MarkComposition({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col p-[6%]">
      <div className="flex items-start justify-between">
        <span className="label-xs tracking-[0.12em] text-[0.625rem] text-muted/70">{project.number}</span>
        <span className="size-2 rounded-full bg-accent" />
      </div>
      <span className="font-display mt-[4%] font-semibold leading-[0.8] tracking-[-0.07em] text-fg/90 text-[24cqw]">
        {project.cover.monogram}
      </span>
      <span className="label-xs tracking-[0.12em] mt-[3%] text-[0.625rem]">{project.type}</span>
    </div>
  );
}
