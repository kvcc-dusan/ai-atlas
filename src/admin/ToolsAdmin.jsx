import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

const TIER_CLASS = { PRIMARY: 'blue', SECONDARY: '', SPECIALIZED: 'amber' };

export default function ToolsAdmin() {
  const navigate = useNavigate();
  const [tools, setTools] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('tools_data')
      .select('id, name, provider, category, tier, status')
      .order('name')
      .then(({ data, error }) => {
        if (error) console.error('Failed to load tools:', error.message);
        setTools(data ?? []);
        setLoading(false);
      })
      .catch((err) => { console.error('Tools fetch error:', err); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    if (!tools) return [];
    if (!search.trim()) return tools;
    const q = search.toLowerCase();
    return tools.filter(t =>
      t.name?.toLowerCase().includes(q) ||
      t.provider?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t.tier?.toLowerCase().includes(q) ||
      t.status?.toLowerCase().includes(q)
    );
  }, [tools, search]);

  const approvedCount = tools?.filter(t => t.status === 'approved').length ?? 0;
  const reviewCount = (tools?.length ?? 0) - approvedCount;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Tools</h1>
          <p className="admin-page-desc">Evaluated AI tools. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/tools/new')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New tool
        </button>
      </div>

      {!loading && tools && tools.length > 0 && (
        <div className="admin-stat-strip">
          <div className="admin-stat">
            <span className="admin-stat-value">{tools.length}</span>
            <span className="admin-stat-label">Total</span>
          </div>
          <div className="admin-stat-sep" />
          <div className="admin-stat">
            <span className="admin-stat-value">{approvedCount}</span>
            <span className="admin-stat-label">Approved</span>
          </div>
          <div className="admin-stat-sep" />
          <div className="admin-stat">
            <span className="admin-stat-value">{reviewCount}</span>
            <span className="admin-stat-label">Under review</span>
          </div>
        </div>
      )}

      {!loading && tools && tools.length > 0 && (
        <div className="admin-search-bar">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search tools…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Loading tools…</div>
      ) : filtered.length === 0 && search ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No results</div>
          <div className="admin-list-empty-desc">No tools match "{search}". Try a different search term.</div>
        </div>
      ) : tools.length === 0 ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No tools yet</div>
          <div className="admin-list-empty-desc">Add your first evaluated AI tool to get started.</div>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/tools/new')}>
            Add first tool
          </button>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Category</th>
              <th>Tier</th>
              <th>Status</th>
              <th style={{ width: '32px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} onClick={() => navigate(`/admin/tools/${t.id}`)} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`admin-status-dot ${t.status === 'approved' ? 'active' : ''}`} />
                    <span className="admin-table-link">{t.name}</span>
                  </div>
                </td>
                <td className="admin-table-meta">{t.provider}</td>
                <td><span className="admin-badge">{t.category}</span></td>
                <td><span className={`admin-badge ${TIER_CLASS[t.tier] ?? ''}`}>{t.tier}</span></td>
                <td>
                  <span className={`admin-badge ${t.status === 'approved' ? 'green' : ''}`}>
                    <span className="admin-badge-dot" />
                    {t.status}
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
