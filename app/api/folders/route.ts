import { randomUUID } from "crypto";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getFolderById, insertFolder } from "@/lib/documents";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const parentId = typeof body.parentId === "string" && body.parentId
    ? body.parentId
    : null;

  if (!name || name.length > 100 || /[\\/:*?"<>|]/.test(name)) {
    return Response.json(
      { error: "Use a folder name between 1 and 100 characters without \\ / : * ? \" < > |." },
      { status: 400 }
    );
  }

  if (parentId && !(await getFolderById(parentId))) {
    return Response.json({ error: "Parent folder not found." }, { status: 404 });
  }

  const now = new Date().toISOString();

  try {
    await insertFolder({
      id: randomUUID(),
      name,
      parentId,
      createdBy: session.user.id,
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("Folder creation error:", error);
    return Response.json({ error: "Unable to create folder." }, { status: 500 });
  }

  return Response.json({ success: true });
}
