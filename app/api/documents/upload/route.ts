import { headers } from "next/headers";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

import { auth } from "@/lib/auth";
import { insertDocument } from "@/lib/documents";

const UPLOAD_DIR = path.join(process.cwd(), "data", "documents");

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Read multipart form
    const formData = await request.formData();

    const file = formData.get("file");
    const category = formData.get("category");
    const description = formData.get("description");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "A file is required." },
        { status: 400 }
      );
    }

    if (typeof category !== "string" || !category.trim()) {
      return Response.json(
        { error: "A document category is required." },
        { status: 400 }
      );
    }

    // Maximum file size: 25 MB
    const MAX_FILE_SIZE = 25 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "File size cannot exceed 25 MB." },
        { status: 400 }
      );
    }

    // Make sure storage directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const id = randomUUID();

    const originalName = file.name;
    const extension = path.extname(originalName);
    const storedName = `${id}${extension}`;

    const filePath = path.join(UPLOAD_DIR, storedName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    const now = new Date().toISOString();

    const document = {
      id,
      name: storedName,
      originalName,
      category: category.trim(),
      description:
        typeof description === "string"
          ? description.trim()
          : null,
      filePath,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      uploadedBy: session.user.id,
      createdAt: now,
      updatedAt: now,
    };

    // Save document metadata to SQLite
    insertDocument(document);

    return Response.json({
      success: true,
      document: {
        id: document.id,
        name: document.name,
        originalName: document.originalName,
        category: document.category,
        description: document.description,
        mimeType: document.mimeType,
        size: document.size,
        uploadedBy: document.uploadedBy,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
    });
  } catch (error) {
    console.error("Document upload error:", error);

    return Response.json(
      { error: "Unable to upload document." },
      { status: 500 }
    );
  }
}
