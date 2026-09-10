import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CustoNexus Technologies",
    short_name: "CustoNexus",
    description: "Business websites, website support, custom systems and healthcare technology from CustoNexus Technologies.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#071a3d",
    categories: ["business", "technology", "productivity", "healthcare"],
    icons: [
      {
        src: "/logos/logo-mark.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
