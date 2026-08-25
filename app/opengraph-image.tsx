import { ImageResponse } from "next/og";

export const alt = "CustoNexus Technologies — Together, Better Healthcare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "radial-gradient(circle at 80% 20%, #60a5fa 0%, #0b4cc2 28%, #061b49 68%, #020617 100%)", color: "white", display: "flex", height: "100%", justifyContent: "center", padding: "72px", width: "100%" }}>
      <div style={{ border: "2px solid rgba(255,255,255,0.2)", borderRadius: "44px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: "62px 68px", width: "100%" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>CustoNexus Technologies</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 74, fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.05, maxWidth: "900px" }}>Together, Better Healthcare.</div>
          <div style={{ color: "#dbeafe", display: "flex", fontSize: 27, marginTop: "28px" }}>Technology · Professional Services · Trusted Partnerships</div>
        </div>
      </div>
    </div>,
    size,
  );
}
