import { auth } from "@/lib/auth";
import { authDb } from "@/lib/auth-db";
import { postgresRows } from "@/lib/db/postgres";
import { getPersistenceBackend } from "@/lib/persistence-mode";

export type AccountRole = "admin" | "user";

type StoredUser = {
  id: string;
  email: string;
  role: string | null;
};

export function getFounderEmail() {
  return process.env.FOUNDER_EMAIL?.trim().toLowerCase() ?? "";
}

export function isFounderEmail(email: string) {
  const founderEmail = getFounderEmail();
  return Boolean(founderEmail) && email.trim().toLowerCase() === founderEmail;
}

export async function getAccountAccess(headers: Headers) {
  const session = await auth.api.getSession({ headers });

  if (!session) {
    return null;
  }

  const storedUser = getPersistenceBackend() === "postgres"
    ? (await postgresRows<StoredUser>('SELECT id, email, role FROM "user" WHERE id = $1', [session.user.id]))[0]
    : authDb?.prepare("SELECT id, email, role FROM user WHERE id = ?").get(session.user.id) as StoredUser | undefined;

  if (!storedUser) {
    return null;
  }

  const founder = isFounderEmail(storedUser.email);

  if (founder && storedUser.role !== "admin") {
    if (getPersistenceBackend() === "postgres") {
      await postgresRows('UPDATE "user" SET role = \'admin\', "updatedAt" = $1 WHERE id = $2', [new Date(), storedUser.id]);
    } else {
      authDb?.prepare("UPDATE user SET role = 'admin', updatedAt = ? WHERE id = ?").run(new Date(), storedUser.id);
    }
    storedUser.role = "admin";
  }

  const role: AccountRole = storedUser.role === "admin" ? "admin" : "user";

  return {
    session,
    role,
    isAdmin: role === "admin",
    isFounder: founder,
  };
}
