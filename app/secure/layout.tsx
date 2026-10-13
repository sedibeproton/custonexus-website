import type { Metadata } from "next";
import { headers } from "next/headers";
import SecureNavigation from "@/components/secure/SecureNavigation";
import { getAccountAccess } from "@/lib/admin-access";
import { consultationSchemaReady, listBookings } from "@/lib/consultations";

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
  let pendingAppointments = 0;
  if (access?.isAdmin) {
    try {
      if (await consultationSchemaReady()) pendingAppointments = (await listBookings(undefined, undefined, "PENDING")).length;
    } catch {
      // Navigation remains available while consultation storage is being configured.
    }
  }

  return (
    <>
      <SecureNavigation isAdmin={Boolean(access?.isAdmin)} pendingAppointments={pendingAppointments} />
      <div id="main-content">{children}</div>
    </>
  );
}
