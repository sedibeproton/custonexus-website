import { headers } from "next/headers";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

import { auth } from "@/lib/auth";
import { getFolderById, insertDocument } from "@/lib/documents";
import {
  formatUploadLimit,
  getMaxUploadSize,
  getSafeStoredExtension,
} from "@/lib/uploads";

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
    const requestedFolderId = formData.get("folderId");
    const folderId =
      typeof requestedFolderId === "string" && requestedFolderId
        ? requestedFolderId
        : null;

    if (!(file instanceof File)) {
      return Response.json(
        { error: "A file is required." },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return Response.json(
        { error: "The selected file is empty." },
        { status: 400 }
      );
    }

    if (folderId && !getFolderById(folderId)) {
      return Response.json({ error: "Folder not found." }, { status: 404 });
    }

    const maxFileSize = getMaxUploadSize();

    if (file.size > maxFileSize) {
      return Response.json(
        {
          error: `File size cannot exceed ${formatUploadLimit(maxFileSize)}.`,
        },
        { status: 400 }
      );
    }

    // Make sure storage directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const id = randomUUID();

    const originalName = file.name;
    const extension = getSafeStoredExtension(originalName);
    const storedName = `${id}${extension}`;

    const filePath = path.join(UPLOAD_DIR, storedName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    const now = new Date().toISOString();

    const document = {
      id,
      name: storedName,
      originalName,
      category:
        typeof category === "string" && category.trim()
          ? category.trim()
          : "File",
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
      folderId,
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
