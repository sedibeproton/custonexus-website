import Database from "better-sqlite3";
import { getPostgresPool } from "@/lib/db/postgres";
import { getPersistenceBackend } from "@/lib/persistence-mode";

export const authDb = getPersistenceBackend() === "sqlite"
  ? new Database("./sqlite.db")
  : null;

function addColumnIfMissing(
  table: "user" | "session",
  column: string,
  definition: string
) {
  if (!authDb) return;
  const columns = authDb
    .prepare(`PRAGMA table_info(${table})`)
    .all() as Array<{ name: string }>;

  if (!columns.some((existingColumn) => existingColumn.name === column)) {
    try {
      authDb.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    } catch (error) {
      // Next.js may evaluate this module in parallel workers. Another worker
      // can complete the same additive migration after our PRAGMA check.
      if (!(error instanceof Error) || !error.message.includes("duplicate column name")) {
        throw error;
      }
    }
  }
}

// Better Auth's admin plugin needs these fields. Keeping this migration here
// makes existing Railway databases upgrade safely when the application starts.
addColumnIfMissing("user", "role", "TEXT DEFAULT 'user'");
addColumnIfMissing("user", "banned", "INTEGER DEFAULT 0");
addColumnIfMissing("user", "banReason", "TEXT");
addColumnIfMissing("user", "banExpires", "date");
addColumnIfMissing("session", "impersonatedBy", "TEXT");

authDb?.prepare("UPDATE user SET role = 'user' WHERE role IS NULL OR role = ''").run();

export const authDatabase = authDb ?? getPostgresPool();
