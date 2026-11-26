import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Search, Upload } from "lucide-react";
import CreateFolderButton from "@/components/CreateFolderButton";
import ExplorerList from "@/components/secure/ExplorerList";
import { requireSecurePage } from "@/lib/business/page-auth";
import { getAllFolders, getDocumentsByFolder, getFolderBreadcrumbs, getFolderById, getFolders } from "@/lib/documents";

type PageProps = { searchParams: Promise<{ folder?: string | string[]; q?: string | string[] }> };
const filesUrl = (id?: string | null) => id ? `/secure/documents?folder=${encodeURIComponent(id)}` : "/secure/documents";

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function FileExplorerPage({ searchParams }: PageProps) {
  const access = await requireSecurePage();
  const params = await searchParams;
  const folderId = typeof params.folder === "string" ? params.folder || null : null;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
  const current = folderId ? await getFolderById(folderId) : null;
  if (folderId && !current) notFound();

  const [folders, files, breadcrumbs, allFolders] = await Promise.all([
    getFolders(folderId), getDocumentsByFolder(folderId), folderId ? getFolderBreadcrumbs(folderId) : [], getAllFolders(),
  ]);
  const matches = (name: string) => name.toLowerCase().includes(query.toLowerCase());
  const destinations = allFolders.map(({ id, name }) => ({ id, name }));
  const rows = [
    ...folders.filter(({ name }) => matches(name)).map(({ id, name }) => ({
      kind: "folder" as const, id, name, meta: "Folder", href: filesUrl(id),
    })),
    ...files.filter(({ originalName }) => matches(originalName)).map(({ id, originalName, size }) => ({
      kind: "file" as const, id, name: originalName, meta: formatFileSize(size), href: `/secure/documents/${encodeURIComponent(id)}`,
    })),
  ];

  return <main className="min-h-screen bg-slate-100 px-3 py-5 sm:px-6 sm:py-10">
    <div className="mx-auto max-w-5xl">
      <Link href={current ? filesUrl(current.parentId) : "/secure/archive"} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-blue-800">
        <ArrowLeft size={17} aria-hidden /> {current ? "Up one folder" : "Company archive"}
      </Link>
      <header className="mb-4 mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-800">File explorer</p>
          <h1 className="mt-1 break-words text-2xl font-bold text-slate-950 sm:text-4xl">{current?.name ?? "Files"}</h1>
          <p className="mt-1 text-sm text-slate-600">{folders.length} {folders.length === 1 ? "folder" : "folders"} · {files.length} {files.length === 1 ? "file" : "files"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={folderId ? `/secure/upload?folder=${encodeURIComponent(folderId)}` : "/secure/upload"} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-800 px-4 text-sm font-bold text-white hover:bg-blue-900">
            <Upload size={17} aria-hidden /> Upload file
          </Link>
          <CreateFolderButton parentId={folderId} />
        </div>
      </header>
      <section aria-label="Folder contents" className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {current && <nav aria-label="Folder path" className="flex items-center gap-1 overflow-x-auto border-b border-slate-100 px-3 text-sm">
          <Link href={filesUrl()} className="shrink-0 py-3 font-semibold text-blue-800">My files</Link>
          {breadcrumbs.map((folder) => <span key={folder.id} className="flex shrink-0 items-center gap-1">
            <ChevronRight size={14} aria-hidden className="text-slate-500" />
            <Link href={filesUrl(folder.id)} aria-current={folder.id === folderId ? "page" : undefined} className="max-w-48 truncate py-3 text-slate-700">{folder.name}</Link>
          </span>)}
        </nav>}
        <form action="/secure/documents" className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-3">
          {folderId && <input type="hidden" name="folder" value={folderId} />}
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search this folder</span>
            <Search size={17} aria-hidden className="pointer-events-none absolute left-3 top-3.5 text-slate-500" />
            <input key={query} name="q" type="search" maxLength={120} defaultValue={query} placeholder="Search this folder" className="h-11 w-full rounded-xl border border-slate-300 pl-9 pr-2 text-base" />
          </label>
          <button className="min-h-11 rounded-xl border border-slate-300 px-3 text-sm font-bold text-blue-800">Search</button>
          {query && <Link href={filesUrl(folderId)} className="rounded-lg px-2 py-2 text-sm font-semibold text-blue-800">Clear</Link>}
        </form>
        <ExplorerList key={JSON.stringify([folderId, query])} rows={rows} folders={destinations}
          folderId={folderId} folderName={current?.name ?? "My files"} accountId={access.session.user.id}
          isAdmin={access.isAdmin} filtered={Boolean(query)} />
      </section>
    </div>
  </main>;
}
