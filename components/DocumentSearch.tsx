"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type DocumentItem = {
  id: string;
  originalName: string;
  category: string;
  description: string | null;
  mimeType: string;
  size: number;
  createdAt: string;
};

type DocumentSearchProps = {
  documents: DocumentItem[];
};

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function DocumentSearch({
  documents,
}: DocumentSearchProps) {
  const [search, setSearch] = useState("");

  const filteredDocuments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return documents;
    }

    return documents.filter((document) => {
      return (
        document.originalName.toLowerCase().includes(query) ||
        document.category.toLowerCase().includes(query) ||
        document.description?.toLowerCase().includes(query) ||
        document.mimeType.toLowerCase().includes(query)
      );
    });
  }, [documents, search]);

  return (
    <div>
      {/* Search */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {search.trim()
              ? `${filteredDocuments.length} ${
                  filteredDocuments.length === 1
                    ? "document"
                    : "documents"
                } found`
              : `${documents.length} ${
                  documents.length === 1
                    ? "document"
                    : "documents"
                } stored`}
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filteredDocuments.length === 0 ? (
        <div className="px-6 py-16 text-center sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            🔎
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No documents found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Try a different document name, category, description, or file
            type.
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-6 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {filteredDocuments.map((document) => (
            <div
              key={document.id}
              className="p-6 transition hover:bg-slate-50 sm:p-8"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                    📄
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-lg font-bold text-slate-900">
                      {document.originalName}
                    </h3>

                    {document.description && (
                      <p className="mt-1 break-words text-sm text-slate-600">
                        {document.description}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {document.category}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {formatFileSize(document.size)}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {document.mimeType}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      Uploaded {formatDate(document.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3 lg:justify-end">
                  <Link
                    href={`/secure/documents/${document.id}`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Open
                  </Link>

                  <a
                    href={`/api/documents/${document.id}?download=true`}
                    className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}