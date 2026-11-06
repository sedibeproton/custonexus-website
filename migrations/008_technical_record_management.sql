BEGIN;

ALTER TABLE technical_certificates
  DROP CONSTRAINT IF EXISTS technical_certificates_job_card_id_key;

CREATE UNIQUE INDEX IF NOT EXISTS technical_certificates_one_active_per_job_idx
  ON technical_certificates(job_card_id)
  WHERE voided_at IS NULL;

COMMIT;
