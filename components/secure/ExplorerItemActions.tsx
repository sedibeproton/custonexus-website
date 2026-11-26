"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Ellipsis } from "lucide-react";
import type { FolderRecord } from "@/lib/documents";

type Action = "rename" | "move" | "copy" | "delete";
type Props = {
  kind: "file" | "folder";
  id: string;
  name: string;
  folders: Pick<FolderRecord, "id" | "name">[];
  currentFolderId: string | null;
  isAdmin: boolean;
};

const labels: Record<Action, string> = { rename: "Rename", move: "Move", copy: "Copy", delete: "Delete" };

export default function ExplorerItemActions({ kind, id, name, folders, currentFolderId, isAdmin }: Props) {
  const router = useRouter();
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const itemUrl = kind === "file" ? `/api/documents/${id}/organize` : `/api/folders/${id}`;

  function open() {
    setAction(null);
    setError("");
    dialog.current?.showModal();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!action || busy) return;
    const form = new FormData(event.currentTarget);
    const destination = String(form.get("destination") ?? "");
    const nextName = String(form.get("name") ?? "").trim();
    if ((action === "rename" || action === "copy") && !nextName) {
      setError("Enter a name.");
      return;
    }
    const payload = action === "rename" ? { action, name: nextName }
      : action === "copy" ? { action, name: nextName, folderId: destination }
      : action === "move" ? { action, [kind === "folder" ? "parentId" : "folderId"]: destination } : undefined;
    const url = action === "delete" && kind === "file" ? `/api/documents/${id}/delete` : itemUrl;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(url, {
        method: action === "delete" ? "DELETE" : kind === "file" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: payload && JSON.stringify(payload),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to complete the action.");
      }
      dialog.current?.close();
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to complete the action.");
    } finally {
      setBusy(false);
    }
  }

  return <>
    <button type="button" aria-label={`Actions for ${name}`} aria-haspopup="dialog" onClick={open}
      className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-700 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-600">
      <Ellipsis size={21} aria-hidden />
    </button>
    <dialog ref={dialog} aria-labelledby={titleId} onCancel={(event) => { if (busy) event.preventDefault(); }}
      className="fixed inset-x-0 bottom-0 top-auto mx-auto max-h-[85dvh] w-full max-w-md overflow-auto rounded-t-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl backdrop:bg-slate-950/50 sm:inset-y-0 sm:my-auto sm:rounded-3xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={titleId} className="text-lg font-bold">{action ? labels[action] : "File and folder actions"}</h2>
          <p className="mt-1 break-all text-sm text-slate-600">{name}</p>
        </div>
        <button type="button" disabled={busy} onClick={() => dialog.current?.close()} className="min-h-11 shrink-0 rounded-lg px-3 text-sm font-semibold text-blue-800">Close</button>
      </div>
      {!action ? <div className="grid gap-2">
        {kind === "file" && <a className="rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-800" href={`/api/documents/${id}?download=true`} onClick={() => dialog.current?.close()}>Download</a>}
        {(["rename", "move", ...(kind === "file" ? ["copy"] : []), ...(isAdmin ? ["delete"] : [])] as Action[]).map((item) => (
          <button type="button" key={item} onClick={() => setAction(item)} className={`rounded-xl px-4 py-3 text-left font-semibold ${item === "delete" ? "bg-red-50 text-red-800" : "bg-slate-50 text-slate-800"}`}>{labels[item]}</button>
        ))}
      </div> : <form key={action} onSubmit={submit} className="grid gap-4">
        {(action === "rename" || action === "copy") && <label className="text-sm font-semibold">Name
          <input name="name" required defaultValue={action === "copy" ? `Copy of ${name}` : name} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base" />
        </label>}
        {(action === "move" || action === "copy") && <label className="text-sm font-semibold">Destination folder
          <select name="destination" defaultValue={currentFolderId ?? ""} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base">
            <option value="">My files</option>
            {folders.filter((folder) => kind !== "folder" || folder.id !== id).map((folder) => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
          </select>
        </label>}
        {action === "delete" && <p className="text-sm text-slate-700">{kind === "file" ? "This file will be removed from active files." : "Only empty folders can be deleted."}</p>}
        {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" disabled={busy} onClick={() => { setAction(null); setError(""); }} className="min-h-11 rounded-lg border px-4 font-semibold">Back</button>
          <button disabled={busy} className={`min-h-11 rounded-lg px-4 font-semibold text-white disabled:opacity-60 ${action === "delete" ? "bg-red-800" : "bg-blue-800"}`}>{busy ? "Working…" : labels[action]}</button>
        </div>
      </form>}
    </dialog>
  </>;
}
