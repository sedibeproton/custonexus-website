"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const categories = [
  "Constitution",
  "Founder Documents",
  "Company",
  "Legal",
  "Financial",
  "Operations",
  "Other",
];

export default function SecureUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("Company");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a document.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("category", category);
      formData.append("description", description);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setMessage("Document uploaded successfully.");
      setFile(null);
      setDescription("");
      setCategory("Company");

      const fileInput = document.getElementById(
        "document-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload document."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/secure/documents"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← Back to Documents
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              Secure Archive
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Upload Document
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Add a confidential company document to the CustoNexus Founder
              Archive.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="document-file"
                className="block text-sm font-semibold text-slate-900"
              >
                Document
              </label>

              <input
                id="document-file"
                type="file"
                onChange={(event) =>
                  setFile(event.target.files?.[0] ?? null)
                }
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />

              <p className="mt-2 text-xs text-slate-500">
                Select the document you want to store in the secure archive.
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-900"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-900"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                placeholder="Optional description of this document..."
                className="mt-2 block w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {message && (
              <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/secure/documents"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={uploading}
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}