import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CustoNexus Technologies",
    short_name: "CustoNexus",
    description: "Healthcare technology, professional services and trusted partnerships.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0757d3",
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
