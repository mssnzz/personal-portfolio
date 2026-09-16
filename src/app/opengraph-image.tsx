import { ImageResponse } from "next/og";
import { profile } from "@/components/cv/data";

export const alt = "Manuel Sanchez — Fullstack Developer & QA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card social platforms show when the site is shared — in an application,
 * a DM, a LinkedIn post. Drawn rather than stored so it cannot drift from the
 * data: the role and location come from the same `profile` the page reads.
 *
 * Satori (what ImageResponse renders with) supports a subset of CSS and needs
 * `display: flex` stated on any element with more than one child, so the
 * layout below is explicit where a browser would let it be implicit.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, background: "#a5b4fc" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a5b4fc",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: -3,
              fontFamily: "sans-serif",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              marginTop: 20,
              maxWidth: 900,
              color: "#a1a1aa",
              fontFamily: "sans-serif",
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: "#27272a", marginBottom: 24 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#71717a",
            }}
          >
            <div>{profile.location}</div>
            <div>manuelsanchez.io</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
