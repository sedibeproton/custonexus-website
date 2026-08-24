"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import DeleteDocumentButton from "@/components/DeleteDocumentButton";

type DocumentRecord = {
  id: string;
  name: string;
  originalName: string;
  category: string;
  description: string | null;
  filePath: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
};

type DocumentListProps = {
  documents: DocumentRecord[];
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

export default function DocumentList({
  documents,
}: DocumentListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () =>
      [
        "All",
        ...Array.from(
          new Set(documents.map((document) => document.category))
        ).sort(),
      ],
    [documents]
  );

  const filteredDocuments = useMemo(() => {
    const term = search.trim().toLowerCase();

    return documents.filter((document) => {
      const matchesCategory =
        category === "All" || document.category === category;

      const matchesSearch =
        !term ||
        document.originalName.toLowerCase().includes(term) ||
        document.category.toLowerCase().includes(term) ||
        (document.description ?? "").toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [documents, search, category]);

  return (
    <>
      {/* Search and filters */}
      {documents.length > 0 && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label
                htmlFor="document-search"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Search documents
              </label>

              <input
                id="document-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, category or description..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="sm:w-56">
              <label
                htmlFor="document-category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>

              <select
                id="document-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredDocuments.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {documents.length}
            </span>{" "}
            documents
          </div>
        </div>
      )}

      {/* Filtered documents */}
      {filteredDocuments.length > 0 ? (
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

                  <Link
                    href={`/api/documents/${document.id}?download=true`}
                    className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    Download
                  </Link>

                  <DeleteDocumentButton
                    documentId={document.id}
                    documentName={document.originalName}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-16 text-center sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            🔎
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No matching documents
          </h3>

          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Try a different search term or select another category.
          </p>
        </div>
      )}
    </>
  );
}