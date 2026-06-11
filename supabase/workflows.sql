-- ============================================
-- Ai Atlas — Workflows content type
-- Run this in the Supabase SQL editor BEFORE deploying the workflows code
-- ============================================

create table if not exists workflows (
  id             serial primary key,
  number         text        not null,            -- display number, e.g. 'W01'
  title          text        not null,
  description    text,
  category       text,
  difficulty     text        not null default 'Beginner',
  roles          text[]      not null default '{}',
  status         text        not null default 'active',
  is_published   boolean     not null default false,
  last_updated   date,
  tools          text[]      default '{}',        -- derived from step tools
  steps          jsonb       default '[]',        -- [{ title, text, tool, skill_id, prompt }]
  related_skills int[]       default '{}'
);

alter table workflows enable row level security;

-- Same policy pattern as the other content tables
create policy "Public read workflows" on workflows
  for select using (true);

create policy "Auth insert workflows" on workflows
  for insert with check (auth.role() = 'authenticated');

create policy "Auth update workflows" on workflows
  for update using (auth.role() = 'authenticated');

create policy "Auth delete workflows" on workflows
  for delete using (auth.role() = 'authenticated');
