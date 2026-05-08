import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "mediabuyer — Native Ad Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "80px",
          fontFamily: "system-ui",
          backgroundImage:
            "radial-gradient(800px 500px at 30% 0%, rgba(16,185,129,0.18), transparent 70%), radial-gradient(700px 400px at 100% 100%, rgba(59,130,246,0.15), transparent 70%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#fafafa",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: 32,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            m
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>mediabuyer</div>
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginTop: "auto",
          }}
        >
          Native ad
          <br />
          <span style={{ color: "#a1a1aa" }}>intelligence.</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 32,
            fontSize: 22,
            color: "#a1a1aa",
          }}
        >
          <span>Taboola</span>
          <span>·</span>
          <span>Outbrain</span>
          <span>·</span>
          <span>MGID</span>
          <span>·</span>
          <span>RevContent</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
            paddingTop: 24,
            borderTop: "1px solid #27272a",
            fontSize: 18,
            color: "#71717a",
          }}
        >
          <span>20,000 ads · 1,000 advertisers · 39 countries</span>
          <span>updated hourly</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
