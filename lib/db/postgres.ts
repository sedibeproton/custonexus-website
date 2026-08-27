import { Pool, type PoolClient, type QueryResultRow } from "pg";

const globalForPostgres = globalThis as unknown as { custonexusPool?: Pool };

export function getPostgresPool() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error("DATABASE_URL is required when PostgreSQL persistence is enabled.");
  }

  if (!globalForPostgres.custonexusPool) {
    globalForPostgres.custonexusPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      ssl: connectionString.includes("localhost") ? undefined : { rejectUnauthorized: false },
    });
    globalForPostgres.custonexusPool.on("error", (error) => {
      console.error("Unexpected PostgreSQL pool error:", error.message);
    });
  }

  return globalForPostgres.custonexusPool;
}

export async function postgresRows<T extends QueryResultRow>(text: string, values: unknown[] = []) {
  return (await getPostgresPool().query<T>(text, values)).rows;
}

export async function withPostgresTransaction<T>(work: (client: PoolClient) => Promise<T>) {
  const client = await getPostgresPool().connect();
  try {
    await client.query("BEGIN");
    const result = await work(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
