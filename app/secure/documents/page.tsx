import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { getDocuments } from "@/lib/documents";
import DeleteDocumentButton from "@/components/DeleteDocumentButton";

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

export default async function SecureDocumentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/secure/login");
  }

  const documents = getDocuments();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Founder Archive
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
              Documents
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Secure company documents and founder records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/secure/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              ← Dashboard
            </Link>

            <Link
              href="/secure/upload"
              className="rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Upload Document
            </Link>
          </div>
        </div>

        {/* Authenticated User */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Signed in as
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-slate-900">
            {session.user.email}
          </p>
        </div>

        {/* Archive */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* Archive Header */}
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Secure Archive
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {documents.length === 1
                    ? "1 document stored"
                    : `${documents.length} documents stored`}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                📁
              </div>
            </div>
          </div>

          {/* Empty State */}
          {documents.length === 0 && (
            <div className="px-6 py-16 text-center sm:px-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                📂
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No documents yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                Upload the first document to begin building the secure
                CustoNexus Founder Archive.
              </p>

              <Link
                href="/secure/upload"
                className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Upload First Document
              </Link>
            </div>
          )}

          {/* Documents */}
          {documents.length > 0 && (
            <div className="divide-y divide-slate-200">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="p-6 transition hover:bg-slate-50 sm:p-8"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Document Information */}
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

                    {/* Actions */}
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
          )}
        </div>

      </div>
    </main>
  );
}