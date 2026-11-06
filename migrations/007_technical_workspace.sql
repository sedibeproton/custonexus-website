BEGIN;

ALTER TABLE document_sequences DROP CONSTRAINT IF EXISTS document_sequences_document_type_check;
ALTER TABLE document_sequences ADD CONSTRAINT document_sequences_document_type_check
  CHECK (document_type IN ('quote', 'invoice', 'job_card', 'certificate'));

CREATE TABLE IF NOT EXISTS technical_job_cards (
  id text PRIMARY KEY,
  job_number text NOT NULL UNIQUE,
  client_id text NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  title text NOT NULL,
  job_type text NOT NULL CHECK (job_type IN ('INSPECTION','SERVICE','CALIBRATION','REPAIR','INSTALLATION','OTHER')),
  status text NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED')),
  equipment_name text,
  manufacturer text,
  model_number text,
  serial_number text,
  asset_number text,
  service_location text,
  reported_issue text,
  work_performed text,
  findings text,
  recommendations text,
  received_date date NOT NULL,
  service_date date,
  completed_at timestamptz,
  technician_name text NOT NULL,
  created_by text NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
  updated_by text NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);
CREATE INDEX IF NOT EXISTS technical_job_cards_client_idx ON technical_job_cards(client_id);
CREATE INDEX IF NOT EXISTS technical_job_cards_status_idx ON technical_job_cards(status) WHERE archived_at IS NULL;

CREATE TABLE IF NOT EXISTS technical_certificates (
  id text PRIMARY KEY,
  certificate_number text NOT NULL UNIQUE,
  job_card_id text NOT NULL UNIQUE REFERENCES technical_job_cards(id) ON DELETE RESTRICT,
  certificate_type text NOT NULL CHECK (certificate_type IN ('SERVICE_RECORD','CALIBRATION_RECORD','INSPECTION_RECORD','COMPLETION_CERTIFICATE')),
  result text NOT NULL CHECK (result IN ('PASS','FAIL','NOT_APPLICABLE')),
  title text NOT NULL,
  statement text NOT NULL,
  standards_reference text,
  issue_date date NOT NULL,
  valid_until date,
  issued_by_name text NOT NULL,
  snapshot_json jsonb NOT NULL,
  pdf_object_key text NOT NULL UNIQUE,
  created_by text NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
  issued_at timestamptz NOT NULL DEFAULT now(),
  voided_at timestamptz,
  voided_by text REFERENCES "user"(id) ON DELETE RESTRICT,
  void_reason text
);
CREATE INDEX IF NOT EXISTS technical_certificates_job_idx ON technical_certificates(job_card_id);

COMMIT;
