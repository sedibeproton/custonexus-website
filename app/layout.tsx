import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundDecor from "@/components/BackgroundDecor";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://custonexus.com"), // Change this when your live domain is ready

  title: {
    default: "CustoNexus Technologies",
    template: "%s | CustoNexus Technologies",
  },

  description:
    "Trusted healthcare partnerships, innovative technology and meaningful connections improving healthcare experiences.",

  icons: {
    icon: "/logos/logo-mark.png",
    shortcut: "/logos/logo-mark.png",
    apple: "/logos/logo-mark.png",
  },

  openGraph: {
    title: "CustoNexus Technologies",
    description:
      "Building Meaningful Connections Across Healthcare.",
    images: ["/images/og-image.jpg"], // We'll create this later
  },

  twitter: {
    card: "summary_large_image",
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <BackgroundDecor />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}