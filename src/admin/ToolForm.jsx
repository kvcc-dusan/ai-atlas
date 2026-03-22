import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

const CATEGORIES = ['LLM', 'IDE', 'IMAGE GEN', 'CODE REVIEW', 'DESIGN', 'TESTING', 'PRODUCTIVITY', 'OTHER'];
const TIERS = ['PRIMARY', 'SECONDARY', 'SPECIALIZED'];

const EMPTY = {
  id: '',
  name: '',
  provider: '',
  category: 'LLM',
  status: 'approved',
  description: '',
  tier: 'SECONDARY',
};

function ConfirmDialog({ name, onConfirm, onCancel }) {
  const cancelRef = useRef(null);
  useEffect(() => { cancelRef.current?.focus(); }, []);
  return (
    <div className="admin-overlay" role="presentation">
      <div className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <h3 id="confirm-dialog-title">Delete "{name}"?</h3>
        <p>This will permanently remove this tool. This cannot be undone.</p>
        <div className="admin-dialog-actions">
          <button ref={cancelRef} className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Delete permanently</button>
        </div>
      </div>
    </div>
  );
}

export default function ToolForm() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!isNew) {
      supabase.from('tools_data').select('*').eq('id', id).single()
        .then(({ data }) => { if (data) setForm(data); setLoading(false); });
    }
  }, [id, isNew]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error: err } = isNew
      ? await supabase.from('tools_data').insert(form)
      : await supabase.from('tools_data').update(form).eq('id', id);
    setSaving(false);
    if (err) { console.error('Save error:', err); setError(`Save failed: ${err.message}`); }
    else {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      if (isNew) navigate(`/admin/tools/${form.id}`, { replace: true });
    }
  };

  const handleDelete = async () => {
    const { error: err } = await supabase.from('tools_data').delete().eq('id', id);
    if (err) setError(err.message);
    else navigate('/admin/tools');
  };

  if (loading) return <AdminLayout><div className="admin-loading">Loading tool…</div></AdminLayout>;

  return (
    <AdminLayout>
      {showConfirm && <ConfirmDialog name={form.name} onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
      {toast && <div className="admin-toast">All changes have been saved</div>}

      <button className="admin-back" onClick={() => navigate('/admin/tools')} aria-label="Back to Tools">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </button>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isNew ? 'New Tool' : form.name || 'Edit Tool'}</h1>
          <p className="admin-page-desc">{isNew ? 'Add a new tool to the evaluated tools list.' : `Editing ${form.category} tool`}</p>
        </div>
      </div>

      <form onSubmit={handleSave}>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Identity</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-row cols-2">
              <div className="admin-field">
                <label className="admin-label" htmlFor="tool-slug">
                  URL slug
                  <span className="admin-slug-badge" title="Unique ID used in the database. Lowercase, hyphens only. Set once, can't change.">ID</span>
                </label>
                <input
                  id="tool-slug"
                  className="admin-input mono"
                  value={form.id}
                  onChange={(e) => set('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="e.g. github-copilot"
                  required
                  disabled={!isNew}
                />
              </div>
              <div className="admin-field">
                <label className="admin-label" htmlFor="tool-name">Display name</label>
                <input id="tool-name" className="admin-input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. GitHub Copilot" required />
              </div>
            </div>

            <div className="admin-row cols-2">
              <div className="admin-field">
                <label className="admin-label" htmlFor="tool-provider">Provider / Company</label>
                <input id="tool-provider" className="admin-input" value={form.provider} onChange={(e) => set('provider', e.target.value)} placeholder="e.g. GitHub / Microsoft" />
              </div>
              <div className="admin-field">
                <label className="admin-label" htmlFor="tool-category">Category</label>
                <select id="tool-category" className="admin-select" value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-row cols-2">
              <div className="admin-field">
                <label className="admin-label" htmlFor="tool-tier">Tier</label>
                <select id="tool-tier" className="admin-select" value={form.tier} onChange={(e) => set('tier', e.target.value)}>
                  {TIERS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label" htmlFor="tool-status">Approval status</label>
                <select id="tool-status" className="admin-select" value={form.status} onChange={(e) => set('status', e.target.value)}>
                  <option value="approved">Approved</option>
                  <option value="under-review">Under review</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Description</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-field">
              <label className="admin-label" htmlFor="tool-description">Description</label>
              <textarea id="tool-description" className="admin-textarea" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe what this tool does and when to use it…" />
            </div>
          </div>
        </div>

        {error && <div className="admin-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isNew ? 'Create tool' : 'Save changes'}
          </button>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/tools')}>
            Cancel
          </button>
          {!isNew && (
            <button type="button" className="admin-btn admin-btn-danger admin-form-actions-right" onClick={() => setShowConfirm(true)}>
              Delete tool
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
