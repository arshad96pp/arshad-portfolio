import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The lime initial disc from the navbar. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          background: "#e1f250",
          color: "#08090b",
          fontSize: 38,
          fontWeight: 700,
        }}
      >
        {site.initial}
      </div>
    ),
    size,
  );
}
