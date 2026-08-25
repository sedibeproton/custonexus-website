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
  metadataBase: new URL("https://custonexus.com"),
  applicationName: "CustoNexus Technologies",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  title: {
    default: "CustoNexus Technologies",
    template: "%s | CustoNexus Technologies",
  },

  description:
    "Trusted healthcare partnerships, innovative technology and meaningful connections improving healthcare experiences.",

  keywords: [
    "healthcare technology",
    "digital health solutions",
    "healthcare professional services",
    "medical solutions",
    "healthcare partnerships",
    "CustoNexus Technologies",
  ],

  authors: [{ name: "CustoNexus Technologies", url: "/" }],
  creator: "CustoNexus Technologies",
  publisher: "CustoNexus Technologies",

  alternates: { canonical: "/" },

  formatDetection: { email: false, address: false, telephone: false },

  icons: {
    icon: "/logos/logo-mark.png",
    shortcut: "/logos/logo-mark.png",
    apple: "/logos/logo-mark.png",
  },

  openGraph: {
    title: "CustoNexus Technologies",
    description:
      "Building Meaningful Connections Across Healthcare.",
    url: "/",
    siteName: "CustoNexus Technologies",
    locale: "en_ZA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CustoNexus Technologies",
    description:
      "Trusted healthcare partnerships, innovative technology and meaningful connections.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CustoNexus Technologies",
  url: "https://custonexus.com",
  logo: "https://custonexus.com/logos/logo-mark.png",
  email: "hello@custonexus.tech",
  description:
    "Healthcare technology, professional services and trusted partnerships designed to improve healthcare experiences.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <BackgroundDecor />
        <div className="relative z-10 w-full">{children}</div>
      </body>
    </html>
  );
}
