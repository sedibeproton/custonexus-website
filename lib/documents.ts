import Database from "better-sqlite3";

const db = new Database("./sqlite.db");

db.exec(`
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
  )
`);

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
};

export function getDocuments(): DocumentRecord[] {
  return db
    .prepare(`
      SELECT *
      FROM documents
      ORDER BY createdAt DESC
    `)
    .all() as DocumentRecord[];
}

export function getDocumentById(
  id: string
): DocumentRecord | undefined {
  return db
    .prepare(`
      SELECT *
      FROM documents
      WHERE id = ?
    `)
    .get(id) as DocumentRecord | undefined;
}

export function insertDocument(document: DocumentRecord): void {
  db.prepare(`
    INSERT INTO documents (
      id,
      name,
      originalName,
      category,
      description,
      filePath,
      mimeType,
      size,
      uploadedBy,
      createdAt,
      updatedAt
    )
    VALUES (
      @id,
      @name,
      @originalName,
      @category,
      @description,
      @filePath,
      @mimeType,
      @size,
      @uploadedBy,
      @createdAt,
      @updatedAt
    )
  `).run(document);
}
export function deleteDocument(id: string): void {
  db.prepare(`
    DELETE FROM documents
    WHERE id = ?
  `).run(id);
}