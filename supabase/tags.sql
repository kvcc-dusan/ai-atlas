-- ============================================
-- Ai Atlas — Role & difficulty tags on skills
-- Run this in the Supabase SQL editor BEFORE deploying the tags code
-- ============================================

-- Difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
alter table skills add column if not exists difficulty text not null default 'Beginner';

-- Roles: subset of {'Developer','Designer','QA','PM'}; empty array = for everyone
alter table skills add column if not exists roles text[] not null default '{}';
