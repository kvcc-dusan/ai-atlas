-- ============================================
-- Ai Atlas — Draft/Published status
-- Run this in the Supabase SQL editor BEFORE deploying the draft-system code
-- ============================================

-- New rows start as drafts (hidden from the public site)
alter table skills     add column if not exists is_published boolean not null default false;
alter table tools_data add column if not exists is_published boolean not null default false;
alter table updates    add column if not exists is_published boolean not null default false;

-- Everything that already exists stays live — the public site must not change
update skills     set is_published = true;
update tools_data set is_published = true;
update updates    set is_published = true;
