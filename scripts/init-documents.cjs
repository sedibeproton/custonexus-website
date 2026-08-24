const Database = require("better-sqlite3");

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

console.log("Documents table initialized successfully.");

db.close();
