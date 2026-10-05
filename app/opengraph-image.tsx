import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#08090b";
const FG = "#f3f5f9";
const MUTED = "#8c8f95";
const LIME = "#e1f250";

/** Typographic share card — mirrors the hero, no photograph. */
export default async function Image() {
  const dir = join(process.cwd(), "assets/fonts");
  const [semibold, lightItalic, mono] = await Promise.all([
    readFile(join(dir, "InterTight-SemiBold.ttf")),
    readFile(join(dir, "InterTight-LightItalic.ttf")),
    readFile(join(dir, "JetBrainsMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: `radial-gradient(60% 60% at 50% 62%, rgba(225,242,80,0.14), transparent 70%), ${BG}`,
          color: FG,
          padding: "56px 64px",
          fontFamily: "Inter Tight",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 12px",
            border: "1px solid rgba(243,245,249,0.08)",
            borderRadius: 999,
            background: "#0e0f12",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: LIME,
                color: BG,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              {site.initial}
            </div>
            <span style={{ fontSize: 24 }}>{site.name}</span>
          </div>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 16, letterSpacing: 3, color: MUTED, marginRight: 16 }}>
            WEB · BACKEND · DESKTOP
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 18, letterSpacing: 4, color: MUTED }}>
            {`HI, I'M ${site.name.toUpperCase()} — A ${site.role.toUpperCase()}`}
          </span>
          <span style={{ marginTop: 22, fontSize: 116, lineHeight: 0.95, letterSpacing: -4.6 }}>Building Digital</span>
          <span style={{ display: "flex", fontSize: 116, lineHeight: 1.05, letterSpacing: -4.6 }}>
            <span style={{ fontFamily: "Inter Tight Light", fontStyle: "italic", color: MUTED }}>Experiences</span>
            <span style={{ color: LIME }}>.</span>
          </span>
        </div>

        <span style={{ fontSize: 26, color: MUTED, letterSpacing: -0.4 }}>
          Websites, applications and digital products — from interface to backend.
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: semibold, weight: 600, style: "normal" },
        { name: "Inter Tight Light", data: lightItalic, weight: 300, style: "italic" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
