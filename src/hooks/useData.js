import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

      const { data: rows, error: err } = await query;
      if (!cancelled) {
        setData(rows);
        setError(err);
        setLoading(false);
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
  };
}

function mapUpdate(row) {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    summary: row.summary,
    tag: row.tag,
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
  const { data, loading, error } = useQuery('skills', { order: 'id' });
  return { data: data ? data.map(mapSkill) : null, loading, error };
}

export function useTools() {
  const { data, loading, error } = useQuery('tools_data', { order: 'name' });
  return { data: data ? data.map(mapTool) : null, loading, error };
}

export function useUpdates() {
  const { data, loading, error } = useQuery('updates', { order: 'date', ascending: false });
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
      const { data: row, error: err } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single();
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
      const { data: row, error: err } = await supabase
        .from('updates')
        .select('*')
        .eq('id', id)
        .single();
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
      const [skills, tools, updates] = await Promise.all([
        supabase.from('skills').select('id', { count: 'exact', head: true }),
        supabase.from('tools_data').select('id', { count: 'exact', head: true }),
        supabase.from('updates').select('id', { count: 'exact', head: true }),
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
