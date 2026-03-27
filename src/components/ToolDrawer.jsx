import React, { useEffect } from 'react';

export default function ToolDrawer({ tool, onClose, skills, onSkillClick }) {
    useEffect(() => {
        if (!tool) return;
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [tool, onClose]);

    if (!tool) return null;

    const usedIn = (tool.usedInSkills ?? [])
        .map(id => skills?.find(s => s.id === id))
        .filter(Boolean);

    return (
        <>
            <div className="tool-drawer-overlay" onClick={onClose} />
            <div className="tool-drawer" role="dialog" aria-label={tool.name}>
                <div className="tool-drawer-header">
                    <div className="tool-drawer-top">
                        <div className="tool-drawer-identity">
                            {tool.logoUrl
                                ? <div className="tool-drawer-logo"><img src={tool.logoUrl} alt={tool.name} /></div>
                                : <div className="tool-drawer-logo tool-drawer-logo-fallback">{tool.name.charAt(0)}</div>
                            }
                            <div className="tool-drawer-meta">
                                <div className="tool-drawer-name-row">
                                    <h2 className="tool-drawer-name">{tool.name}</h2>
                                    {tool.category && <span className="card-category">{tool.category}</span>}
                                </div>
                                <span className="tool-drawer-provider">{tool.provider}</span>
                            </div>
                        </div>
                        <div className="tool-drawer-actions">
                            <button className="tool-drawer-close" onClick={onClose} aria-label="Close">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="tool-drawer-body">
                    <p className="tool-drawer-desc">{tool.description}</p>

                    {tool.bestFor?.length > 0 && (
                        <div className="tool-drawer-section">
                            <h3 className="tool-drawer-section-title">Best for</h3>
                            <ul className="tool-drawer-list">
                                {tool.bestFor.map((item, i) => (
                                    <li key={i} className="tool-drawer-list-item">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {usedIn.length > 0 && (
                        <div className="tool-drawer-section">
                            <h3 className="tool-drawer-section-title">Used in skills</h3>
                            <div className="tool-drawer-skills">
                                {usedIn.map(skill => (
                                    <button
                                        key={skill.id}
                                        className="tool-drawer-skill-link"
                                        onClick={() => { onClose(); onSkillClick(skill.id); }}
                                    >
                                        <span className="tool-drawer-skill-chapter">{skill.chapter}</span>
                                        <span className="tool-drawer-skill-name">{skill.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
