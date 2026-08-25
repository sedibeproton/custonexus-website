"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteDocumentButtonProps = {
  documentId: string;
  documentName: string;
  compact?: boolean;
};

export default function DeleteDocumentButton({
  documentId,
  documentName,
  compact = false,
}: DeleteDocumentButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${documentName}"?\n\nThis will remove the document from the archive and delete the stored file.`
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/documents/${documentId}/delete`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to delete document."
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Delete document error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete document."
      );

      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className={compact
          ? "text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
          : "rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p className="max-w-xs text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
