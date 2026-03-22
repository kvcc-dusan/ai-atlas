import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

const TAG_CLASS = {
  'Model update': 'blue',
  'New tool': 'green',
  'Policy change': 'amber',
  'New skill': 'green',
};

export default function UpdatesAdmin() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('updates')
      .select('id, date, title, tag')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Failed to load articles:', error.message);
        setUpdates(data ?? []);
        setLoading(false);
      })
      .catch((err) => { console.error('Articles fetch error:', err); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    if (!updates) return [];
    if (!search.trim()) return updates;
    const q = search.toLowerCase();
    return updates.filter(u =>
      u.title?.toLowerCase().includes(q) ||
      u.tag?.toLowerCase().includes(q) ||
      u.date?.includes(q)
    );
  }, [updates, search]);

  const tagCounts = useMemo(() => {
    if (!updates) return {};
    const counts = {};
    updates.forEach(u => {
      counts[u.tag] = (counts[u.tag] || 0) + 1;
    });
    return counts;
  }, [updates]);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-desc">Updates and announcements. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/updates/new')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New article
        </button>
      </div>

      {!loading && updates && updates.length > 0 && (
        <div className="admin-stat-strip">
          <div className="admin-stat">
            <span className="admin-stat-value">{updates.length}</span>
            <span className="admin-stat-label">Total</span>
          </div>
          {Object.entries(tagCounts).slice(0, 3).map(([tag, count]) => (
            <React.Fragment key={tag}>
              <div className="admin-stat-sep" />
              <div className="admin-stat">
                <span className="admin-stat-value">{count}</span>
                <span className="admin-stat-label">{tag}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {!loading && updates && updates.length > 0 && (
        <div className="admin-search-bar">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Loading articles…</div>
      ) : filtered.length === 0 && search ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No results</div>
          <div className="admin-list-empty-desc">No articles match "{search}". Try a different search term.</div>
        </div>
      ) : updates.length === 0 ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No articles yet</div>
          <div className="admin-list-empty-desc">Publish your first article to populate the homepage carousel.</div>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/updates/new')}>
            Write first article
          </button>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '100px' }}>Date</th>
              <th>Title</th>
              <th>Tag</th>
              <th style={{ width: '32px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} onClick={() => navigate(`/admin/updates/${u.id}`)} style={{ cursor: 'pointer' }}>
                <td className="admin-table-meta" style={{ whiteSpace: 'nowrap' }}>{u.date}</td>
                <td><span className="admin-table-link">{u.title}</span></td>
                <td>
                  <span className={`admin-badge ${TAG_CLASS[u.tag] ?? ''}`}>
                    <span className="admin-badge-dot" />
                    {u.tag}
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
