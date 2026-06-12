-- NeuraGuard initial schema (Postgres)

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  password_hash text,
  created_at timestamptz DEFAULT now(),
  role_id uuid
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text
);

CREATE TABLE role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY(role_id, permission_id)
);

CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  asset_type text,
  owner_id uuid REFERENCES users(id),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE vulnerabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cve text,
  severity text,
  description text,
  discovered_at timestamptz,
  asset_id uuid REFERENCES assets(id)
);

CREATE TABLE threats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  threat_type text,
  first_seen timestamptz,
  last_seen timestamptz
);

CREATE TABLE threat_actors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  country text,
  motivation text,
  techniques jsonb,
  last_activity timestamptz
);

CREATE TABLE iocs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ioc_type text NOT NULL, -- ip/domain/url/hash/wallet
  value text NOT NULL,
  source text,
  first_seen timestamptz,
  last_seen timestamptz,
  threat_id uuid REFERENCES threats(id)
);

CREATE TABLE feeds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  provider text,
  config jsonb,
  enabled boolean DEFAULT true
);

CREATE TABLE feed_ingests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id uuid REFERENCES feeds(id),
  ingest_time timestamptz DEFAULT now(),
  stats jsonb
);

CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  summary text,
  details jsonb,
  severity text,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  closed_at timestamptz,
  source_feed_id uuid REFERENCES feeds(id)
);

CREATE TABLE incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  status text DEFAULT 'new',
  priority text,
  created_at timestamptz DEFAULT now(),
  closed_at timestamptz
);

CREATE TABLE incident_alerts (
  incident_id uuid REFERENCES incidents(id) ON DELETE CASCADE,
  alert_id uuid REFERENCES alerts(id) ON DELETE CASCADE,
  PRIMARY KEY(incident_id, alert_id)
);

CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  owner_id uuid REFERENCES users(id),
  status text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES cases(id) ON DELETE CASCADE,
  type text,
  content jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE playbooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  definition jsonb,
  enabled boolean DEFAULT true
);

CREATE TABLE playbook_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playbook_id uuid REFERENCES playbooks(id),
  status text,
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz
);

CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  assigned_to uuid REFERENCES users(id),
  status text,
  due_at timestamptz
);

CREATE TABLE integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  type text,
  config jsonb,
  enabled boolean DEFAULT true
);

CREATE TABLE api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  key text,
  revoked boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE logs (
  id bigserial PRIMARY KEY,
  source text,
  level text,
  message text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE ai_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  version text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE model_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id uuid REFERENCES ai_models(id),
  input jsonb,
  output jsonb,
  started_at timestamptz DEFAULT now(),
  duration_ms int
);

CREATE TABLE malware_samples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sha256 text,
  filename text,
  uploaded_by uuid REFERENCES users(id),
  uploaded_at timestamptz DEFAULT now(),
  analysis jsonb
);

CREATE TABLE sandbox_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sample_id uuid REFERENCES malware_samples(id),
  result jsonb,
  run_at timestamptz DEFAULT now()
);

CREATE TABLE compliance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  standard text,
  status text,
  evidence jsonb,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text,
  generated_by uuid REFERENCES users(id),
  content jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  channel text,
  payload jsonb,
  sent_at timestamptz
);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES users(id),
  action text,
  target jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE risk_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid REFERENCES assets(id),
  score numeric,
  factors jsonb,
  calculated_at timestamptz DEFAULT now()
);

CREATE TABLE threat_feeds_archive (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_id uuid REFERENCES feeds(id),
  data jsonb,
  archived_at timestamptz DEFAULT now()
);

CREATE TABLE email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  subject text,
  body text
);

CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  last_active_at timestamptz
);

CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE,
  value jsonb
);

CREATE TABLE market_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  vendor text,
  metadata jsonb
);

CREATE TABLE vulnerabilities_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vulnerability_id uuid REFERENCES vulnerabilities(id),
  changed_at timestamptz DEFAULT now(),
  old_value jsonb,
  new_value jsonb
);

-- Add indexes for common queries
CREATE INDEX idx_iocs_value ON iocs(value);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_incidents_status ON incidents(status);

-- End of schema
