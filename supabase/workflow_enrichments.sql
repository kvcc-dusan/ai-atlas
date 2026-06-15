-- ============================================
-- Ai Atlas — Workflow enrichments
-- Run this in the Supabase SQL editor BEFORE deploying the enrichment code
-- ============================================

alter table workflows add column if not exists est_time      text;                      -- e.g. '~20 min'
alter table workflows add column if not exists prerequisites text[] not null default '{}';
alter table workflows add column if not exists outcome       text;                      -- "when you're done" block
alter table workflows add column if not exists tips          text[] not null default '{}';

-- Per-step images live inside the existing steps jsonb — no migration needed.
