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
          background: "radial-gradient(60% 80% at 85% 20%, rgba(0,209,255,0.18), transparent 70%), radial-gradient(50% 70% at 15% 90%, rgba(124,58,237,0.18), transparent 70%), #050608",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#00d1ff",
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
            color: "#8b929d",
          }}
        >
          {siteConfig.headline}
        </div>
      </div>
    ),
    { ...size },
  );
}
