import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

const RANGES = [
  { label: '7 days', days: 7 },
  { label: '30 days', days: 30 },
];

const MAX_EVENTS = 10000;

// Aggregate events of one type into a ranked [label, count] list
function topByLabel(events, eventType, limit = 8) {
  const counts = {};
  events.forEach((e) => {
    if (e.event !== eventType) return;
    const key = e.label ?? e.entity_id ?? 'Unknown';
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

function RankTable({ title, rows, emptyText }) {
  return (
    <div className="admin-analytics-block">
      <h2 className="admin-analytics-block-title">{title}</h2>
      {rows.length === 0 ? (
        <p className="admin-analytics-empty">{emptyText}</p>
      ) : (
        <table className="admin-table">
          <tbody>
            {rows.map(([label, count], i) => (
              <tr key={label}>
                <td className="admin-table-meta" style={{ width: '32px' }}>{String(i + 1).padStart(2, '0')}</td>
                <td>{label}</td>
                <td className="admin-table-meta" style={{ width: '60px', textAlign: 'right' }}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function AnalyticsAdmin() {
  const [events, setEvents] = useState(null);
  const [loadedAt, setLoadedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rangeDays, setRangeDays] = useState(30);

  useEffect(() => {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    supabase
      .from('analytics_events')
      .select('event, entity_id, label, path, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(MAX_EVENTS)
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        setEvents(data ?? []);
        setLoadedAt(Date.now());
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!events) return [];
    if (rangeDays === 30 || !loadedAt) return events;
    const cutoff = loadedAt - rangeDays * 24 * 60 * 60 * 1000;
    return events.filter((e) => new Date(e.created_at).getTime() >= cutoff);
  }, [events, rangeDays, loadedAt]);

  const stats = useMemo(() => {
    const byType = {};
    filtered.forEach((e) => {
      byType[e.event] = (byType[e.event] || 0) + 1;
    });
    return {
      total: filtered.length,
      pageViews: byType.page_view ?? 0,
      skillOpens: byType.skill_open ?? 0,
      promptCopies: byType.prompt_copy ?? 0,
      toolOpens: byType.tool_open ?? 0,
      articleOpens: byType.article_open ?? 0,
    };
  }, [filtered]);

  const topSkills = useMemo(() => topByLabel(filtered, 'skill_open'), [filtered]);
  const topPrompts = useMemo(() => topByLabel(filtered, 'prompt_copy'), [filtered]);
  const topTools = useMemo(() => topByLabel(filtered, 'tool_open'), [filtered]);
  const topArticles = useMemo(() => topByLabel(filtered, 'article_open'), [filtered]);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Analytics</h1>
          <p className="admin-page-desc">What visitors actually use — opens and prompt copies, anonymous.</p>
        </div>
        <div className="admin-analytics-range">
          {RANGES.map((r) => (
            <button
              key={r.days}
              className={`admin-btn ${rangeDays === r.days ? 'admin-btn-primary' : ''}`}
              onClick={() => setRangeDays(r.days)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">Loading analytics…</div>
      ) : error ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">Couldn&apos;t load analytics</div>
          <div className="admin-list-empty-desc">
            {error}. If the table doesn&apos;t exist yet, run <code>supabase/analytics.sql</code> in the Supabase SQL editor.
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No events yet</div>
          <div className="admin-list-empty-desc">
            Events appear here as soon as someone browses the public site. Open a skill or copy a prompt to test it.
          </div>
        </div>
      ) : (
        <>
          <div className="admin-stat-strip">
            <div className="admin-stat">
              <span className="admin-stat-value">{stats.pageViews}</span>
              <span className="admin-stat-label">Page views</span>
            </div>
            <div className="admin-stat-sep" />
            <div className="admin-stat">
              <span className="admin-stat-value">{stats.skillOpens}</span>
              <span className="admin-stat-label">Skill opens</span>
            </div>
            <div className="admin-stat-sep" />
            <div className="admin-stat">
              <span className="admin-stat-value">{stats.promptCopies}</span>
              <span className="admin-stat-label">Prompt copies</span>
            </div>
            <div className="admin-stat-sep" />
            <div className="admin-stat">
              <span className="admin-stat-value">{stats.toolOpens}</span>
              <span className="admin-stat-label">Tool opens</span>
            </div>
            <div className="admin-stat-sep" />
            <div className="admin-stat">
              <span className="admin-stat-value">{stats.articleOpens}</span>
              <span className="admin-stat-label">Article opens</span>
            </div>
          </div>

          <div className="admin-analytics-grid">
            <RankTable title="Top skills" rows={topSkills} emptyText="No skill opens in this period." />
            <RankTable title="Top prompts" rows={topPrompts} emptyText="No prompt copies in this period." />
            <RankTable title="Top tools" rows={topTools} emptyText="No tool opens in this period." />
            <RankTable title="Top articles" rows={topArticles} emptyText="No article opens in this period." />
          </div>
        </>
      )}
    </AdminLayout>
  );
}
