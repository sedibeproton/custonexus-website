import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight, File, Folder, HardDrive, LayoutDashboard, Upload } from "lucide-react";

import { auth } from "@/lib/auth";
import {
  getDocumentsByFolder,
  getFolderBreadcrumbs,
  getFolderById,
  getFolders,
} from "@/lib/documents";
import CreateFolderButton from "@/components/CreateFolderButton";
import DeleteDocumentButton from "@/components/DeleteDocumentButton";

type PageProps = { searchParams: Promise<{ folder?: string }> };

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function FileExplorerPage({ searchParams }: PageProps) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/secure/login");

  const { folder: requestedFolderId } = await searchParams;
  const folderId = requestedFolderId || null;
  const currentFolder = folderId ? await getFolderById(folderId) : undefined;
  if (folderId && !currentFolder) notFound();

  const folders = await getFolders(folderId);
  const files = await getDocumentsByFolder(folderId);
  const breadcrumbs = folderId ? await getFolderBreadcrumbs(folderId) : [];
  const uploadHref = folderId
    ? `/secure/upload?folder=${encodeURIComponent(folderId)}`
    : "/secure/upload";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Founder Archive</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">Files</h1>
            <p className="mt-2 text-slate-600">Browse and organise your secure company archive.</p>
          </div>
          <Link href="/secure/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700">
            <LayoutDashboard size={17} /> Dashboard
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Folder path" className="flex min-w-0 flex-wrap items-center gap-1 text-sm">
              <Link href="/secure/documents" className="flex items-center gap-2 rounded-lg px-2 py-1 font-semibold text-blue-700 hover:bg-blue-50">
                <HardDrive size={17} /> My files
              </Link>
              {breadcrumbs.map((folder) => (
                <span key={folder.id} className="flex min-w-0 items-center gap-1">
                  <ChevronRight size={16} className="text-slate-400" />
                  <Link href={`/secure/documents?folder=${folder.id}`} className="max-w-48 truncate rounded-lg px-2 py-1 font-medium text-slate-700 hover:bg-slate-100">
                    {folder.name}
                  </Link>
                </span>
              ))}
            </nav>
            <div className="flex flex-wrap gap-3">
              <CreateFolderButton parentId={folderId} />
              <Link href={uploadHref} className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800">
                <Upload size={18} /> Upload file
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid-cols-[minmax(0,1fr)_140px_230px]">
            <span>Name</span><span className="hidden sm:block">Size</span><span>Actions</span>
          </div>

          {folders.map((folder) => (
            <div key={folder.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-slate-100 px-6 py-4 hover:bg-blue-50/40 sm:grid-cols-[minmax(0,1fr)_140px_230px]">
              <Link href={`/secure/documents?folder=${folder.id}`} className="flex min-w-0 items-center gap-3 font-semibold text-slate-900">
                <Folder className="shrink-0 fill-blue-100 text-blue-600" size={27} />
                <span className="truncate">{folder.name}</span>
              </Link>
              <span className="hidden text-sm text-slate-400 sm:block">Folder</span>
              <Link href={`/secure/documents?folder=${folder.id}`} className="text-sm font-semibold text-blue-700">Open</Link>
            </div>
          ))}

          {files.map((file) => (
            <div key={file.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-b-0 hover:bg-slate-50 sm:grid-cols-[minmax(0,1fr)_140px_230px]">
              <Link href={`/secure/documents/${file.id}`} className="flex min-w-0 items-center gap-3 font-medium text-slate-900">
                <File className="shrink-0 text-slate-500" size={25} />
                <span className="truncate">{file.originalName}</span>
              </Link>
              <span className="hidden text-sm text-slate-500 sm:block">{formatFileSize(file.size)}</span>
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/api/documents/${file.id}?download=true`} className="text-sm font-semibold text-blue-700">Download</Link>
                <DeleteDocumentButton documentId={file.id} documentName={file.originalName} compact />
              </div>
            </div>
          ))}

          {folders.length === 0 && files.length === 0 && (
            <div className="px-6 py-20 text-center">
              <Folder className="mx-auto text-slate-300" size={52} />
              <h2 className="mt-4 text-xl font-bold text-slate-900">This folder is empty</h2>
              <p className="mt-2 text-slate-500">Create a folder or upload a file to get started.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
