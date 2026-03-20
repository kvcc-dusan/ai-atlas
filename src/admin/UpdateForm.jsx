import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import RepeatableField from './components/RepeatableField';
import ImageUpload from './components/ImageUpload';
import './admin.css';

const TAGS = ['Model update', 'New tool', 'Policy change', 'New skill'];

const EMPTY = {
  id: '',
  date: new Date().toISOString().slice(0, 10),
  title: '',
  summary: '',
  tag: 'Model update',
  image_url: '',
  image_aspect_ratio: '16/9',
  content: [],
  action_items: [],
  affected_skills: [],
};

function ConfirmDialog({ title, onConfirm, onCancel }) {
  return (
    <div className="admin-overlay">
      <div className="admin-dialog">
        <h3>Delete this article?</h3>
        <p>"{title}" will be permanently removed and disappear from the homepage carousel. This cannot be undone.</p>
        <div className="admin-dialog-actions">
          <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Delete permanently</button>
        </div>
      </div>
    </div>
  );
}

export default function UpdateForm() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    supabase.from('skills').select('id, title').order('id').then(({ data }) => setAllSkills(data ?? []));
    if (isNew) {
      supabase.from('updates').select('id').then(({ data }) => {
        const nums = (data ?? []).map(r => parseInt(r.id.replace('update-', ''), 10)).filter(n => !isNaN(n) && n > 0);
        const next = Math.max(0, ...nums) + 1;
        setForm(f => ({ ...f, id: `update-${next}` }));
      });
    } else {
      supabase.from('updates').select('*').eq('id', id).single()
        .then(({ data }) => { if (data) setForm(data); setLoading(false); });
    }
  }, [id, isNew]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleSkill = (sid) => {
    const cur = form.affected_skills ?? [];
    set('affected_skills', cur.includes(sid) ? cur.filter((x) => x !== sid) : [...cur, sid]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form };
    // Send null (not empty string) so the DB clears the value
    if (!payload.image_url) payload.image_url = null;
    const { error: err } = isNew
      ? await supabase.from('updates').insert(payload)
      : await supabase.from('updates').update(payload).eq('id', id);
    setSaving(false);
    if (err) { console.error('Save error:', err); setError(err.message); }
    else {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      if (isNew) navigate(`/admin/updates/${form.id}`, { replace: true });
    }
  };

  const handleDelete = async () => {
    const { error: err } = await supabase.from('updates').delete().eq('id', id);
    if (err) setError(err.message);
    else navigate('/admin/updates');
  };

  if (loading) return <AdminLayout><div className="admin-loading">Loading article…</div></AdminLayout>;

  return (
    <AdminLayout>
      {showConfirm && <ConfirmDialog title={form.title} onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
      {toast && <div className="admin-toast">All changes have been saved</div>}

      <button className="admin-back" onClick={() => navigate('/admin/updates')} aria-label="Back to Articles">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </button>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isNew ? 'New Article' : form.title || 'Edit Article'}</h1>
          <p className="admin-page-desc">{isNew ? 'Add a new update to the homepage carousel.' : `Editing ${form.tag ?? 'article'}`}</p>
        </div>
      </div>

      <form onSubmit={handleSave}>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Basic Info</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-row cols-2">
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">
                    Article ID
                    <span className="admin-slug-badge" title="Unique identifier used in the URL. Format: update-6, update-7 etc. Set once, can't change.">ID</span>
                  </label>
                  {isNew
                    ? <p className="admin-field-hint">Auto-assigned: {form.id || '…computing'}</p>
                    : <p className="admin-field-hint">URL identifier — set at creation, can't change.</p>
                  }
                </div>
                <input
                  className="admin-input mono"
                  value={form.id}
                  readOnly
                  required
                  disabled
                />
              </div>
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Publish date</label>
                  <p className="admin-field-hint">Date shown on the article and used for ordering</p>
                </div>
                <input type="date" className="admin-input" value={form.date} onChange={(e) => set('date', e.target.value)} required />
              </div>
            </div>

            <div className="admin-field">
              <div className="admin-field-header">
                <label className="admin-label">Title</label>
              </div>
              <input className="admin-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Claude Opus 4.6 Released — What It Means for Us" required />
            </div>

            <div className="admin-field">
              <div className="admin-field-header">
                <label className="admin-label">Summary</label>
              </div>
              <textarea className="admin-textarea" rows={3} value={form.summary} onChange={(e) => set('summary', e.target.value)} placeholder="Short preview of the article shown on the homepage…" />
            </div>

            <div className="admin-field">
              <div className="admin-field-header">
                <label className="admin-label">Tag</label>
              </div>
              <select className="admin-select" value={form.tag} onChange={(e) => set('tag', e.target.value)}>
                {TAGS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Hero Image</span>
          </div>
          <div className="admin-section-body">
            <ImageUpload
              imageUrl={form.image_url ?? ''}
              aspectRatio={form.image_aspect_ratio ?? '16/9'}
              onImageChange={(url) => set('image_url', url)}
              onAspectRatioChange={(ratio) => set('image_aspect_ratio', ratio)}
            />
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Article Content</span>
          </div>
          <div className="admin-section-body">
            <RepeatableField values={form.content ?? []} onChange={(v) => set('content', v)} multiline placeholder="Write a paragraph…" />
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Action Items</span>
          </div>
          <div className="admin-section-body">
            <RepeatableField values={form.action_items ?? []} onChange={(v) => set('action_items', v)} multiline placeholder="e.g. Update your Claude settings to use Opus 4.6…" />
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Affected Skills</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-checkbox-list">
              {allSkills.map((s) => (
                <label key={s.id} className="admin-checkbox-item">
                  <input
                    type="checkbox"
                    checked={(form.affected_skills ?? []).includes(s.id)}
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
            {saving ? 'Saving…' : isNew ? 'Publish article' : 'Save changes'}
          </button>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/updates')}>
            Cancel
          </button>
          {!isNew && (
            <button type="button" className="admin-btn admin-btn-danger admin-form-actions-right" onClick={() => setShowConfirm(true)}>
              Delete article
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
