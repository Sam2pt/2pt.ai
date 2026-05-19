import { ImageResponse } from "next/og"

/**
 * Dynamic Open Graph image for the root URL.
 *
 * Rendered at request time (cached at the edge by Netlify/Vercel) so we never
 * have to maintain a static .png. Branded black canvas with the wordmark
 * lockup and the deploy claim. 1200×630 — the standard OG size.
 */

export const alt = "Two Point Technologies — We deploy production AI inside marketing teams."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 80% 80%, rgba(74,222,128,0.18) 0%, rgba(74,222,128,0.04) 40%, transparent 70%)",
          color: "#FAFAFA",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top chrome — masthead label + LIVE pulse */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.55)",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: "#4ADE80",
              }}
            />
            <span style={{ color: "#4ADE80" }}>Live</span>
            <span>Two Point Technologies · Vol I · Issue 001</span>
          </div>
          <div>NYC · LDN</div>
        </div>

        {/* Headline — the deploy claim */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 700,
            fontSize: 116,
            lineHeight: 0.96,
            letterSpacing: "-0.045em",
          }}
        >
          <span style={{ color: "#FAFAFA" }}>We deploy production AI</span>
          <span style={{ color: "#4ADE80", marginTop: 6 }}>
            inside marketing teams.
          </span>
        </div>

        {/* Bottom chrome — brand wordmark + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <span
              style={{
                fontStyle: "italic",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#FAFAFA",
              }}
            >
              2pt
            </span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(250,250,250,0.55)",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
              }}
            >
              The embedded AI engineering firm for marketing
            </span>
          </div>
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#4ADE80",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
            }}
          >
            2pt.ai
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
