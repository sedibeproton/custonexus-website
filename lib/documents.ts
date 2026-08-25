import Database from "better-sqlite3";

const db = new Database("./sqlite.db");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS folders (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    parentId TEXT,
    createdBy TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (parentId) REFERENCES folders(id) ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES user(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    originalName TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    filePath TEXT NOT NULL,
    mimeType TEXT NOT NULL,
    size INTEGER NOT NULL,
    uploadedBy TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (uploadedBy) REFERENCES user(id) ON DELETE CASCADE
  );
`);

const documentColumns = db.prepare("PRAGMA table_info(documents)").all() as Array<{ name: string }>;

if (!documentColumns.some((column) => column.name === "folderId")) {
  db.exec("ALTER TABLE documents ADD COLUMN folderId TEXT REFERENCES folders(id) ON DELETE SET NULL");
}

export type DocumentRecord = {
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
  folderId: string | null;
};

export type FolderRecord = {
  id: string;
  name: string;
  parentId: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export function getDocuments(): DocumentRecord[] {
  return db.prepare("SELECT * FROM documents ORDER BY createdAt DESC").all() as DocumentRecord[];
}

export function getDocumentsByFolder(folderId: string | null): DocumentRecord[] {
  const statement = folderId === null
    ? db.prepare("SELECT * FROM documents WHERE folderId IS NULL ORDER BY originalName COLLATE NOCASE")
    : db.prepare("SELECT * FROM documents WHERE folderId = ? ORDER BY originalName COLLATE NOCASE");

  return (folderId === null ? statement.all() : statement.all(folderId)) as DocumentRecord[];
}

export function getDocumentById(id: string): DocumentRecord | undefined {
  return db.prepare("SELECT * FROM documents WHERE id = ?").get(id) as DocumentRecord | undefined;
}

export function getFolders(parentId: string | null): FolderRecord[] {
  const statement = parentId === null
    ? db.prepare("SELECT * FROM folders WHERE parentId IS NULL ORDER BY name COLLATE NOCASE")
    : db.prepare("SELECT * FROM folders WHERE parentId = ? ORDER BY name COLLATE NOCASE");

  return (parentId === null ? statement.all() : statement.all(parentId)) as FolderRecord[];
}

export function getFolderById(id: string): FolderRecord | undefined {
  return db.prepare("SELECT * FROM folders WHERE id = ?").get(id) as FolderRecord | undefined;
}

export function getFolderBreadcrumbs(id: string): FolderRecord[] {
  const breadcrumbs: FolderRecord[] = [];
  let current = getFolderById(id);

  while (current && breadcrumbs.length < 100) {
    breadcrumbs.unshift(current);
    current = current.parentId ? getFolderById(current.parentId) : undefined;
  }

  return breadcrumbs;
}

export function insertFolder(folder: FolderRecord): void {
  db.prepare(`
    INSERT INTO folders (id, name, parentId, createdBy, createdAt, updatedAt)
    VALUES (@id, @name, @parentId, @createdBy, @createdAt, @updatedAt)
  `).run(folder);
}

export function insertDocument(document: DocumentRecord): void {
  db.prepare(`
    INSERT INTO documents (
      id, name, originalName, category, description, filePath, mimeType,
      size, uploadedBy, createdAt, updatedAt, folderId
    ) VALUES (
      @id, @name, @originalName, @category, @description, @filePath, @mimeType,
      @size, @uploadedBy, @createdAt, @updatedAt, @folderId
    )
  `).run(document);
}

export function deleteDocument(id: string): void {
  db.prepare("DELETE FROM documents WHERE id = ?").run(id);
}
