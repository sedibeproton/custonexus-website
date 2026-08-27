import { auth } from "@/lib/auth";
import { getFounderEmail } from "@/lib/admin-access";
import { getStoredUserByEmail, promoteStoredUser } from "@/lib/user-store";

export async function POST(request: Request) {
  const setupKey = request.headers.get("x-setup-key");
  const expectedKey = process.env.SETUP_KEY;

  if (!expectedKey || setupKey !== expectedKey) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const { name, email, password } = body;
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const founderEmail = getFounderEmail();

    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (!founderEmail) {
      return Response.json(
        { error: "FOUNDER_EMAIL is not configured." },
        { status: 503 }
      );
    }

    if (normalizedEmail !== founderEmail) {
      return Response.json(
        { error: "Only the configured founder account can be bootstrapped." },
        { status: 403 }
      );
    }

    const existingFounder = await getStoredUserByEmail(founderEmail);

    if (existingFounder) {
      await promoteStoredUser(existingFounder.id);

      return Response.json({ success: true, user: existingFounder });
    }

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email: normalizedEmail,
        password,
      },
    });

    await promoteStoredUser(result.user.id);

    return Response.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error("Setup error:", error);

    return Response.json(
      { error: "Unable to create administrator account." },
      { status: 500 }
    );
  }
}
