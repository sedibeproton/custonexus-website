BEGIN;

CREATE TABLE IF NOT EXISTS bank_accounts (
  id text PRIMARY KEY,
  label text NOT NULL,
  bank_name text NOT NULL,
  account_name text NOT NULL,
  account_number text NOT NULL,
  branch_code text,
  account_type text,
  swift_bic text,
  payment_reference_instructions text,
  active boolean NOT NULL DEFAULT true,
  created_by text NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
  updated_by text REFERENCES "user"(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS tax_type text NOT NULL DEFAULT 'STANDARD';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS tax_label text NOT NULL DEFAULT 'VAT';
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS tax_basis_points integer NOT NULL DEFAULT 1500 CHECK (tax_basis_points BETWEEN 0 AND 10000);
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS bank_account_id text REFERENCES bank_accounts(id) ON DELETE SET NULL;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_type text NOT NULL DEFAULT 'STANDARD';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_label text NOT NULL DEFAULT 'VAT';
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS tax_basis_points integer NOT NULL DEFAULT 1500 CHECK (tax_basis_points BETWEEN 0 AND 10000);
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS bank_account_id text REFERENCES bank_accounts(id) ON DELETE SET NULL;

ALTER TABLE quote_items ADD COLUMN IF NOT EXISTS discount_type text NOT NULL DEFAULT 'CASH';
ALTER TABLE quote_items ADD COLUMN IF NOT EXISTS discount_basis_points integer NOT NULL DEFAULT 0 CHECK (discount_basis_points BETWEEN 0 AND 10000);
ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS discount_type text NOT NULL DEFAULT 'CASH';
ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS discount_basis_points integer NOT NULL DEFAULT 0 CHECK (discount_basis_points BETWEEN 0 AND 10000);

UPDATE company_settings
SET vat_enabled = true, vat_basis_points = 1500
WHERE vat_enabled = false AND vat_basis_points = 0;

COMMIT;
