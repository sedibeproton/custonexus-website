import { auth } from "@/lib/auth";

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

    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

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