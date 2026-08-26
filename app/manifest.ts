import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CustoNexus Technologies",
    short_name: "CustoNexus",
    description: "Healthcare technology, professional services and trusted partnerships.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#071a3d",
    categories: ["healthcare", "business", "technology"],
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
