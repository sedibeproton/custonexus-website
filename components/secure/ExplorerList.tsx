"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardPaste, Copy, File, Folder, Scissors } from "lucide-react";
import { useState, useSyncExternalStore, type KeyboardEvent } from "react";
import ExplorerItemActions from "./ExplorerItemActions";

export type ExplorerRow = { kind: "file" | "folder"; id: string; name: string; meta: string; href: string };
type Clipboard = {
  mode: "cut" | "copy";
  source: string | null;
  items: Pick<ExplorerRow, "kind" | "id" | "name">[];
};

const clipboardEvent = "custonexus:explorer-clipboard";
const fallbackClipboard = new Map<string, string>();
const keyFor = ({ kind, id }: Pick<ExplorerRow, "kind" | "id">) => `${kind}:${id}`;
function readClipboard(key: string) {
  try { return window.sessionStorage.getItem(key); }
  catch { return fallbackClipboard.get(key) ?? null; }
}
function subscribe(callback: () => void) {
  window.addEventListener(clipboardEvent, callback);
  return () => window.removeEventListener(clipboardEvent, callback);
}

export default function ExplorerList({ rows, folders, folderId, folderName, accountId, isAdmin, filtered }: {
  rows: ExplorerRow[];
  folders: { id: string; name: string }[];
  folderId: string | null;
  folderName: string;
  accountId: string;
  isAdmin: boolean;
  filtered: boolean;
}) {
  const router = useRouter();
  const storageKey = `custonexus:files:${accountId}`;
  const raw = useSyncExternalStore(subscribe, () => readClipboard(storageKey), () => null);
  const clipboard: Clipboard | null = raw ? JSON.parse(raw) : null;
  const [selected, setSelected] = useState<string[]>([]);
  const [reverse, setReverse] = useState(false);
  const [pasting, setPasting] = useState(false);
  const [message, setMessage] = useState("");
  const chosen = rows.filter((row) => selected.includes(keyFor(row)));
  const canCopy = chosen.length > 0 && chosen.every(({ kind }) => kind === "file");
  const canPaste = !!clipboard?.items.length && (clipboard.mode === "copy" || clipboard.source !== folderId);
  const rowOrder = [...rows].sort((a, b) => a.kind === b.kind
    ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }) * (reverse ? -1 : 1)
    : a.kind === "folder" ? -1 : 1);
  const control = "inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-blue-900 hover:bg-blue-50 disabled:opacity-45";

  function saveClipboard(data: Clipboard | null) {
    try {
      if (data) window.sessionStorage.setItem(storageKey, JSON.stringify(data));
      else window.sessionStorage.removeItem(storageKey);
    } catch {
      if (data) fallbackClipboard.set(storageKey, JSON.stringify(data));
      else fallbackClipboard.delete(storageKey);
    }
    window.dispatchEvent(new Event(clipboardEvent));
  }

  function collect(mode: Clipboard["mode"]) {
    if (!chosen.length || pasting || (mode === "copy" && !canCopy)) return;
    saveClipboard({ mode, source: folderId, items: chosen.map(({ kind, id, name }) => ({ kind, id, name })) });
    setSelected([]);
    setMessage(`${chosen.length} selected for ${mode === "cut" ? "moving" : "copying"}. Open a folder and choose Paste.`);
  }

  async function paste() {
    if (!clipboard || !canPaste || pasting) return;
    setPasting(true);
    const remaining: Clipboard["items"] = [];
    let firstError = "";
    for (const item of clipboard.items) {
      try {
        const file = item.kind === "file";
        const response = await fetch(file ? `/api/documents/${encodeURIComponent(item.id)}/organize` : `/api/folders/${encodeURIComponent(item.id)}`, {
          method: file ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clipboard.mode === "copy"
            ? { action: "copy", folderId, name: `Copy of ${item.name}`.slice(0, 180) }
            : { action: "move", [file ? "folderId" : "parentId"]: folderId }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || "The request failed.");
        }
      } catch (error) {
        remaining.push(item);
        if (!firstError) firstError = `${item.name}: ${error instanceof Error ? error.message : "The request failed."}`;
      }
    }
    saveClipboard(remaining.length ? { ...clipboard, items: remaining } : null);
    setMessage(`${clipboard.items.length - remaining.length} item(s) ${clipboard.mode === "cut" ? "moved" : "copied"} to ${folderName}.${firstError ? ` Could not paste ${remaining.length}: ${firstError}` : ""}`);
    setPasting(false);
    router.refresh();
  }

  function shortcuts(event: KeyboardEvent<HTMLDivElement>) {
    if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey ||
        (event.target instanceof Element && event.target.closest("input:not([type=checkbox]), textarea, select, dialog, [contenteditable]"))) return;
    const key = event.key.toLowerCase();
    if (key === "a" && rows.length) { event.preventDefault(); setMessage(""); setSelected(rows.map(keyFor)); }
    if (key === "x" && chosen.length) { event.preventDefault(); collect("cut"); }
    if (key === "c" && canCopy) { event.preventDefault(); collect("copy"); }
    if (key === "v" && canPaste) { event.preventDefault(); void paste(); }
  }

  return <div onKeyDown={shortcuts}>
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2" aria-label="File tools" role="group">
      <button type="button" className={control} disabled={pasting || !chosen.length} onClick={() => collect("cut")}><Scissors size={16} aria-hidden /> Cut</button>
      <button type="button" className={control} disabled={pasting || !canCopy} onClick={() => collect("copy")}><Copy size={16} aria-hidden /> Copy</button>
      <button type="button" className={control} disabled={pasting || !canPaste} onClick={() => void paste()}><ClipboardPaste size={16} aria-hidden /> {pasting ? "Pasting…" : "Paste"}</button>
      <button type="button" className={control} onClick={() => setReverse((value) => !value)} aria-label={reverse ? "Sort names A to Z" : "Sort names Z to A"}>{reverse ? "Name Z–A" : "Name A–Z"}</button>
      {rows.length > 0 && <button type="button" className={control} onClick={() => {
        setMessage("");
        setSelected(chosen.length === rows.length ? [] : rows.map(keyFor));
      }}>{chosen.length === rows.length ? "Clear selection" : "Select all"}</button>}
    </div>
    {(clipboard || message || chosen.length > 0) && <div className="flex flex-wrap items-center gap-x-3 border-b border-slate-100 px-3 py-2 text-sm text-slate-700">
      <p role="status" className="min-w-0 break-words">{message || (chosen.length ? `${chosen.length} selected${canCopy ? "" : " · Folders can be cut and moved"}` : clipboard ? `${clipboard.items.length} ready to ${clipboard.mode === "cut" ? "move" : "copy"}` : "")}</p>
      {clipboard && <button type="button" disabled={pasting} className="min-h-10 font-semibold text-blue-800 underline" onClick={() => { saveClipboard(null); setMessage(""); }}>Clear clipboard</button>}
    </div>}
    {rowOrder.length ? <ul className="divide-y divide-slate-100">
      {rowOrder.map((row) => {
        const { kind, id, name, meta, href } = row;
        const key = keyFor(row);
        const checked = selected.includes(key);
        const Icon = kind === "folder" ? Folder : File;
        return <li key={key} className={`flex min-w-0 items-center gap-2 px-2 py-2 sm:px-4 ${checked ? "bg-blue-50" : ""}`}>
          <label className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-blue-50">
            <input type="checkbox" checked={checked} aria-label={`Select ${name}`} className="size-5 accent-blue-700"
              onChange={(event) => { const checked = event.target.checked; setMessage(""); setSelected((items) => checked ? [...items, key] : items.filter((item) => item !== key)); }} />
          </label>
          <Link href={href} className="flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-lg py-1 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-600">
            <Icon size={20} aria-hidden className={`shrink-0 ${kind === "folder" ? "text-blue-700" : "text-slate-600"}`} />
            <span className="min-w-0">
              <span className="block break-words text-sm font-semibold text-slate-950 sm:text-base">{name}</span>
              <span className="block text-xs text-slate-600">{meta}</span>
            </span>
          </Link>
          <ExplorerItemActions kind={kind} id={id} name={name} folders={folders} currentFolderId={folderId} isAdmin={isAdmin} />
        </li>;
      })}
    </ul> : <div className="px-4 py-12 text-center">
      <h2 className="font-bold text-slate-950">{filtered ? "No matching items" : "This folder is empty"}</h2>
      <p className="mt-2 text-sm text-slate-600">{filtered ? "Try a different search or clear the filter." : "Upload a file, create a folder or paste items here."}</p>
    </div>}
  </div>;
}
