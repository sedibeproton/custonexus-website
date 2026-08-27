import Database from "better-sqlite3";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const sqlitePath = resolve(process.cwd(), "sqlite.db");
const documentRoot = resolve(process.cwd(), "data", "documents");
const db = new Database(sqlitePath, { readonly: true, fileMustExist: true });

const tables = db.prepare(
  "SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
).all();

for (const table of tables) {
  const safeName = String(table.name).replaceAll('"', '""');
  const { count } = db.prepare(`SELECT COUNT(*) AS count FROM "${safeName}"`).get();
  console.log(`TABLE ${table.name}: ${count}`);
  console.log(table.sql);
}

if (tables.some((table) => table.name === "documents")) {
  const documents = db.prepare(
    "SELECT id, originalName, filePath, mimeType, size, category, uploadedBy, createdAt, updatedAt, folderId FROM documents ORDER BY createdAt"
  ).all();
  console.log("DOCUMENT METADATA");
  console.log(JSON.stringify(documents, null, 2));
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolutePath);
    const stats = statSync(absolutePath);
    return [{ path: relative(documentRoot, absolutePath), size: stats.size }];
  });
}

const files = walk(documentRoot);
console.log(`LOCAL DOCUMENT FILES: ${files.length}`);
console.log(JSON.stringify(files, null, 2));

db.close();
