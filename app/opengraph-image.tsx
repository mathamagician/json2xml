import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#020617",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          gap: 24,
        }}
      >
        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          <span style={{ color: "#0284c7" }}>JSON</span>
          <span style={{ color: "#475569", fontSize: 64, fontWeight: 300 }}>{"\u2194"}</span>
          <span style={{ color: "#f1f5f9" }}>XML</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            letterSpacing: "-0.5px",
          }}
        >
          Free online converter — runs entirely in your browser
        </div>

        {/* URL badge */}
        <div
          style={{
            marginTop: 16,
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 12,
            padding: "10px 28px",
            fontSize: 26,
            color: "#475569",
            letterSpacing: "0.5px",
          }}
        >
          json2xml.com
        </div>
      </div>
    ),
    { ...size }
  );
}
