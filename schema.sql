-- NON Academy — D1 schema (Phase A: data capture).
-- Apply with:
--   CLOUDFLARE_ACCOUNT_ID=701d3513ccebc11ce8a329597b567059 \
--   npx wrangler d1 execute non-academy --remote --file=./schema.sql
--
-- One row per learner (keyed by email), an append-only event funnel, and a
-- venues table for the Phase B manager join-links. Reports (Phase C) read from
-- these with simple GROUP BY queries.

CREATE TABLE IF NOT EXISTS learners (
  email TEXT PRIMARY KEY,
  name TEXT,
  role TEXT,            -- 'rep' | 'venue'
  market TEXT,
  venue TEXT,           -- free text in Phase A; links to venues.join_code in Phase B
  consent INTEGER DEFAULT 0,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,  -- client-generated uuid; INSERT OR IGNORE makes sync idempotent
  email TEXT,
  type TEXT,            -- signup | module_completed | quiz_score | certified | practical_done | recall_done
  meta TEXT,            -- JSON blob
  ts TEXT
);
CREATE INDEX IF NOT EXISTS idx_events_email ON events (email);
CREATE INDEX IF NOT EXISTS idx_events_type ON events (type);

-- Phase B: managers create a venue and share its join_code/link. Staff who sign
-- up via that link are grouped under the venue for manager reporting.
CREATE TABLE IF NOT EXISTS venues (
  join_code TEXT PRIMARY KEY,
  name TEXT,
  manager_email TEXT,
  market TEXT,
  created_at TEXT
);
