import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkflowById, useSkills, useTools } from '../hooks/useData';
import { useAnalytics } from '../hooks/useAnalytics';
import CopyIcon from '../assets/icons/copy.svg';
import GlowImage from './GlowImage';
import ShareButton from './ShareButton';

const formatDate = (str) => str
  ? new Date(str + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  : null;

function BackButton({ onBack }) {
    return (
        <button className="detail-back" onClick={onBack} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
        </button>
    );
}

export default function WorkflowDetailView({ onBack, onSkillClick, onToolClick }) {
    const { id } = useParams();
    const { data: workflow, loading } = useWorkflowById(parseInt(id, 10));
    const { data: allSkills } = useSkills();
    const { data: allTools } = useTools();
    const { trackEvent } = useAnalytics();

    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        if (workflow?.id) trackEvent('workflow_open', { entityId: String(workflow.id), label: workflow.title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workflow?.id, trackEvent]);

    if (loading) {
        return (
            <div className="detail-view">
                <div className="container">
                    <BackButton onBack={onBack} />
                    <p className="detail-text" style={{ marginTop: '3rem' }}>Loading…</p>
                </div>
            </div>
        );
    }

    if (!workflow) {
        return (
            <div className="detail-view">
                <div className="container">
                    <BackButton onBack={onBack} />
                    <p className="detail-text" style={{ marginTop: '3rem' }}>Workflow not found.</p>
                </div>
            </div>
        );
    }

    const handleCopy = async (text, index, title) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
        trackEvent('prompt_copy', { entityId: `workflow-${workflow.id}-${index}`, label: title ?? 'Workflow prompt' });
    };

    const relatedSkills = (workflow.relatedSkills ?? [])
        .map((rid) => allSkills?.find((s) => s.id === rid))
        .filter(Boolean);

    const skillById = (sid) => allSkills?.find((s) => s.id === sid);
    const toolByName = (name) => allTools?.find((t) => t.name.toLowerCase() === (name ?? '').toLowerCase());

    return (
        <div className="detail-view">
            <div className="container">
                <div className="detail-topbar">
                    <BackButton onBack={onBack} />
                    <ShareButton path={`/workflows/${workflow.id}`} />
                </div>

                <div className="detail-meta">
                    <span className="detail-meta-label">{workflow.number}</span>
                    <span className="detail-meta-sep">/</span>
                    <span className="detail-meta-label">Workflow</span>
                    {workflow.category && (
                        <>
                            <span className="detail-meta-sep">/</span>
                            <span className="detail-meta-label">{workflow.category}</span>
                        </>
                    )}
                    <span className="detail-meta-sep">/</span>
                    <span className="detail-meta-label">{workflow.difficulty}</span>
                    <span className="detail-meta-sep">/</span>
                    <span className="detail-meta-label">
                        {workflow.roles?.length ? workflow.roles.join(' · ') : 'Everyone'}
                    </span>
                    {workflow.estTime && (
                        <>
                            <span className="detail-meta-sep">/</span>
                            <span className="detail-meta-label">{workflow.estTime}</span>
                        </>
                    )}
                    {workflow.lastUpdated && (
                        <>
                            <span className="detail-meta-sep">/</span>
                            <span className="detail-meta-date">{formatDate(workflow.lastUpdated)}</span>
                        </>
                    )}
                </div>

                <h1 className="detail-heading">{workflow.title}</h1>

                {workflow.description && (
                    <p className="workflow-detail-desc">{workflow.description}</p>
                )}

                <div className="detail-divider" />

                {workflow.prerequisites?.length > 0 && (
                    <div className="workflow-prereqs">
                        <h2 className="detail-section-title">Before you start</h2>
                        <ul className="workflow-prereq-list">
                            {workflow.prerequisites.map((item, i) => (
                                <li key={i} className="workflow-prereq-item">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="workflow-steps-detail">
                    {(workflow.steps ?? []).map((step, i) => {
                        const linkedSkill = step.skill_id ? skillById(step.skill_id) : null;
                        const toolData = step.tool ? toolByName(step.tool) : null;
                        return (
                            <div key={i} className="workflow-step-block">
                                <div className="workflow-step-head">
                                    <span className="workflow-step-number">{String(i + 1).padStart(2, '0')}</span>
                                    <div className="workflow-step-title-wrap">
                                        {step.title && <h2 className="workflow-step-title">{step.title}</h2>}
                                        <div className="workflow-step-tags">
                                            {step.tool && (
                                                <span
                                                    className="card-tool-tag clickable"
                                                    onClick={() => onToolClick?.(toolData?.name ?? step.tool)}
                                                    title={`View ${step.tool} in Tools`}
                                                >
                                                    {step.tool}
                                                </span>
                                            )}
                                            {linkedSkill && (
                                                <button
                                                    className="workflow-step-skill-link"
                                                    onClick={() => onSkillClick(linkedSkill.id)}
                                                >
                                                    Skill: {linkedSkill.title}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {step.text && <p className="detail-text workflow-step-text">{step.text}</p>}

                                {step.image && (
                                    <GlowImage
                                        url={step.image}
                                        className="workflow-step-image"
                                        style={{ aspectRatio: step.image_ratio || '16/9' }}
                                    />
                                )}

                                {step.prompt && (
                                    <div className="prompt-block workflow-step-prompt">
                                        <div className="prompt-header">
                                            <span className="prompt-title">Prompt for this step</span>
                                            <button
                                                className={`copy-btn ${copiedIndex === i ? 'copied' : ''}`}
                                                onClick={() => handleCopy(step.prompt, i, step.title)}
                                            >
                                                <img src={CopyIcon} alt="Copy" className="icon-copy theme-svg" />
                                                {copiedIndex === i ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                        <pre className="prompt-template">{step.prompt}</pre>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {workflow.outcome && (
                    <div className="workflow-outcome">
                        <h2 className="detail-section-title">When you&apos;re done</h2>
                        <p className="workflow-outcome-text">{workflow.outcome}</p>
                    </div>
                )}

                {workflow.tips?.length > 0 && (
                    <section className="detail-section" style={{ marginTop: 'var(--space-2xl)' }}>
                        <h2 className="detail-section-title">Tips &amp; Gotchas</h2>
                        <ul className="tips-list">
                            {workflow.tips.map((tip, i) => (
                                <li key={i} className="tip-item">
                                    <span className="tip-marker">//</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {relatedSkills.length > 0 && (
                    <section className="detail-section" style={{ marginTop: 'var(--space-2xl)' }}>
                        <h2 className="detail-section-title">Related Skills</h2>
                        <div className="related-list">
                            {relatedSkills.map((s) => (
                                <div key={s.id} className="related-item" onClick={() => onSkillClick(s.id)}>
                                    <div className="related-item-left">
                                        <span className="related-item-title">{s.title}</span>
                                        <span className="card-category">{s.category}</span>
                                    </div>
                                    <svg className="related-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
