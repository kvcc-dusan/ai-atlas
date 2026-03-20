import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import RepeatableField from './components/RepeatableField';
import ToolMultiSelect from './components/ToolMultiSelect';
import ImageRowsEditor from './components/ImageRowsEditor';
import './admin.css';

const CATEGORIES = ['CREATIVE', 'DEVELOPMENT', 'CONTENT', 'CORE SKILL', 'WORKFLOW', 'QA', 'PM', 'PRODUCTIVITY', 'REFERENCE', 'ADVANCED', 'POLICY'];

const EMPTY = {
  chapter: '',
  category: 'CREATIVE',
  title: '',
  brief: '',
  tools: [],
  status: 'active',
  last_updated: new Date().toISOString().slice(0, 10),
  image_rows: [],
  overview: [],
  getting_started: [],
  tips: [],
  detail_tools: [],
  prompts: [],
  related_skills: [],
};

function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="admin-overlay">
      <div className="admin-dialog">
        <h3>Delete this skill?</h3>
        <p>This will permanently remove the skill and all its content from the public site. This cannot be undone.</p>
        <div className="admin-dialog-actions">
          <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Delete permanently</button>
        </div>
      </div>
    </div>
  );
}

export default function SkillForm() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [allSkills, setAllSkills] = useState([]);
  const [allTools, setAllTools] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    supabase.from('skills').select('id, chapter, title').order('id').then(({ data }) => {
      const skills = data ?? [];
      setAllSkills(skills);
      if (isNew) {
        const maxChapter = Math.max(0, ...skills.map(s => parseInt(s.chapter, 10) || 0));
        const nextChapter = String(maxChapter + 1).padStart(2, '0');
        setForm(f => ({ ...f, chapter: nextChapter }));
      }
    });
    supabase.from('tools_data').select('id, name').order('name').then(({ data }) => setAllTools(data ?? []));
    if (!isNew) {
      supabase.from('skills').select('*').eq('id', id).single()
        .then(({ data }) => { if (data) setForm(data); setLoading(false); });
    }
  }, [id, isNew]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateDetailTool = (i, field, value) => {
    const next = [...(form.detail_tools ?? [])];
    next[i] = { ...next[i], [field]: value };
    set('detail_tools', next);
  };
  const addDetailTool = () => set('detail_tools', [...(form.detail_tools ?? []), { name: '', best: '', note: '' }]);
  const removeDetailTool = (i) => set('detail_tools', (form.detail_tools ?? []).filter((_, idx) => idx !== i));

  const updatePrompt = (i, field, value) => {
    const next = [...(form.prompts ?? [])];
    next[i] = { ...next[i], [field]: value };
    set('prompts', next);
  };
  const addPrompt = () => set('prompts', [...(form.prompts ?? []), { title: '', context: '', template: '' }]);
  const removePrompt = (i) => set('prompts', (form.prompts ?? []).filter((_, idx) => idx !== i));

  const toggleRelated = (sid) => {
    const cur = form.related_skills ?? [];
    set('related_skills', cur.includes(sid) ? cur.filter((x) => x !== sid) : [...cur, sid]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form };
    if (isNew) delete payload.id;
    // Send null (not empty string) so the DB clears the value
    if (!payload.image_url) payload.image_url = null;
    // Clean image_rows: keep only rows that have at least one image
    if (payload.image_rows) {
      payload.image_rows = payload.image_rows.filter(r =>
        r.type === 'wide' ? !!r.url : (r.urls?.[0] || r.urls?.[1])
      );
    }
    const { error: err, data: inserted } = isNew
      ? await supabase.from('skills').insert(payload).select()
      : await supabase.from('skills').update(payload).eq('id', id).select();
    setSaving(false);
    if (err) { console.error('Save error:', err); setError(err.message); }
    else {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      if (isNew && inserted?.[0]?.id) navigate(`/admin/skills/${inserted[0].id}`, { replace: true });
    }
  };

  const handleDelete = async () => {
    const { error: err } = await supabase.from('skills').delete().eq('id', id);
    if (err) setError(err.message);
    else navigate('/admin/skills');
  };

  if (loading) return <AdminLayout><div className="admin-loading">Loading skill…</div></AdminLayout>;

  return (
    <AdminLayout>
      {showConfirm && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
      {toast && <div className="admin-toast">All changes have been saved</div>}

      <button className="admin-back" onClick={() => navigate('/admin/skills')} aria-label="Back to Skills">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </button>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isNew ? 'New Skill' : form.title || 'Edit Skill'}</h1>
          <p className="admin-page-desc">{isNew ? 'Fill in the details below to add a new skill to the playbook.' : `Editing chapter ${form.chapter}`}</p>
        </div>
      </div>

      <form onSubmit={handleSave}>

        {/* ── Basic Info ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Basic Info</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-row cols-2">
              <div className="admin-field">
                <div className="admin-field-header">
                  <label className="admin-label">Chapter number</label>
                </div>
                <input className="admin-input mono" value={form.chapter} onChange={(e) => set('chapter', e.target.value)} placeholder="01" required />
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

            <div className="admin-field">
              <div className="admin-field-header">
                <label className="admin-label">Title</label>
              </div>
              <input className="admin-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. AI Image Generation" required />
            </div>

            <div className="admin-field">
              <div className="admin-field-header">
                <label className="admin-label">Brief description</label>
              </div>
              <textarea className="admin-textarea" value={form.brief} onChange={(e) => set('brief', e.target.value)} placeholder="Short description visible on the card grid…" rows={3} />
            </div>

            <div className="admin-row cols-2">
              <div className="admin-field">
                <label className="admin-label">Status</label>
                <select className="admin-select" value={form.status} onChange={(e) => set('status', e.target.value)}>
                  <option value="active">Active — visible on site</option>
                  <option value="coming-soon">Coming soon — greyed out</option>
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label">Last updated</label>
                <input type="date" className="admin-input" value={form.last_updated ?? ''} onChange={(e) => set('last_updated', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Tool Tags ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Tool Tags</span>
          </div>
          <div className="admin-section-body">
            <ToolMultiSelect values={form.tools ?? []} onChange={(v) => set('tools', v)} tools={allTools} />
          </div>
        </div>

        {/* ── Detail Content ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Overview</span>
          </div>
          <div className="admin-section-body">
            <RepeatableField values={form.overview ?? []} onChange={(v) => set('overview', v)} multiline placeholder="Write a paragraph…" />
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Getting Started</span>
          </div>
          <div className="admin-section-body">
            <RepeatableField values={form.getting_started ?? []} onChange={(v) => set('getting_started', v)} multiline placeholder="Describe a step…" />
          </div>
        </div>

        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Tips & Gotchas</span>
          </div>
          <div className="admin-section-body">
            <RepeatableField values={form.tips ?? []} onChange={(v) => set('tips', v)} multiline placeholder="Add a tip or warning…" />
          </div>
        </div>

        {/* ── Recommended Tools (table) ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Recommended Tools</span>
          </div>
          <div className="admin-section-body">
            {(form.detail_tools ?? []).map((t, i) => (
              <div key={i} className="structured-block">
                <div className="structured-block-header">
                  <span className="structured-block-num">Tool {i + 1}</span>
                  <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removeDetailTool(i)}>Remove</button>
                </div>
                <div className="structured-block-body">
                  <div className="admin-field">
                    <label className="admin-label">Tool name</label>
                    <select className="admin-select" value={t.name ?? ''} onChange={(e) => updateDetailTool(i, 'name', e.target.value)}>
                      <option value="">— Select a tool —</option>
                      {allTools.map(tool => <option key={tool.id} value={tool.name}>{tool.name}</option>)}
                    </select>
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Best for</label>
                    <input className="admin-input" value={t.best ?? ''} onChange={(e) => updateDetailTool(i, 'best', e.target.value)} placeholder="What this tool does best…" />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Notes</label>
                    <textarea className="admin-textarea" rows={2} value={t.note ?? ''} onChange={(e) => updateDetailTool(i, 'note', e.target.value)} placeholder="Access method, pricing, caveats…" />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="repeatable-add" onClick={addDetailTool}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              Add tool
            </button>
          </div>
        </div>

        {/* ── Images ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Images</span>
          </div>
          <div className="admin-section-body">
            <ImageRowsEditor rows={form.image_rows ?? []} onChange={(v) => set('image_rows', v)} />
          </div>
        </div>

        {/* ── Prompt Templates ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Prompt Templates</span>
          </div>
          <div className="admin-section-body">
            {(form.prompts ?? []).map((p, i) => (
              <div key={i} className="structured-block">
                <div className="structured-block-header">
                  <span className="structured-block-num">Prompt {i + 1}</span>
                  <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removePrompt(i)}>Remove</button>
                </div>
                <div className="structured-block-body">
                  <div className="admin-field">
                    <label className="admin-label">Title</label>
                    <input className="admin-input" value={p.title ?? ''} onChange={(e) => updatePrompt(i, 'title', e.target.value)} placeholder="e.g. Hero Image for Landing Page" />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">When to use this</label>
                    <input className="admin-input" value={p.context ?? ''} onChange={(e) => updatePrompt(i, 'context', e.target.value)} placeholder="Describe the situation where this prompt helps…" />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Prompt template</label>
                    <textarea className="admin-textarea" rows={5} value={p.template ?? ''} onChange={(e) => updatePrompt(i, 'template', e.target.value)} placeholder="Write the full prompt here. Use [brackets] for placeholders the user should replace." />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="repeatable-add" onClick={addPrompt}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              Add prompt
            </button>
          </div>
        </div>

        {/* ── Related Skills ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Related Skills</span>
          </div>
          <div className="admin-section-body">
            <div className="admin-checkbox-list">
              {allSkills.filter((s) => String(s.id) !== String(id)).map((s) => (
                <label key={s.id} className="admin-checkbox-item">
                  <input
                    type="checkbox"
                    checked={(form.related_skills ?? []).includes(s.id)}
                    onChange={() => toggleRelated(s.id)}
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
            {saving ? 'Saving…' : isNew ? 'Create skill' : 'Save changes'}
          </button>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/skills')}>
            Cancel
          </button>
          {!isNew && (
            <button type="button" className="admin-btn admin-btn-danger admin-form-actions-right" onClick={() => setShowConfirm(true)}>
              Delete skill
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
