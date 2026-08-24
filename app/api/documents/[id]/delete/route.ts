import { headers } from "next/headers";
import fs from "fs/promises";

import { auth } from "@/lib/auth";
import { getDocumentById, deleteDocument } from "@/lib/documents";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
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

    const { id } = await context.params;

    // Find the document
    const document = getDocumentById(id);

    if (!document) {
      return Response.json(
        { error: "Document not found." },
        { status: 404 }
      );
    }

    // Delete the physical file first
    try {
      await fs.unlink(document.filePath);
    } catch (error: unknown) {
      // If the file is already missing, continue with database cleanup.
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? (error as { code?: string }).code
          : undefined;

      if (code !== "ENOENT") {
        throw error;
      }
    }

    // Delete the database record
    deleteDocument(id);

    return Response.json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error) {
    console.error("Document deletion error:", error);

    return Response.json(
      { error: "Unable to delete document." },
      { status: 500 }
    );
  }
}