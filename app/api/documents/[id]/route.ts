import { headers } from "next/headers";
import { readFile } from "fs/promises";

import { auth } from "@/lib/auth";
import { getDocumentById } from "@/lib/documents";
import {
  canDisplayInline,
  createContentDisposition,
} from "@/lib/uploads";

export async function GET(
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

    // Find document metadata
    const document = getDocumentById(id);

    if (!document) {
      return Response.json(
        { error: "Document not found." },
        { status: 404 }
      );
    }

    // Read the stored file
    let fileBuffer: Buffer;

    try {
      fileBuffer = await readFile(document.filePath);
    } catch (error) {
      console.error("Unable to read document:", error);

      return Response.json(
        { error: "Stored document could not be found." },
        { status: 404 }
      );
    }

    const url = new URL(request.url);
    const download = url.searchParams.get("download") === "true";

    const disposition =
      !download && canDisplayInline(document.mimeType)
        ? "inline"
        : "attachment";

    return new Response(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": document.mimeType,
        "Content-Length": String(fileBuffer.length),
        "Content-Disposition": createContentDisposition(
          disposition,
          document.originalName
        ),
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Document access error:", error);

    return Response.json(
      { error: "Unable to access document." },
      { status: 500 }
    );
  }
}
