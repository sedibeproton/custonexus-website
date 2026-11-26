BEGIN;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS vat_registered boolean NOT NULL DEFAULT false;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS vat_effective_date date;
UPDATE company_settings
SET vat_enabled = false, vat_basis_points = 0, vat_number = NULL, vat_effective_date = NULL
WHERE NOT vat_registered;
ALTER TABLE company_settings ALTER COLUMN vat_enabled SET DEFAULT false;
ALTER TABLE company_settings ALTER COLUMN vat_basis_points SET DEFAULT 0;
COMMIT;
