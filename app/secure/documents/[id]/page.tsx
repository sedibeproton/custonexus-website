import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { getDocumentById } from "@/lib/documents";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
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
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function DocumentDetailsPage({
  params,
}: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/secure/login");
  }

  const { id } = await params;

  const document = getDocumentById(id);

  if (!document) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Top navigation */}
        <div className="mb-8">
          <Link
            href="/secure/documents"
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            ← Back to Documents
          </Link>
        </div>

        {/* Document card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Founder Archive
            </p>

            <h1 className="mt-3 break-words text-2xl font-bold text-slate-900 sm:text-4xl">
              {document.originalName}
            </h1>

            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Secure company document
            </p>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-10">

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {document.category}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  File Size
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {formatFileSize(document.size)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  File Type
                </p>

                <p className="mt-2 break-all font-semibold text-slate-900">
                  {document.mimeType}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Uploaded
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {formatDate(document.createdAt)}
                </p>
              </div>

            </div>

            {/* Description */}
            {document.description && (
              <div className="mt-6 rounded-2xl border border-slate-200 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </p>

                <p className="mt-3 leading-7 text-slate-700">
                  {document.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href={`/api/documents/${document.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Open Document
              </a>

              <a
                href={`/api/documents/${document.id}?download=true`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Download
              </a>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}