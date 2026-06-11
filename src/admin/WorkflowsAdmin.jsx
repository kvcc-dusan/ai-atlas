import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

export default function WorkflowsAdmin() {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('workflows')
      .select('id, number, title, category, difficulty, status, is_published, steps')
      .order('id')
      .then(({ data, error }) => {
        if (error) console.error('Failed to load workflows:', error.message);
        setWorkflows(data ?? []);
        setLoading(false);
      })
      .catch((err) => { console.error('Workflows fetch error:', err); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    if (!workflows) return [];
    if (!search.trim()) return workflows;
    const q = search.toLowerCase();
    return workflows.filter(w =>
      w.title?.toLowerCase().includes(q) ||
      w.category?.toLowerCase().includes(q) ||
      w.number?.toLowerCase().includes(q)
    );
  }, [workflows, search]);

  const publishedCount = workflows?.filter(w => w.is_published).length ?? 0;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Workflows</h1>
          <p className="admin-page-desc">Step-by-step recipes shown alongside skills. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/workflows/new')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New workflow
        </button>
      </div>

      {!loading && workflows && workflows.length > 0 && (
        <div className="admin-stat-strip">
          <div className="admin-stat">
            <span className="admin-stat-value">{workflows.length}</span>
            <span className="admin-stat-label">Total</span>
          </div>
          <div className="admin-stat-sep" />
          <div className="admin-stat">
            <span className="admin-stat-value">{publishedCount}</span>
            <span className="admin-stat-label">Published</span>
          </div>
          <div className="admin-stat-sep" />
          <div className="admin-stat">
            <span className="admin-stat-value">{workflows.length - publishedCount}</span>
            <span className="admin-stat-label">Drafts</span>
          </div>
        </div>
      )}

      {!loading && workflows && workflows.length > 0 && (
        <div className="admin-search-bar">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search workflows…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Loading workflows…</div>
      ) : filtered.length === 0 && search ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No results</div>
          <div className="admin-list-empty-desc">No workflows match "{search}". Try a different search term.</div>
        </div>
      ) : workflows.length === 0 ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No workflows yet</div>
          <div className="admin-list-empty-desc">Create your first step-by-step workflow. It starts as a draft, invisible until you publish it.</div>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/workflows/new')}>
            Create first workflow
          </button>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '56px' }}>No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Steps</th>
              <th>Level</th>
              <th>Visibility</th>
              <th style={{ width: '32px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((w) => (
              <tr key={w.id} onClick={() => navigate(`/admin/workflows/${w.id}`)} style={{ cursor: 'pointer' }}>
                <td><span className="admin-table-chapter">{w.number}</span></td>
                <td><span className="admin-table-link">{w.title}</span></td>
                <td>{w.category ? <span className="admin-badge">{w.category}</span> : <span className="admin-table-meta">—</span>}</td>
                <td className="admin-table-meta">{w.steps?.length ?? 0}</td>
                <td><span className="admin-badge">{w.difficulty}</span></td>
                <td>
                  <span className={`admin-badge ${w.is_published ? 'green' : ''}`}>
                    <span className="admin-badge-dot" />
                    {w.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>
                  <span className="admin-row-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
