import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import RepeatableField from './components/RepeatableField';
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
  best_for: [],
  used_in_skills: [],
  tier: 'SECONDARY',
};

function ConfirmDialog({ name, onConfirm, onCancel }) {
  return (
    <div className="admin-overlay">
      <div className="admin-dialog">
        <h3>Delete "{name}"?</h3>
        <p>This will permanently remove this tool. This cannot be undone.</p>
        <div className="admin-dialog-actions">
          <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
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
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    supabase.from('skills').select('id, title').order('id').then(({ data }) => setAllSkills(data ?? []));
    if (!isNew) {
      supabase.from('tools_data').select('*').eq('id', id).single()
        .then(({ data }) => { if (data) setForm(data); setLoading(false); });
    }
  }, [id, isNew]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleSkill = (sid) => {
    const cur = form.used_in_skills ?? [];
    set('used_in_skills', cur.includes(sid) ? cur.filter((x) => x !== sid) : [...cur, sid]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error: err } = isNew
      ? await supabase.from('tools_data').insert(form)
      : await supabase.from('tools_data').update(form).eq('id', id);
    if (err) { setError(err.message); setSaving(false); }
    else navigate('/admin/tools');
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
        {!isNew && (
          <button type="button" className="admin-btn admin-btn-danger" onClick={() => setShowConfirm(true)}>
            Delete tool
          </button>
        )}
      </div>

      <form onSubmit={handleSave}>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Identity</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-row cols-2">
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">
                    URL slug
                    <span className="admin-slug-badge" title="This is the unique ID used in the database. Use lowercase letters and hyphens only. Cannot be changed after creation. Example: 'github-copilot'">ID</span>
                  </label>
                  <p className="admin-field-hint">Unique identifier — lowercase, hyphens only, no spaces. Set once, can't change.</p>
                </div>
                <input
                  className="admin-input mono"
                  value={form.id}
                  onChange={(e) => set('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="e.g. github-copilot"
                  required
                  disabled={!isNew}
                />
              </div>
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Display name</label>
                  <p className="admin-field-hint">The name shown to users everywhere on the site</p>
                </div>
                <input className="admin-input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. GitHub Copilot" required />
              </div>
            </div>

            <div className="admin-row cols-2">
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Provider / Company</label>
                </div>
                <input className="admin-input" value={form.provider} onChange={(e) => set('provider', e.target.value)} placeholder="e.g. GitHub / Microsoft" />
              </div>
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Category</label>
                </div>
                <select className="admin-select" value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-row cols-2">
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Tier</label>
                </div>
                <select className="admin-select" value={form.tier} onChange={(e) => set('tier', e.target.value)}>
                  {TIERS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Approval status</label>
                </div>
                <select className="admin-select" value={form.status} onChange={(e) => set('status', e.target.value)}>
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
              <div className="admin-field-header">
                <label className="admin-label">Description</label>
              </div>
              <textarea className="admin-textarea" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe what this tool does and when to use it…" />
            </div>
            <div className="admin-field">
              <div className="admin-field-header">
                <label className="admin-label">Best for</label>
              </div>
              <RepeatableField values={form.best_for ?? []} onChange={(v) => set('best_for', v)} placeholder="e.g. Code generation" />
            </div>
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Used in Skills</span>
          </div>
          <div className="admin-section-body">
            <p className="admin-field-hint" style={{ marginTop: '-0.25rem' }}>Which skills reference this tool?</p>
            <div className="admin-checkbox-list">
              {allSkills.map((s) => (
                <label key={s.id} className="admin-checkbox-item">
                  <input
                    type="checkbox"
                    checked={(form.used_in_skills ?? []).includes(s.id)}
                    onChange={() => toggleSkill(s.id)}
                  />
                  {s.title}
                </label>
              ))}
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
