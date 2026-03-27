import React, { useEffect, useState, useMemo, useRef } from 'react';
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
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const draggedId = useRef(null);
  const dragOverId = useRef(null);
  const [dragOverIdState, setDragOverIdState] = useState(null);

  useEffect(() => {
    supabase
      .from('tools_data')
      .select('id, name, provider, category, tier, status, sort_order')
      .order('sort_order')
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
  const isDraggable = !search.trim();

  function handleDragStart(e, id) {
    draggedId.current = id;
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e, id) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverId.current !== id) {
      dragOverId.current = id;
      setDragOverIdState(id);
    }
  }

  function handleDragLeave() {
    dragOverId.current = null;
    setDragOverIdState(null);
  }

  async function handleDrop(e, targetId) {
    e.preventDefault();
    dragOverId.current = null;
    setDragOverIdState(null);

    const sourceId = draggedId.current;
    draggedId.current = null;

    if (!sourceId || sourceId === targetId) return;

    const current = [...tools];
    const sourceIdx = current.findIndex(t => t.id === sourceId);
    const targetIdx = current.findIndex(t => t.id === targetId);
    if (sourceIdx === -1 || targetIdx === -1) return;

    // Reorder
    const reordered = [...current];
    const [moved] = reordered.splice(sourceIdx, 1);
    reordered.splice(targetIdx, 0, moved);

    // Assign new sort_order values
    const withOrder = reordered.map((t, i) => ({ ...t, sort_order: i }));

    // Optimistic update
    setTools(withOrder);

    // Persist to Supabase
    setSaving(true);
    setSaveError(null);
    try {
      await Promise.all(
        withOrder.map(t =>
          supabase.from('tools_data').update({ sort_order: t.sort_order }).eq('id', t.id)
        )
      );
    } catch (err) {
      setSaveError('Failed to save order. Try again.');
      setTools(current); // rollback
    } finally {
      setSaving(false);
    }
  }

  function handleDragEnd() {
    draggedId.current = null;
    dragOverId.current = null;
    setDragOverIdState(null);
  }

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
        <div className="admin-search-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search tools…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          {saving && <span className="admin-save-hint">Saving order…</span>}
          {saveError && <span className="admin-save-hint admin-save-hint--error">{saveError}</span>}
          {!search && !saving && !saveError && (
            <span className="admin-save-hint">Drag rows to reorder</span>
          )}
          {search && <span className="admin-save-hint">Clear search to reorder</span>}
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
              <th style={{ width: '28px' }}></th>
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
              <tr
                key={t.id}
                draggable={isDraggable}
                onDragStart={isDraggable ? (e) => handleDragStart(e, t.id) : undefined}
                onDragOver={isDraggable ? (e) => handleDragOver(e, t.id) : undefined}
                onDragLeave={isDraggable ? handleDragLeave : undefined}
                onDrop={isDraggable ? (e) => handleDrop(e, t.id) : undefined}
                onDragEnd={isDraggable ? handleDragEnd : undefined}
                onClick={() => navigate(`/admin/tools/${t.id}`)}
                className={dragOverIdState === t.id ? 'drag-over' : ''}
                style={{ cursor: isDraggable ? 'grab' : 'pointer' }}
              >
                <td onClick={(e) => e.stopPropagation()} style={{ cursor: isDraggable ? 'grab' : 'default' }}>
                  {isDraggable && (
                    <span className="drag-handle" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <circle cx="4" cy="2.5" r="1.2" />
                        <circle cx="8" cy="2.5" r="1.2" />
                        <circle cx="4" cy="6" r="1.2" />
                        <circle cx="8" cy="6" r="1.2" />
                        <circle cx="4" cy="9.5" r="1.2" />
                        <circle cx="8" cy="9.5" r="1.2" />
                      </svg>
                    </span>
                  )}
                </td>
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
