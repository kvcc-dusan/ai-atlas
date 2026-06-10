-- ============================================
-- Ai Atlas — Analytics events
-- Run this in the Supabase SQL editor
-- ============================================

create table if not exists analytics_events (
  id          bigint generated always as identity primary key,
  event       text not null,           -- 'page_view' | 'skill_open' | 'prompt_copy' | 'tool_open' | 'article_open'
  entity_id   text,                    -- id of the skill/tool/article/prompt the event refers to
  label       text,                    -- human-readable name shown in the admin dashboard
  path        text,                    -- page the event happened on
  created_at  timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on analytics_events (created_at desc);

alter table analytics_events enable row level security;

-- Visitors (anon key) may only write events — never read them
create policy "Public insert events" on analytics_events
  for insert with check (true);

-- Only logged-in admins can read or prune the data
create policy "Auth read events" on analytics_events
  for select using (auth.role() = 'authenticated');

create policy "Auth delete events" on analytics_events
  for delete using (auth.role() = 'authenticated');
