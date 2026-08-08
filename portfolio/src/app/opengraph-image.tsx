import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Shahriar Newaz — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #070b14 0%, #0f1c33 50%, #0a2744 100%)",
          color: "#eef2f8",
        }}
      >
        <div style={{ fontSize: 28, color: "#2997ff", marginBottom: 24 }}>
          Software Engineer · SELISE Digital Platforms
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
          Shahriar Newaz
        </div>
        <div style={{ fontSize: 28, color: "#9aa6bd", marginTop: 24, maxWidth: 800 }}>
          ASP.NET Core · JavaScript · TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}
