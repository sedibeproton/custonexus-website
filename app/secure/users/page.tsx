import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import UserManager from "./UserManager";
import { getAccountAccess, isFounderEmail } from "@/lib/admin-access";
import { listStoredUsers } from "@/lib/user-store";

export default async function UserAdministrationPage() {
  const access = await getAccountAccess(await headers());
  if (!access) redirect("/secure/login");
  if (!access.isAdmin) redirect("/secure/dashboard");

  const initialUsers = (await listStoredUsers()).map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === "admin" ? ("admin" as const) : ("user" as const),
      isFounder: isFounderEmail(user.email),
      createdAt: new Date(user.createdAt).toISOString(),
    }));

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link href="/secure/dashboard" className="text-sm font-semibold text-blue-700 hover:text-blue-900">← Back to dashboard</Link>
        <div className="mt-5 rounded-3xl bg-gradient-to-br from-blue-800 to-slate-950 p-7 text-white shadow-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">Administration</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">User management</h1>
          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            Create authorised accounts, assign administrator access, reset passwords and remove users from the secure workspace.
          </p>
          <p className="mt-5 text-sm text-blue-200">Signed in as {access.session.user.email}</p>
        </div>
        <div className="mt-8">
          <UserManager currentUserId={access.session.user.id} initialUsers={initialUsers} />
        </div>
      </div>
    </main>
  );
}
