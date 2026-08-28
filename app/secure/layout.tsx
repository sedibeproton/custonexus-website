import type { Metadata } from "next";
import { headers } from "next/headers";
import SecureNavigation from "@/components/secure/SecureNavigation";
import { getAccountAccess } from "@/lib/admin-access";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
  },
};

export default async function SecureLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const access = await getAccountAccess(await headers());

  return (
    <>
      <SecureNavigation isAdmin={Boolean(access?.isAdmin)} />
      <div id="main-content">{children}</div>
    </>
  );
}
