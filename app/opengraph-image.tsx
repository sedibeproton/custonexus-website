import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CustoNexus Technologies — Together, Better Healthcare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public", "logos", "logo-full-horizontal.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "stretch", background: "#f8fbff", color: "#071b48", display: "flex", height: "100%", overflow: "hidden", width: "100%" }}>
      <div style={{ background: "radial-gradient(circle at 92% 10%, rgba(59,130,246,0.2), transparent 36%), linear-gradient(145deg, #ffffff 0%, #f4f8ff 100%)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 68px 58px", width: "72%" }}>
        <div style={{ alignItems: "center", background: "white", border: "1px solid #dbe7f8", borderRadius: "22px", boxShadow: "0 14px 40px rgba(5,35,92,0.08)", display: "flex", height: "104px", padding: "18px 26px", width: "560px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="CustoNexus Technologies" src={logoSrc} style={{ height: "68px", objectFit: "contain", width: "500px" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#0757d3", display: "flex", fontSize: 20, fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase" }}>Building meaningful connections</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.02, marginTop: "22px" }}>
            <span>Together,</span>
            <span>Better Healthcare.</span>
          </div>
          <div style={{ color: "#52637e", display: "flex", fontSize: 24, lineHeight: 1.4, marginTop: "24px" }}>Technology · Professional Services · Trusted Partnerships</div>
        </div>
      </div>

      <div style={{ alignItems: "center", background: "linear-gradient(160deg, #0b5ee8 0%, #062b79 52%, #031638 100%)", display: "flex", justifyContent: "center", position: "relative", width: "28%" }}>
        <div style={{ border: "2px solid rgba(255,255,255,0.22)", borderRadius: "52px", display: "flex", height: "242px", position: "absolute", transform: "rotate(30deg)", width: "210px" }} />
        <div style={{ border: "2px solid rgba(147,197,253,0.32)", borderRadius: "44px", display: "flex", height: "176px", position: "absolute", transform: "rotate(30deg)", width: "152px" }} />
        <div style={{ alignItems: "center", background: "rgba(255,255,255,0.96)", borderRadius: "999px", boxShadow: "0 22px 60px rgba(0,0,0,0.28)", display: "flex", height: "132px", justifyContent: "center", overflow: "hidden", width: "132px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={logoSrc} style={{ height: "86px", objectFit: "cover", objectPosition: "left", width: "86px" }} />
        </div>
        <div style={{ bottom: "42px", color: "#dbeafe", display: "flex", fontSize: 18, fontWeight: 600, letterSpacing: "2px", position: "absolute" }}>CUSTONEXUS.COM</div>
      </div>
    </div>,
    size,
  );
}
