import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import ConfirmDialog from './components/ConfirmDialog';
import './admin.css';

function LogoUpload({ logoUrl, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const upload = async (file) => {
    if (!file || !file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB.'); return; }
    setUploading(true); setError(null);
    const ext = file.name.split('.').pop();
    const path = `logos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from('Images').upload(path, file, { cacheControl: '31536000', upsert: false });
    if (uploadErr) { setError(uploadErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from('Images').getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div
        className="tool-logo-upload-preview"
        onClick={() => inputRef.current?.click()}
        title="Click to upload logo"
      >
        {logoUrl
          ? <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : logoUrl ? 'Replace logo' : 'Upload logo'}
        </button>
        {logoUrl && (
          <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => onChange('')}>Remove</button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0])} hidden />
      {error && <div className="admin-error" style={{ fontSize: '0.75rem' }}>{error}</div>}
    </div>
  );
}

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
  logo_url: '',
};


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
      {showConfirm && <ConfirmDialog title={`Delete "${form.name}"?`} message="This will permanently remove this tool. This cannot be undone." onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
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
            <span className="admin-section-title">Logo</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-field">
              <label className="admin-label">Tool logo</label>
              <p className="admin-hint">Square image, shown as a circle in the tools list.</p>
              <LogoUpload logoUrl={form.logo_url || ''} onChange={(url) => set('logo_url', url)} />
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
