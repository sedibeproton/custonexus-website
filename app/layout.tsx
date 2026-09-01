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
  manifest: "/manifest.webmanifest",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  title: {
    default: "CustoNexus Technologies",
    template: "%s | CustoNexus Technologies",
  },

  description:
    "Custom websites and apps, hosting, medical equipment supply and servicing, professional services, side projects and healthcare partnerships from CustoNexus Technologies.",

  keywords: [
    "healthcare technology",
    "digital health solutions",
    "healthcare professional services",
    "medical solutions",
    "medical equipment calibration South Africa",
    "medical equipment repairs",
    "custom website development South Africa",
    "custom app development",
    "website hosting and company email",
    "electronics and appliance repairs",
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
      "Custom technology, medical equipment services, professional expertise and trusted partnerships.",
    url: "/",
    siteName: "CustoNexus Technologies",
    locale: "en_ZA",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CustoNexus Technologies — Together, Better Healthcare" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "CustoNexus Technologies",
    description:
      "Custom websites and apps, medical equipment services, professional expertise and trusted partnerships.",
    images: ["/opengraph-image"],
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
      foundingDate: "2026",
      logo: {
        "@type": "ImageObject",
        url: "https://custonexus.com/logos/logo-mark.png",
        contentUrl: "https://custonexus.com/logos/logo-mark.png",
        width: 1024,
        height: 1024,
        caption: "CustoNexus Technologies",
      },
      email: "info@custonexus.com",
      telephone: "+27 72 270 1087",
      address: { "@type": "PostalAddress", addressCountry: "ZA" },
      sameAs: [
        "https://www.linkedin.com/company/custonexus-technologies/about/",
        "https://www.facebook.com/profile.php?id=61593696335289",
        "https://www.instagram.com/custonexus/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+27 72 270 1087",
        email: "info@custonexus.com",
        contactType: "customer service",
        areaServed: "ZA",
        availableLanguage: "English",
      },
      description:
        "Custom technology, website and app development, hosting, medical equipment supply and servicing, professional services, selected side projects and trusted healthcare partnerships.",
      knowsAbout: [
        "Custom website and application development",
        "Website hosting and company email",
        "Medical equipment supply, servicing and calibration",
        "Professional consulting and project management",
        "Electrical appliance and electronics side projects",
        "Healthcare technology partnerships",
      ],
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
