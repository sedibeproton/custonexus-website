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
    icon: [
      {
        url: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        url: "/logos/logo-mark.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/logos/logo-mark.png",
      sizes: "1024x1024",
      type: "image/png",
    },
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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://custonexus.com/#website",
      url: "https://custonexus.com",
      name: "CustoNexus Technologies",
      alternateName: "CustoNexus",
      publisher: { "@id": "https://custonexus.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://custonexus.com/#organization",
      name: "CustoNexus Technologies",
      url: "https://custonexus.com",
      logo: "https://custonexus.com/logos/logo-mark.png",
      email: "info@custonexus.com",
      telephone: "+27 72 270 1087",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+27 72 270 1087",
        email: "info@custonexus.com",
        contactType: "customer service",
        areaServed: "ZA",
        availableLanguage: "English",
      },
      description:
        "Healthcare technology, medical equipment, professional services and trusted partnerships designed to improve healthcare experiences.",
    },
  ],
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
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-blue-700 px-5 py-3 font-semibold text-white shadow-xl transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <BackgroundDecor />
        <div className="relative z-10 flex min-h-screen w-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
