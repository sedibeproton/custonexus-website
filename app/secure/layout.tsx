import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
  },
};

export default function SecureLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
