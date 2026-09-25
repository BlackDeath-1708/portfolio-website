import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#38bdf8",
          }}
        >
          Cybersecurity × Software × Research
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            color: "#a1a1a6",
          }}
        >
          {siteConfig.title}
        </div>
      </div>
    ),
    { ...size },
  );
}
