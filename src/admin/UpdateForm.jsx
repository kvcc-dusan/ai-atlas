import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import RepeatableField from './components/RepeatableField';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import ImageUpload from './components/ImageUpload';
import PreviewDrawer from './previews/PreviewDrawer';
import UpdatePreview from './previews/UpdatePreview';
import './admin.css';

const TAGS = ['Model update', 'New tool', 'Policy change', 'New skill'];

function makeEmpty() {
  return {
    id: `update-${crypto.randomUUID().slice(0, 8)}`,
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
}

function ConfirmDialog({ title, onConfirm, onCancel }) {
  const cancelRef = useRef(null);
  useEffect(() => { cancelRef.current?.focus(); }, []);
  return (
    <div className="admin-overlay" role="presentation">
      <div className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <h3 id="confirm-dialog-title">Delete this article?</h3>
        <p>"{title}" will be permanently removed and disappear from the homepage carousel. This cannot be undone.</p>
        <div className="admin-dialog-actions">
          <button ref={cancelRef} className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
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

  const [form, setForm] = useState(() => isNew ? makeEmpty() : { id: '', date: '', title: '', summary: '', tag: 'Model update', image_url: '', image_aspect_ratio: '16/9', content: [], action_items: [], affected_skills: [] });
  const [contentText, setContentText] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    supabase.from('skills').select('id, title').order('id').then(({ data }) => setAllSkills(data ?? []));
    if (!isNew) {
      supabase.from('updates').select('*').eq('id', id).single()
        .then(({ data }) => {
          if (data) {
            setForm(data);
            setContentText((data.content ?? []).join('\n\n'));
          }
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form };
    payload.content = contentText.split(/\r?\n(\r?\n)+/).map(p => p.trim()).filter(Boolean);
    // Send null (not empty string) so the DB clears the value
    if (!payload.image_url) payload.image_url = null;
    const { error: err } = isNew
      ? await supabase.from('updates').insert(payload)
      : await supabase.from('updates').update(payload).eq('id', id);
    setSaving(false);
    if (err) { console.error('Save error:', err); setError(`Save failed: ${err.message}`); }
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
      {showPreview && (
        <PreviewDrawer onClose={() => setShowPreview(false)}>
          <UpdatePreview update={form} />
        </PreviewDrawer>
      )}
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
        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowPreview(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </button>
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
            <div className="admin-field">
              <p className="admin-field-hint">Type freely. Press Enter twice to start a new paragraph.</p>
              <textarea
                className="admin-textarea"
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                rows={12}
                placeholder="Write the article content here…"
                style={{ resize: 'vertical', lineHeight: '1.7' }}
              />
            </div>
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
            <MultiSelectDropdown
              options={allSkills.map(s => ({ value: s.id, label: s.title }))}
              selected={form.affected_skills ?? []}
              onChange={(v) => set('affected_skills', v)}
              placeholder="Select affected skills…"
            />
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
