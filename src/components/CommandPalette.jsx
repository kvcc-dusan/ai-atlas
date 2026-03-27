import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette({ isOpen, onClose, onSkillClick, onUpdateClick, onToolClick, liveSkills, liveTools, liveUpdates }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim().toLowerCase() === 'admin') {
            onClose();
            navigate('/admin');
        }
    };

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 30);
        }
    }, [isOpen]);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    // Focus trap
    useEffect(() => {
        if (!isOpen) return;
        const trap = (e) => {
            if (e.key !== 'Tab' || !modalRef.current) return;
            const focusable = modalRef.current.querySelectorAll('button, input, [tabindex="0"]');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', trap);
        return () => document.removeEventListener('keydown', trap);
    }, [isOpen]);

    // Build flat prompts list from live Supabase skills
    const allPrompts = useMemo(() => {
        if (!liveSkills) return [];
        const result = [];
        liveSkills.forEach(skill => {
            const prompts = skill.detail?.prompts;
            if (!prompts?.length) return;
            prompts.forEach((p, i) => {
                result.push({
                    ...p,
                    skillId: skill.id,
                    skillTitle: skill.title,
                    skillChapter: skill.chapter,
                    category: skill.category,
                    key: `${skill.id}-${i}`,
                });
            });
        });
        return result;
    }, [liveSkills]);

    if (!isOpen) return null;

    const q = query.toLowerCase().trim();

    const matchedSkills = !q
        ? (liveSkills ?? []).slice(0, 5)
        : (liveSkills ?? []).filter(s =>
            s.title?.toLowerCase().includes(q) ||
            s.brief?.toLowerCase().includes(q) ||
            s.tools?.some(t => t.toLowerCase().includes(q)) ||
            s.category?.toLowerCase().includes(q)
        ).slice(0, 6);

    const matchedTools = (liveTools ?? []).filter(t =>
        !q || t.name?.toLowerCase().includes(q) || t.provider?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q)
    ).slice(0, !q ? 0 : 4);

    const matchedUpdates = (liveUpdates ?? []).filter(u =>
        !q || u.title?.toLowerCase().includes(q) || u.summary?.toLowerCase().includes(q)
    ).slice(0, !q ? 0 : 3);

    const matchedPrompts = !q
        ? []
        : allPrompts.filter(p =>
            p.title?.toLowerCase().includes(q) ||
            p.template?.toLowerCase().includes(q) ||
            p.context?.toLowerCase().includes(q) ||
            p.skillTitle?.toLowerCase().includes(q)
        ).slice(0, 4);

    const hasResults = matchedSkills.length || matchedTools.length || matchedUpdates.length || matchedPrompts.length;

    return (
        <div className="cmd-overlay" onClick={onClose} role="presentation">
            <div className="cmd-modal" ref={modalRef} role="dialog" aria-modal="true" aria-label="Search" onClick={e => e.stopPropagation()}>
                <div className="cmd-input-wrap">
                    <svg className="cmd-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        ref={inputRef}
                        className="cmd-input"
                        placeholder="Search skills, tools, prompts, articles…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <span className="cmd-esc-hint">esc</span>
                </div>

                <div className="cmd-results">
                    {q && !hasResults && (
                        <p className="cmd-empty">No results for &ldquo;{query}&rdquo;</p>
                    )}

                    {!q && (
                        <p className="cmd-hint">Start typing to search skills, tools, prompts and articles&hellip;</p>
                    )}

                    {matchedSkills.length > 0 && (
                        <div className="cmd-group">
                            <span className="cmd-group-label">Skills</span>
                            {matchedSkills.map(skill => (
                                <button
                                    key={skill.id}
                                    className="cmd-item"
                                    onClick={() => { onSkillClick(skill.id); onClose(); }}
                                >
                                    <span className="cmd-item-num">{skill.chapter}</span>
                                    <span className="cmd-item-title">{skill.title}</span>
                                    <span className="cmd-item-tag">{skill.category}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {matchedPrompts.length > 0 && (
                        <div className="cmd-group">
                            <span className="cmd-group-label">Prompts</span>
                            {matchedPrompts.map(prompt => (
                                <button
                                    key={prompt.key}
                                    className="cmd-item"
                                    onClick={() => {
                                        onClose();
                                        navigate(`/prompts?highlight=${encodeURIComponent(prompt.key)}`);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    <span className="cmd-item-num">{prompt.skillChapter}</span>
                                    <span className="cmd-item-title">{prompt.title}</span>
                                    <span className="cmd-item-tag">{prompt.category}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {matchedTools.length > 0 && (
                        <div className="cmd-group">
                            <span className="cmd-group-label">Tools</span>
                            {matchedTools.map(tool => (
                                <button
                                    key={tool.id}
                                    className="cmd-item"
                                    onClick={() => { onToolClick(tool.name); onClose(); }}
                                >
                                    <span className="cmd-item-num">{tool.provider}</span>
                                    <span className="cmd-item-title">{tool.name}</span>
                                    <span className="cmd-item-tag">{tool.category}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {matchedUpdates.length > 0 && (
                        <div className="cmd-group">
                            <span className="cmd-group-label">Articles</span>
                            {matchedUpdates.map(u => (
                                <button
                                    key={u.id}
                                    className="cmd-item"
                                    onClick={() => { onUpdateClick(u.id); onClose(); }}
                                >
                                    <span className="cmd-item-num">{u.tag}</span>
                                    <span className="cmd-item-title">{u.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
