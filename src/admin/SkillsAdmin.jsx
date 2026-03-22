import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

export default function SkillsAdmin() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('skills')
      .select('id, chapter, category, title, status, last_updated')
      .order('id')
      .then(({ data, error }) => {
        if (error) console.error('Failed to load skills:', error.message);
        setSkills(data ?? []);
        setLoading(false);
      })
      .catch((err) => { console.error('Skills fetch error:', err); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    if (!skills) return [];
    if (!search.trim()) return skills;
    const q = search.toLowerCase();
    return skills.filter(s =>
      s.title?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      s.chapter?.toString().includes(q)
    );
  }, [skills, search]);

  const activeCount = skills?.filter(s => s.status === 'active').length ?? 0;
  const draftCount = (skills?.length ?? 0) - activeCount;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Skills</h1>
          <p className="admin-page-desc">All playbook entries. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/skills/new')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New skill
        </button>
      </div>

      {!loading && skills && skills.length > 0 && (
        <div className="admin-stat-strip">
          <div className="admin-stat">
            <span className="admin-stat-value">{skills.length}</span>
            <span className="admin-stat-label">Total</span>
          </div>
          <div className="admin-stat-sep" />
          <div className="admin-stat">
            <span className="admin-stat-value">{activeCount}</span>
            <span className="admin-stat-label">Active</span>
          </div>
          <div className="admin-stat-sep" />
          <div className="admin-stat">
            <span className="admin-stat-value">{draftCount}</span>
            <span className="admin-stat-label">Coming soon</span>
          </div>
        </div>
      )}

      {!loading && skills && skills.length > 0 && (
        <div className="admin-search-bar">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search skills…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Loading skills…</div>
      ) : filtered.length === 0 && search ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No results</div>
          <div className="admin-list-empty-desc">No skills match "{search}". Try a different search term.</div>
        </div>
      ) : skills.length === 0 ? (
        <div className="admin-list-empty">
          <div className="admin-list-empty-title">No skills yet</div>
          <div className="admin-list-empty-desc">Create your first skill to get started with the playbook.</div>
          <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/skills/new')}>
            Create first skill
          </button>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '56px' }}>Ch.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
              <th style={{ width: '32px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} onClick={() => navigate(`/admin/skills/${s.id}`)} style={{ cursor: 'pointer' }}>
                <td>
                  <span className="admin-table-chapter">{s.chapter}</span>
                </td>
                <td>
                  <span className="admin-table-link">{s.title}</span>
                </td>
                <td>
                  <span className="admin-badge">{s.category}</span>
                </td>
                <td>
                  <span className={`admin-badge ${s.status === 'active' ? 'green' : 'amber'}`}>
                    <span className="admin-badge-dot" />
                    {s.status === 'active' ? 'Active' : 'Coming soon'}
                  </span>
                </td>
                <td className="admin-table-meta">{s.last_updated}</td>
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
