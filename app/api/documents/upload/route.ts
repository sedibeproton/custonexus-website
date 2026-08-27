import { headers } from "next/headers";
import { randomUUID } from "crypto";

import { auth } from "@/lib/auth";
import { getFolderById, insertDocument } from "@/lib/documents";
import {
  formatUploadLimit,
  getMaxUploadSize,
  getSafeStoredExtension,
} from "@/lib/uploads";
import { discardStoredDocument, storeDocument } from "@/lib/storage/documents";

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

    if (folderId && !(await getFolderById(folderId))) {
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

    const id = randomUUID();

    const originalName = file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const now = new Date().toISOString();
    const storedName = `${id}${getSafeStoredExtension(originalName)}`;
    const storage = await storeDocument({id,originalName,bytes:buffer,mimeType:file.type||"application/octet-stream",createdAt:new Date(now)});

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
      filePath: storage.filePath,
      objectKey: storage.objectKey,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
      uploadedBy: session.user.id,
      createdAt: now,
      updatedAt: now,
      folderId,
      archivedAt: null,
    };

    // Save document metadata to SQLite
    try {
      await insertDocument(document);
    } catch (error) {
      await discardStoredDocument(storage).catch((cleanupError) => {
        console.error("Unable to clean up document after metadata failure:", cleanupError);
      });
      throw error;
    }

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
