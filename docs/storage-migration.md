# PostgreSQL and R2 storage transition

The application defaults to the legacy SQLite database and local document directory until an approved production migration is complete.

## Backend switches

- `PERSISTENCE_BACKEND=sqlite` keeps structured data in `./sqlite.db` (default).
- `PERSISTENCE_BACKEND=postgres` uses `DATABASE_URL` for Better Auth, enquiries and document metadata.
- `DOCUMENT_STORAGE_BACKEND=local` keeps binary files in `./data/documents` (default).
- `DOCUMENT_STORAGE_BACKEND=r2` uses the private Cloudflare R2 bucket.

Never enable the PostgreSQL/R2 modes in production before the storage migration has completed and its verification has passed.

## Required production variables

`DATABASE_URL`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ENDPOINT`, and `R2_REGION` are server-only values. Do not prefix them with `NEXT_PUBLIC_`.

## Commands

```powershell
npm run audit:legacy-storage
npm run migrate:storage -- --dry-run
npm run migrate:storage
```

The real migration applies versioned PostgreSQL schema migrations, copies structured SQLite records without changing IDs or password hashes, verifies PostgreSQL counts, and records a source fingerprint. Legacy document rows and `data/documents` are intentionally excluded. The migration does not connect to R2 or create any R2 objects.

For a downloaded production backup, point the script at the preserved copy without replacing repository files:

```powershell
$env:LEGACY_SQLITE_PATH = "C:\secure-backup\sqlite.db"
npm run migrate:storage -- --dry-run
```

## Cutover

After a verified migration, set `PERSISTENCE_BACKEND=postgres` and `DOCUMENT_STORAGE_BACKEND=r2` on Railway and deploy once. The private R2 bucket remains empty until the first new production upload. Keep an immutable backup of the original SQLite database until the new system has completed a restore test.
