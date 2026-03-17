-- ============================================
-- Ai Atlas — Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================

-- Skills
create table if not exists skills (
  id             serial primary key,
  chapter        text        not null,
  category       text        not null,
  title          text        not null,
  brief          text,
  tools          text[]      default '{}',
  status         text        not null default 'active',
  last_updated   date,
  overview       text[]      default '{}',
  getting_started text[]     default '{}',
  tips           text[]      default '{}',
  detail_tools   jsonb       default '[]',
  prompts        jsonb       default '[]',
  related_skills int[]       default '{}'
);

-- Tools
create table if not exists tools_data (
  id             text primary key,  -- slug e.g. 'claude'
  name           text        not null,
  provider       text,
  category       text,
  status         text        not null default 'approved',
  description    text,
  best_for       text[]      default '{}',
  used_in_skills int[]       default '{}',
  tier           text        not null default 'SECONDARY'
);

-- Updates / Articles
create table if not exists updates (
  id             text primary key,  -- 'update-1', etc.
  date           date        not null,
  title          text        not null,
  summary        text,
  tag            text,
  content        text[]      default '{}',
  action_items   text[]      default '{}',
  affected_skills int[]      default '{}'
);

-- ============================================
-- Row Level Security
-- ============================================

alter table skills    enable row level security;
alter table tools_data enable row level security;
alter table updates   enable row level security;

-- Public read
create policy "Public read skills"     on skills     for select using (true);
create policy "Public read tools_data" on tools_data for select using (true);
create policy "Public read updates"    on updates    for select using (true);

-- Authenticated write
create policy "Auth insert skills"     on skills     for insert with check (auth.role() = 'authenticated');
create policy "Auth update skills"     on skills     for update using (auth.role() = 'authenticated');
create policy "Auth delete skills"     on skills     for delete using (auth.role() = 'authenticated');

create policy "Auth insert tools_data" on tools_data for insert with check (auth.role() = 'authenticated');
create policy "Auth update tools_data" on tools_data for update using (auth.role() = 'authenticated');
create policy "Auth delete tools_data" on tools_data for delete using (auth.role() = 'authenticated');

create policy "Auth insert updates"    on updates    for insert with check (auth.role() = 'authenticated');
create policy "Auth update updates"    on updates    for update using (auth.role() = 'authenticated');
create policy "Auth delete updates"    on updates    for delete using (auth.role() = 'authenticated');
