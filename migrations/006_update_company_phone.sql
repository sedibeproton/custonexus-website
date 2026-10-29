ALTER TABLE company_settings
  ALTER COLUMN phone SET DEFAULT '+27 79 615 5204';

UPDATE company_settings
SET phone = '+27 79 615 5204',
    updated_at = now()
WHERE regexp_replace(phone, '[^0-9]', '', 'g') IN ('0722701087', '27722701087');
