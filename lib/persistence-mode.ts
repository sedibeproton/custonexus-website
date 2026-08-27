export type PersistenceBackend = "sqlite" | "postgres";
export type DocumentStorageBackend = "local" | "r2";

export function getPersistenceBackend(): PersistenceBackend {
  return process.env.PERSISTENCE_BACKEND === "postgres" ? "postgres" : "sqlite";
}

export function getDocumentStorageBackend(): DocumentStorageBackend {
  return process.env.DOCUMENT_STORAGE_BACKEND === "r2" ? "r2" : "local";
}
