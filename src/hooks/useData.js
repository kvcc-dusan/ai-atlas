import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { isPreviewMode } from '../lib/previewMode';

// Drafts are hidden from the public site but visible in the admin Site Preview
const showDrafts = isPreviewMode;

function useQuery(table, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      let query = supabase.from(table).select('*');
      if (options.order) query = query.order(options.order, { ascending: options.ascending ?? true });
      if (options.eq) query = query.eq(options.eq[0], options.eq[1]);
      if (options.publishedOnly && !showDrafts) query = query.eq('is_published', true);

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );

      try {
        const { data: rows, error: err } = await Promise.race([query, timeout]);
        if (!cancelled) {
          setData(rows);
          setError(err);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetch();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { data, loading, error };
}

// Map DB row → component-expected shape (mirrors data.js)
function mapSkill(row) {
  return {
    id: row.id,
    chapter: row.chapter,
    category: row.category,
    title: row.title,
    brief: row.brief,
    tools: row.tools ?? [],
    status: row.status,
    lastUpdated: row.last_updated,
    hasDetail: true,
    isPublished: row.is_published ?? true,
    difficulty: row.difficulty ?? 'Beginner',
    roles: row.roles ?? [],
    image_url: row.image_url ?? '',
    image_aspect_ratio: row.image_aspect_ratio ?? '16/9',
    image_rows: row.image_rows ?? [],
    detail: {
      overview: row.overview ?? [],
      tools: row.detail_tools ?? [],
      gettingStarted: row.getting_started ?? [],
      prompts: row.prompts ?? [],
      tips: row.tips ?? [],
      relatedSkills: row.related_skills ?? [],
    },
  };
}

function mapTool(row) {
  return {
    id: row.id,
    name: row.name,
    provider: row.provider,
    category: row.category,
    status: row.status,
    description: row.description,
    bestFor: row.best_for ?? [],
    usedInSkills: row.used_in_skills ?? [],
    tier: row.tier,
    logoUrl: row.logo_url ?? '',
    isPublished: row.is_published ?? true,
  };
}

function mapWorkflow(row) {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    description: row.description ?? '',
    category: row.category ?? 'WORKFLOW',
    difficulty: row.difficulty ?? 'Beginner',
    roles: row.roles ?? [],
    status: row.status,
    isPublished: row.is_published ?? true,
    lastUpdated: row.last_updated,
    tools: row.tools ?? [],
    steps: row.steps ?? [],
    relatedSkills: row.related_skills ?? [],
    estTime: row.est_time ?? '',
    prerequisites: row.prerequisites ?? [],
    outcome: row.outcome ?? '',
    tips: row.tips ?? [],
  };
}

function mapUpdate(row) {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    summary: row.summary,
    tag: row.tag,
    isPublished: row.is_published ?? true,
    image_url: row.image_url ?? '',
    image_aspect_ratio: row.image_aspect_ratio ?? '16/9',
    detail: {
      content: row.content ?? [],
      actionItems: row.action_items ?? [],
      affectedSkills: row.affected_skills ?? [],
    },
  };
}

export function useSkills() {
  const { data, loading, error } = useQuery('skills', { order: 'id', publishedOnly: true });
  return { data: data ? data.map(mapSkill) : null, loading, error };
}

export function useTools() {
  const { data, loading, error } = useQuery('tools_data', { order: 'sort_order', publishedOnly: true });
  return { data: data ? data.map(mapTool) : null, loading, error };
}

export function useWorkflows() {
  const { data, loading, error } = useQuery('workflows', { order: 'id', publishedOnly: true });
  return { data: data ? data.map(mapWorkflow) : null, loading, error };
}

export function useWorkflowById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      let query = supabase.from('workflows').select('*').eq('id', id);
      if (!showDrafts) query = query.eq('is_published', true);
      const { data: row, error: err } = await query.maybeSingle();
      if (!cancelled) {
        setData(row ? mapWorkflow(row) : null);
        setError(err);
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { data, loading, error };
}

export function useUpdates() {
  const { data, loading, error } = useQuery('updates', { order: 'date', ascending: false, publishedOnly: true });
  return { data: data ? data.map(mapUpdate) : null, loading, error };
}

export function useSkillById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      let query = supabase.from('skills').select('*').eq('id', id);
      if (!showDrafts) query = query.eq('is_published', true);
      const { data: row, error: err } = await query.maybeSingle();
      if (!cancelled) {
        setData(row ? mapSkill(row) : null);
        setError(err);
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { data, loading, error };
}

export function useUpdateById(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      let query = supabase.from('updates').select('*').eq('id', id);
      if (!showDrafts) query = query.eq('is_published', true);
      const { data: row, error: err } = await query.maybeSingle();
      if (!cancelled) {
        setData(row ? mapUpdate(row) : null);
        setError(err);
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { data, loading, error };
}

export function useStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      const countQuery = (table) => {
        let q = supabase.from(table).select('id', { count: 'exact', head: true });
        if (!showDrafts) q = q.eq('is_published', true);
        return q;
      };
      const [skills, tools, updates] = await Promise.all([
        countQuery('skills'),
        countQuery('tools_data'),
        countQuery('updates'),
      ]);

      if (!cancelled) {
        setData([
          { value: skills.count ?? 0, label: 'Skills documented' },
          { value: tools.count ?? 0, label: 'Tools evaluated' },
          { value: updates.count ?? 0, label: 'Articles posted' },
        ]);
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}
