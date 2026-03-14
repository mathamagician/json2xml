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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          <span style={{ color: "#0284c7" }}>HTML</span>
          <span style={{ color: "#64748b" }}>→</span>
          <span style={{ color: "#f1f5f9" }}>Markdown</span>
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            letterSpacing: "-0.5px",
          }}
        >
          Convert HTML to Markdown — free, private, in your browser
        </div>

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
          json2xml.com/html-to-markdown
        </div>
      </div>
    ),
    { ...size }
  );
}
