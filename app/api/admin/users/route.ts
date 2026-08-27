import { headers } from "next/headers";

import { getAccountAccess, isFounderEmail, type AccountRole } from "@/lib/admin-access";
import { auth } from "@/lib/auth";
import { createInternalAdminHeaders } from "@/lib/internal-admin";
import { getStoredUser, listStoredUsers, revokeStoredSessions, type StoredManagedUser } from "@/lib/user-store";

type ManagedUser = StoredManagedUser;

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

async function requireAdmin() {
  const requestHeaders = await headers();
  const access = await getAccountAccess(requestHeaders);

  if (!access?.isAdmin) {
    return { error: errorResponse("Administrator access is required.", 403) };
  }

  return {
    access,
    requestHeaders: createInternalAdminHeaders(requestHeaders),
  };
}

function serializeUser(user: ManagedUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: Boolean(user.emailVerified),
    role: user.role === "admin" ? "admin" : "user",
    isFounder: isFounderEmail(user.email),
    createdAt: new Date(user.createdAt).toISOString(),
  };
}

export async function GET() {
  const authorization = await requireAdmin();
  if ("error" in authorization) return authorization.error;

  const users = await listStoredUsers();

  return Response.json({ users: users.map(serializeUser) });
}

export async function POST(request: Request) {
  const authorization = await requireAdmin();
  if ("error" in authorization) return authorization.error;

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
      role?: AccountRole;
    };
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    const role: AccountRole = body.role === "admin" ? "admin" : "user";

    if (!name || !email) {
      return errorResponse("Name and email are required.", 400);
    }
    if (password.length < 12) {
      return errorResponse("Passwords must contain at least 12 characters.", 400);
    }
    if (isFounderEmail(email)) {
      return errorResponse("The founder account already has a reserved identity.", 409);
    }

    const result = await auth.api.createUser({
      headers: authorization.requestHeaders,
      body: { name, email, password, role },
    });

    return Response.json({ user: serializeUser(result.user as ManagedUser) }, { status: 201 });
  } catch (error) {
    console.error("Unable to create managed user:", error instanceof Error ? error.message : "Unknown error");
    return errorResponse("Unable to create this user. The email may already be registered.", 400);
  }
}

export async function PATCH(request: Request) {
  const authorization = await requireAdmin();
  if ("error" in authorization) return authorization.error;

  try {
    const body = (await request.json()) as {
      userId?: string;
      action?: "role" | "password";
      role?: AccountRole;
      password?: string;
    };
    const userId = body.userId?.trim();
    if (!userId) return errorResponse("A user is required.", 400);

    const target = await getStoredUser(userId);
    if (!target) return errorResponse("User not found.", 404);

    const targetIsFounder = isFounderEmail(target.email);
    const actorId = authorization.access.session.user.id;

    if (body.action === "role") {
      if (body.role !== "admin" && body.role !== "user") {
        return errorResponse("Select a valid role.", 400);
      }
      if (targetIsFounder) {
        return errorResponse("The founder account cannot be demoted.", 403);
      }
      if (target.id === actorId && body.role !== "admin") {
        return errorResponse("You cannot remove your own administrator access.", 403);
      }

      const result = await auth.api.setRole({
        headers: authorization.requestHeaders,
        body: { userId, role: body.role },
      });
      return Response.json({ user: serializeUser(result.user as ManagedUser) });
    }

    if (body.action === "password") {
      if (!body.password || body.password.length < 12) {
        return errorResponse("Passwords must contain at least 12 characters.", 400);
      }
      if (targetIsFounder && !authorization.access.isFounder) {
        return errorResponse("Only the founder can reset the founder password.", 403);
      }

      await auth.api.setUserPassword({
        headers: authorization.requestHeaders,
        body: { userId, newPassword: body.password },
      });

      // End existing sessions after a credential reset. If an administrator
      // resets their own password they will need to sign in again.
      await revokeStoredSessions(userId);
      return Response.json({ success: true });
    }

    return errorResponse("Unsupported account action.", 400);
  } catch (error) {
    console.error("Unable to update managed user:", error instanceof Error ? error.message : "Unknown error");
    return errorResponse("Unable to update this user.", 400);
  }
}

export async function DELETE(request: Request) {
  const authorization = await requireAdmin();
  if ("error" in authorization) return authorization.error;

  try {
    const body = (await request.json()) as { userId?: string };
    const userId = body.userId?.trim();
    if (!userId) return errorResponse("A user is required.", 400);

    const target = await getStoredUser(userId);
    if (!target) return errorResponse("User not found.", 404);
    if (isFounderEmail(target.email)) {
      return errorResponse("The founder account cannot be deleted.", 403);
    }
    if (target.id === authorization.access.session.user.id) {
      return errorResponse("You cannot delete your own account.", 403);
    }

    await auth.api.removeUser({
      headers: authorization.requestHeaders,
      body: { userId },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Unable to delete managed user:", error instanceof Error ? error.message : "Unknown error");
    return errorResponse("Unable to delete this user.", 400);
  }
}
