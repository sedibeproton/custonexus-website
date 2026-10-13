BEGIN;

CREATE TABLE IF NOT EXISTS consultation_settings (
  id text PRIMARY KEY DEFAULT 'default' CHECK (id = 'default'),
  duration_minutes integer NOT NULL DEFAULT 15 CHECK (duration_minutes BETWEEN 5 AND 240),
  minimum_notice_minutes integer NOT NULL DEFAULT 1440 CHECK (minimum_notice_minutes >= 0),
  maximum_advance_days integer NOT NULL DEFAULT 60 CHECK (maximum_advance_days BETWEEN 1 AND 365),
  timezone text NOT NULL DEFAULT 'Africa/Johannesburg' CHECK (timezone = 'Africa/Johannesburg'),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text REFERENCES "user"(id) ON DELETE SET NULL
);
INSERT INTO consultation_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS consultation_availability_rules (
  id text PRIMARY KEY,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (start_time < end_time),
  UNIQUE (weekday, start_time, end_time)
);

INSERT INTO consultation_availability_rules (id, weekday, start_time, end_time)
VALUES
  ('default-monday', 1, '09:00', '16:00'),
  ('default-tuesday', 2, '09:00', '16:00'),
  ('default-wednesday', 3, '09:00', '16:00'),
  ('default-thursday', 4, '09:00', '16:00'),
  ('default-friday', 5, '09:00', '16:00')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS consultation_blocked_periods (
  id text PRIMARY KEY,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  reason text,
  created_by text REFERENCES "user"(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (starts_at < ends_at)
);
CREATE INDEX IF NOT EXISTS consultation_blocks_range_idx ON consultation_blocked_periods (starts_at, ends_at);

CREATE TABLE IF NOT EXISTS consultation_bookings (
  id text PRIMARY KEY,
  reference text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','CONFIRMED','RESCHEDULE_PROPOSED','DECLINED','CANCELLED','COMPLETED','NO_SHOW')),
  consultation_type text NOT NULL,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_name text,
  project_description text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  timezone text NOT NULL DEFAULT 'Africa/Johannesburg',
  confirmation_sent_at timestamptz,
  company_notification_sent_at timestamptz,
  review_note text,
  reviewed_at timestamptz,
  reviewed_by text REFERENCES "user"(id) ON DELETE SET NULL,
  decision_notification_sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (starts_at < ends_at)
);
CREATE UNIQUE INDEX IF NOT EXISTS consultation_one_active_start_idx ON consultation_bookings (starts_at) WHERE status IN ('PENDING','CONFIRMED','RESCHEDULE_PROPOSED');
CREATE INDEX IF NOT EXISTS consultation_bookings_start_idx ON consultation_bookings (starts_at);
CREATE INDEX IF NOT EXISTS consultation_bookings_status_idx ON consultation_bookings (status, starts_at);

COMMIT;
