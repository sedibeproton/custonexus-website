import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { getDocuments } from "@/lib/documents";

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
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default async function SecureDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/secure/login");
  }

  const documents = getDocuments();

  const categories = Array.from(
    new Set(documents.map((document) => document.category))
  );

  const latestDocument = documents[0];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <span className="text-2xl">🔒</span>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Founder Archive
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                    CustoNexus Secure Archive
                  </h1>

                  <p className="mt-1 text-sm text-slate-600 sm:text-base">
                    Private company document management
                  </p>
                </div>

              </div>
            </div>

            {/* User */}
            <div className="rounded-2xl bg-slate-50 px-5 py-4 lg:min-w-[280px] lg:text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Signed in as
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                {session.user.email}
              </p>
            </div>

          </div>

          {/* Welcome */}
          <div className="mt-10 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-blue-900 p-7 text-white shadow-sm sm:p-10">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Founder Workspace
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Welcome back.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 sm:text-base">
              Your private CustoNexus Founder Archive provides a secure
              workspace for preserving company documents, governance records,
              founder materials, and institutional knowledge.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                href="/secure/documents"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Open Files
              </Link>

              <Link
                href="/secure/upload"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Upload File
              </Link>

            </div>

          </div>

          {/* Live Statistics */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total Documents */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Documents
                  </p>

                  <p className="mt-3 text-4xl font-bold text-slate-900">
                    {documents.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  📄
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-500">
                Documents currently stored in the archive.
              </p>

            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Categories
                  </p>

                  <p className="mt-3 text-4xl font-bold text-slate-900">
                    {categories.length}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  🗂️
                </div>

              </div>

              <p className="mt-4 text-sm text-slate-500">
                Document categories represented in the archive.
              </p>

            </div>

            {/* Latest Upload */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div className="min-w-0">

                  <p className="text-sm font-medium text-slate-500">
                    Latest Upload
                  </p>

                  {latestDocument ? (
                    <>
                      <p className="mt-3 truncate text-lg font-bold text-slate-900">
                        {latestDocument.originalName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(latestDocument.createdAt)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-lg font-bold text-slate-900">
                      No uploads yet
                    </p>
                  )}

                </div>

                <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                  🕘
                </div>

              </div>

              {latestDocument && (
                <Link
                  href={`/secure/documents/${latestDocument.id}`}
                  className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Open latest document →
                </Link>
              )}

            </div>

          </div>

          {/* Quick Actions */}
          <div className="mt-10">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Common Founder Archive tasks.
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <Link
                href="/secure/documents"
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  📁
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Documents
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Browse the complete archive.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-700">
                  Open Archive →
                </p>
              </Link>

              <Link
                href="/secure/upload"
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  ↑
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Upload
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new company document.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-700">
                  Upload File →
                </p>
              </Link>

              <Link
                href="/constitution"
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  📜
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Constitution
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View the CustoNexus Constitution.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-700">
                  View Constitution →
                </p>
              </Link>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
                  🛡️
                </div>

                <h3 className="mt-4 font-bold text-slate-900">
                  Security
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Archive access is restricted to authenticated users.
                </p>

                <p className="mt-4 text-sm font-semibold text-slate-500">
                  Protected
                </p>

              </div>

            </div>

          </div>

          {/* Archive Categories */}
          <div className="mt-10">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Archive Categories
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Organise the company's important records.
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Constitution
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Foundational documents
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Founder Documents
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Founder records
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Company
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Corporate documents
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-900">
                  Legal
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Legal records
                </p>
              </div>

            </div>

          </div>

          {/* Recent Documents */}
          <div className="mt-10">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Documents
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  The latest records added to the secure archive.
                </p>
              </div>

              <Link
                href="/secure/documents"
                className="text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                View all documents →
              </Link>

            </div>

            {documents.length === 0 ? (

              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">

                <div className="text-4xl">
                  📂
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No documents yet
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Upload your first company document to begin building the
                  archive.
                </p>

                <Link
                  href="/secure/upload"
                  className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Upload Document
                </Link>

              </div>

            ) : (

              <div className="mt-5 space-y-4">

                {documents.slice(0, 5).map((document) => (

                  <div
                    key={document.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex min-w-0 items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">
                          📄
                        </div>

                        <div className="min-w-0">

                          <h3 className="break-words font-semibold text-slate-900">
                            {document.originalName}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

                            <span>
                              {document.category}
                            </span>

                            <span>
                              {formatFileSize(document.size)}
                            </span>

                            <span>
                              {formatDate(document.createdAt)}
                            </span>

                          </div>

                          {document.description && (
                            <p className="mt-2 break-words text-sm text-slate-600">
                              {document.description}
                            </p>
                          )}

                        </div>

                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">

                        <Link
                          href={`/secure/documents/${document.id}`}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          Open
                        </Link>

                        <a
                          href={`/api/documents/${document.id}?download=true`}
                          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
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

        </div>
      </div>
    </main>
  );
}
