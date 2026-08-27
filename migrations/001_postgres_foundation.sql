BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image" text,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "role" text NOT NULL DEFAULT 'user' CHECK ("role" IN ('user', 'admin')),
  "banned" boolean NOT NULL DEFAULT false,
  "banReason" text,
  "banExpires" timestamptz
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamptz NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "impersonatedBy" text
);
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session"("userId");

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  "scope" text,
  "password" text,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"("userId");

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification"("identifier");

CREATE TABLE IF NOT EXISTS enquiries (
  id text PRIMARY KEY,
  created_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'new',
  intent text NOT NULL,
  service text NOT NULL,
  project_type text,
  full_name text NOT NULL,
  company text NOT NULL,
  role text,
  email text NOT NULL,
  phone text NOT NULL,
  location text,
  preferred_contact text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries(created_at DESC);

CREATE TABLE IF NOT EXISTS folders (
  id text PRIMARY KEY,
  name text NOT NULL,
  parent_id text REFERENCES folders(id) ON DELETE CASCADE,
  created_by text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS documents (
  id text PRIMARY KEY,
  title text NOT NULL,
  original_filename text NOT NULL,
  object_key text NOT NULL UNIQUE,
  category text NOT NULL,
  description text,
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL CHECK (size_bytes >= 0),
  uploaded_by text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  folder_id text REFERENCES folders(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL,
  archived_at timestamptz
);
CREATE INDEX IF NOT EXISTS documents_folder_idx ON documents(folder_id) WHERE archived_at IS NULL;

CREATE TABLE IF NOT EXISTS clients (
  id text PRIMARY KEY,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  billing_address text NOT NULL,
  tax_number text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE IF NOT EXISTS company_settings (
  id text PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
  legal_name text NOT NULL DEFAULT 'CustoNexus Technologies',
  trading_name text NOT NULL DEFAULT 'CustoNexus Technologies',
  registration_number text,
  vat_number text,
  address text,
  phone text NOT NULL DEFAULT '+27 72 270 1087',
  email text NOT NULL DEFAULT 'info@custonexus.com',
  website text NOT NULL DEFAULT 'https://custonexus.com',
  quote_validity_days integer NOT NULL DEFAULT 30 CHECK (quote_validity_days > 0),
  invoice_payment_days integer NOT NULL DEFAULT 30 CHECK (invoice_payment_days > 0),
  vat_enabled boolean NOT NULL DEFAULT false,
  vat_basis_points integer NOT NULL DEFAULT 0 CHECK (vat_basis_points BETWEEN 0 AND 10000),
  currency char(3) NOT NULL DEFAULT 'ZAR',
  bank_name text,
  bank_account_name text,
  bank_account_number text,
  bank_branch_code text,
  bank_account_type text,
  bank_swift_bic text,
  payment_reference_instructions text,
  show_bank_on_quotes boolean NOT NULL DEFAULT false,
  show_bank_on_invoices boolean NOT NULL DEFAULT true,
  document_footer text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text REFERENCES "user"("id") ON DELETE SET NULL
);
INSERT INTO company_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS document_sequences (
  document_type text NOT NULL CHECK (document_type IN ('quote', 'invoice')),
  document_year integer NOT NULL,
  last_number integer NOT NULL DEFAULT 0 CHECK (last_number >= 0),
  PRIMARY KEY (document_type, document_year)
);

CREATE TABLE IF NOT EXISTS quotes (
  id text PRIMARY KEY,
  quote_number text NOT NULL UNIQUE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  issue_date date NOT NULL,
  expiry_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  subtotal_cents bigint NOT NULL CHECK (subtotal_cents >= 0),
  discount_cents bigint NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  tax_cents bigint NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents bigint NOT NULL CHECK (total_cents >= 0),
  notes text,
  terms text,
  finalized_snapshot jsonb,
  pdf_object_key text,
  finalized_at timestamptz,
  created_by text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE IF NOT EXISTS quote_items (
  id text PRIMARY KEY,
  quote_id text NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  position integer NOT NULL,
  description text NOT NULL,
  quantity_milli bigint NOT NULL CHECK (quantity_milli > 0),
  unit_price_cents bigint NOT NULL CHECK (unit_price_cents >= 0),
  discount_cents bigint NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  line_total_cents bigint NOT NULL CHECK (line_total_cents >= 0),
  UNIQUE (quote_id, position)
);

CREATE TABLE IF NOT EXISTS invoices (
  id text PRIMARY KEY,
  invoice_number text NOT NULL UNIQUE,
  source_quote_id text REFERENCES quotes(id) ON DELETE RESTRICT,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  invoice_date date NOT NULL,
  due_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  subtotal_cents bigint NOT NULL CHECK (subtotal_cents >= 0),
  discount_cents bigint NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  tax_cents bigint NOT NULL DEFAULT 0 CHECK (tax_cents >= 0),
  total_cents bigint NOT NULL CHECK (total_cents >= 0),
  amount_paid_cents bigint NOT NULL DEFAULT 0 CHECK (amount_paid_cents >= 0),
  balance_due_cents bigint NOT NULL CHECK (balance_due_cents >= 0),
  notes text,
  payment_terms text,
  finalized_snapshot jsonb,
  pdf_object_key text,
  finalized_at timestamptz,
  created_by text NOT NULL REFERENCES "user"("id") ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id text PRIMARY KEY,
  invoice_id text NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  position integer NOT NULL,
  description text NOT NULL,
  quantity_milli bigint NOT NULL CHECK (quantity_milli > 0),
  unit_price_cents bigint NOT NULL CHECK (unit_price_cents >= 0),
  discount_cents bigint NOT NULL DEFAULT 0 CHECK (discount_cents >= 0),
  line_total_cents bigint NOT NULL CHECK (line_total_cents >= 0),
  UNIQUE (invoice_id, position)
);

CREATE TABLE IF NOT EXISTS storage_migrations (
  migration_key text PRIMARY KEY,
  source_fingerprint text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  details jsonb NOT NULL DEFAULT '{}'::jsonb
);

COMMIT;
