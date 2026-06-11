import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import SingleSelectDropdown from './components/SingleSelectDropdown';
import ConfirmDialog from './components/ConfirmDialog';
import PublishToggle from './components/PublishToggle';
import { ROLES, DIFFICULTIES } from '../lib/taxonomy';
import './admin.css';

const EMPTY = {
  number: '',
  title: '',
  description: '',
  category: '',
  difficulty: 'Beginner',
  roles: [],
  status: 'active',
  is_published: false,
  last_updated: new Date().toISOString().slice(0, 10),
  steps: [],
  related_skills: [],
};

const EMPTY_STEP = { title: '', text: '', tool: '', skill_id: null, prompt: '' };

export default function WorkflowForm() {
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
    supabase.from('skills').select('id, title').order('id').then(({ data }) => setAllSkills(data ?? []));
    supabase.from('tools_data').select('id, name').order('name').then(({ data }) => setAllTools(data ?? []));
    if (isNew) {
      supabase.from('workflows').select('number').then(({ data }) => {
        const maxNum = Math.max(0, ...(data ?? []).map(w => parseInt((w.number ?? '').replace(/\D/g, ''), 10) || 0));
        setForm(f => ({ ...f, number: `W${String(maxNum + 1).padStart(2, '0')}` }));
      });
    } else {
      supabase.from('workflows').select('*').eq('id', id).single()
        .then(({ data }) => {
          if (data) setForm(data);
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const updateStep = (i, field, value) => {
    const next = [...(form.steps ?? [])];
    next[i] = { ...next[i], [field]: value };
    set('steps', next);
  };
  const addStep = () => set('steps', [...(form.steps ?? []), { ...EMPTY_STEP }]);
  const removeStep = (i) => set('steps', (form.steps ?? []).filter((_, idx) => idx !== i));
  const moveStep = (i, dir) => {
    const next = [...(form.steps ?? [])];
    const target = i + dir;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    set('steps', next);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...form };
    // Tool tags on the card derive from step tools — no double entry
    payload.tools = [...new Set((payload.steps ?? []).map(s => s.tool).filter(Boolean))];
    if (isNew) delete payload.id;
    const { error: err, data: inserted } = isNew
      ? await supabase.from('workflows').insert(payload).select()
      : await supabase.from('workflows').update(payload).eq('id', id).select();
    setSaving(false);
    if (err) { console.error('Save error:', err); setError(`Save failed: ${err.message}`); }
    else {
      setToast(true);
      setTimeout(() => setToast(false), 2500);
      if (isNew && inserted?.[0]?.id) navigate(`/admin/workflows/${inserted[0].id}`, { replace: true });
    }
  };

  const handleDelete = async () => {
    const { error: err } = await supabase.from('workflows').delete().eq('id', id);
    if (err) setError(err.message);
    else navigate('/admin/workflows');
  };

  if (loading) return <AdminLayout><div className="admin-loading">Loading workflow…</div></AdminLayout>;

  return (
    <AdminLayout>
      {showConfirm && <ConfirmDialog title="Delete this workflow?" message="This will permanently remove the workflow and all its steps from the site. This cannot be undone." onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />}
      {toast && <div className="admin-toast">All changes have been saved</div>}

      <button className="admin-back" onClick={() => navigate('/admin/workflows')} aria-label="Back to Workflows">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </button>

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isNew ? 'New Workflow' : form.title || 'Edit Workflow'}</h1>
          <p className="admin-page-desc">{isNew ? 'A step-by-step recipe: each step names the tool, links a skill, and carries its prompt.' : `Editing workflow ${form.number}`}</p>
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
                <label className="admin-label">Number</label>
                <input className="admin-input mono" value={form.number} onChange={(e) => set('number', e.target.value)} placeholder="W01" required />
              </div>
              <div className="admin-field">
                <label className="admin-label">Category</label>
                <input className="admin-input" value={form.category ?? ''} onChange={(e) => set('category', e.target.value.toUpperCase())} placeholder="e.g. DEVELOPMENT" />
              </div>
            </div>

            <div className="admin-field">
              <label className="admin-label">Title</label>
              <input className="admin-input" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Ship a feature with AI assistance" required />
            </div>

            <div className="admin-field">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" value={form.description ?? ''} onChange={(e) => set('description', e.target.value)} placeholder="What this workflow achieves, end to end…" rows={3} />
            </div>

            <div className="admin-row cols-2">
              <div className="admin-field">
                <label className="admin-label">Difficulty</label>
                <select className="admin-select" value={form.difficulty ?? 'Beginner'} onChange={(e) => set('difficulty', e.target.value)}>
                  {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label">Roles</label>
                <p className="admin-field-hint">Leave empty if the workflow is for everyone.</p>
                <MultiSelectDropdown
                  options={ROLES.map(r => ({ value: r, label: r }))}
                  selected={form.roles ?? []}
                  onChange={(v) => set('roles', v)}
                  placeholder="Everyone"
                />
              </div>
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

        {/* ── Steps ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Steps</span>
          </div>
          <div className="admin-section-body">
            {(form.steps ?? []).map((step, i) => (
              <div key={i} className="structured-block">
                <div className="structured-block-header">
                  <span className="structured-block-num">Step {i + 1}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => moveStep(i, -1)} disabled={i === 0} aria-label="Move step up">↑</button>
                    <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => moveStep(i, 1)} disabled={i === (form.steps?.length ?? 0) - 1} aria-label="Move step down">↓</button>
                    <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removeStep(i)}>Remove</button>
                  </div>
                </div>
                <div className="structured-block-body">
                  <div className="admin-field">
                    <label className="admin-label">Step title</label>
                    <input className="admin-input" value={step.title ?? ''} onChange={(e) => updateStep(i, 'title', e.target.value)} placeholder="e.g. Draft the implementation plan" />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">What to do</label>
                    <textarea className="admin-textarea" rows={3} value={step.text ?? ''} onChange={(e) => updateStep(i, 'text', e.target.value)} placeholder="Describe the step in plain words…" />
                  </div>
                  <div className="admin-row cols-2">
                    <div className="admin-field">
                      <label className="admin-label">Tool (optional)</label>
                      <SingleSelectDropdown
                        options={allTools.map(t => ({ value: t.name, label: t.name }))}
                        value={step.tool ?? ''}
                        onChange={(v) => updateStep(i, 'tool', v)}
                        placeholder="— No tool —"
                      />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Linked skill (optional)</label>
                      <SingleSelectDropdown
                        options={allSkills.map(s => ({ value: s.id, label: s.title }))}
                        value={step.skill_id ?? ''}
                        onChange={(v) => updateStep(i, 'skill_id', v)}
                        placeholder="— No skill —"
                      />
                    </div>
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Prompt for this step (optional)</label>
                    <textarea className="admin-textarea" rows={4} value={step.prompt ?? ''} onChange={(e) => updateStep(i, 'prompt', e.target.value)} placeholder="Paste the copy-ready prompt. Use [brackets] for placeholders." />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="repeatable-add" onClick={addStep}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              Add step
            </button>
          </div>
        </div>

        {/* ── Related Skills ── */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-section-title">Related Skills</span>
          </div>
          <div className="admin-section-body">
            <MultiSelectDropdown
              options={allSkills.map(s => ({ value: s.id, label: s.title }))}
              selected={form.related_skills ?? []}
              onChange={(v) => set('related_skills', v)}
              placeholder="Select related skills…"
            />
          </div>
        </div>

        {error && <div className="admin-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div className="admin-publish-bar">
          <PublishToggle value={form.is_published} onChange={(v) => set('is_published', v)} />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving…' : isNew ? 'Create workflow' : 'Save changes'}
          </button>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/workflows')}>
            Cancel
          </button>
          {!isNew && (
            <button type="button" className="admin-btn admin-btn-danger admin-form-actions-right" onClick={() => setShowConfirm(true)}>
              Delete workflow
            </button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
}
