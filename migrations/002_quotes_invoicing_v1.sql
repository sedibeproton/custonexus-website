BEGIN;

ALTER TABLE clients ADD COLUMN IF NOT EXISTS registration_number text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS physical_address text;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;

ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS logo_path text NOT NULL DEFAULT '/logos/logo-full-horizontal.png';
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS quote_terms text;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS invoice_terms text;
ALTER TABLE company_settings ADD COLUMN IF NOT EXISTS payment_instructions text;

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS reference text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS finalized_by text REFERENCES "user"(id) ON DELETE RESTRICT;
UPDATE quotes SET status = upper(status);
ALTER TABLE quotes ALTER COLUMN status SET DEFAULT 'DRAFT';

ALTER TABLE quote_items ADD COLUMN IF NOT EXISTS unit text NOT NULL DEFAULT 'each';

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS reference text;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS finalized_by text REFERENCES "user"(id) ON DELETE RESTRICT;
UPDATE invoices SET status = upper(status);
ALTER TABLE invoices ALTER COLUMN status SET DEFAULT 'DRAFT';

ALTER TABLE invoice_items ADD COLUMN IF NOT EXISTS unit text NOT NULL DEFAULT 'each';

CREATE UNIQUE INDEX IF NOT EXISTS invoices_source_quote_unique
  ON invoices(source_quote_id) WHERE source_quote_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS payments (
  id text PRIMARY KEY,
  invoice_id text NOT NULL REFERENCES invoices(id) ON DELETE RESTRICT,
  payment_date date NOT NULL,
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  payment_method text NOT NULL,
  reference text,
  notes text,
  recorded_by text NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  voided_at timestamptz,
  voided_by text REFERENCES "user"(id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS payments_invoice_idx ON payments(invoice_id) WHERE voided_at IS NULL;

CREATE OR REPLACE FUNCTION prevent_finalized_financial_mutation() RETURNS trigger AS $$
BEGIN
  IF OLD.finalized_at IS NOT NULL THEN
    IF NEW.finalized_snapshot IS DISTINCT FROM OLD.finalized_snapshot
      OR NEW.pdf_object_key IS DISTINCT FROM OLD.pdf_object_key
      OR NEW.total_cents IS DISTINCT FROM OLD.total_cents
      OR NEW.subtotal_cents IS DISTINCT FROM OLD.subtotal_cents
      OR NEW.discount_cents IS DISTINCT FROM OLD.discount_cents
      OR NEW.tax_cents IS DISTINCT FROM OLD.tax_cents
      OR NEW.client_id IS DISTINCT FROM OLD.client_id THEN
      RAISE EXCEPTION 'Finalized financial document content is immutable';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS quotes_finalized_immutable ON quotes;
CREATE TRIGGER quotes_finalized_immutable BEFORE UPDATE ON quotes
FOR EACH ROW EXECUTE FUNCTION prevent_finalized_financial_mutation();
DROP TRIGGER IF EXISTS invoices_finalized_immutable ON invoices;
CREATE TRIGGER invoices_finalized_immutable BEFORE UPDATE ON invoices
FOR EACH ROW EXECUTE FUNCTION prevent_finalized_financial_mutation();

CREATE OR REPLACE FUNCTION prevent_finalized_item_mutation() RETURNS trigger AS $$
DECLARE finalized timestamptz;
BEGIN
  IF TG_TABLE_NAME = 'quote_items' THEN
    SELECT finalized_at INTO finalized FROM quotes WHERE id = COALESCE(NEW.quote_id, OLD.quote_id);
  ELSE
    SELECT finalized_at INTO finalized FROM invoices WHERE id = COALESCE(NEW.invoice_id, OLD.invoice_id);
  END IF;
  IF finalized IS NOT NULL THEN RAISE EXCEPTION 'Finalized financial document items are immutable'; END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS quote_items_finalized_immutable ON quote_items;
CREATE TRIGGER quote_items_finalized_immutable BEFORE INSERT OR UPDATE OR DELETE ON quote_items
FOR EACH ROW EXECUTE FUNCTION prevent_finalized_item_mutation();
DROP TRIGGER IF EXISTS invoice_items_finalized_immutable ON invoice_items;
CREATE TRIGGER invoice_items_finalized_immutable BEFORE INSERT OR UPDATE OR DELETE ON invoice_items
FOR EACH ROW EXECUTE FUNCTION prevent_finalized_item_mutation();

COMMIT;
