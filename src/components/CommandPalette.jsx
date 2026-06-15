import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Thin wrapper: the modal mounts fresh on every open, so query state
// and input focus reset naturally without isOpen-sync effects.
export default function CommandPalette({ isOpen, ...props }) {
    if (!isOpen) return null;
    return <PaletteModal {...props} />;
}

function DifficultyDot({ level }) {
    if (!level) return null;
    return <span className={`cmd-item-difficulty cmd-item-difficulty--${level.toLowerCase()}`}>{level}</span>;
}

function PaletteModal({ onClose, onSkillClick, onUpdateClick, onToolClick, onWorkflowClick, liveSkills, liveTools, liveUpdates, liveWorkflows }) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const activeItemRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => inputRef.current?.focus(), 30);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    // Focus trap
    useEffect(() => {
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
    }, []);

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

    const goToPrompt = (key) => {
        onClose();
        navigate(`/prompts?highlight=${encodeURIComponent(key)}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Sections built as data so the same list drives rendering AND keyboard nav
    const sections = useMemo(() => {
        const q = query.toLowerCase().trim();
        const idle = !q;

        const skills = (idle
            ? (liveSkills ?? []).slice(0, 4)
            : (liveSkills ?? []).filter(s =>
                s.title?.toLowerCase().includes(q) ||
                s.brief?.toLowerCase().includes(q) ||
                s.tools?.some(t => t.toLowerCase().includes(q)) ||
                s.category?.toLowerCase().includes(q) ||
                s.roles?.some(r => r.toLowerCase().includes(q))
            ).slice(0, 6)
        ).map(s => ({
            key: `skill-${s.id}`, num: s.chapter, title: s.title,
            tag: s.category, difficulty: s.difficulty, onSelect: () => { onSkillClick(s.id); onClose(); },
        }));

        const workflows = (idle
            ? (liveWorkflows ?? []).slice(0, 3)
            : (liveWorkflows ?? []).filter(w =>
                w.title?.toLowerCase().includes(q) ||
                w.description?.toLowerCase().includes(q) ||
                w.tools?.some(t => t.toLowerCase().includes(q)) ||
                w.roles?.some(r => r.toLowerCase().includes(q))
            ).slice(0, 4)
        ).map(w => ({
            key: `workflow-${w.id}`, num: w.number, title: w.title,
            tag: 'Workflow', difficulty: w.difficulty, onSelect: () => { onWorkflowClick(w.id); onClose(); },
        }));

        const prompts = (idle ? [] : allPrompts.filter(p =>
            p.title?.toLowerCase().includes(q) ||
            p.template?.toLowerCase().includes(q) ||
            p.context?.toLowerCase().includes(q) ||
            p.skillTitle?.toLowerCase().includes(q)
        ).slice(0, 4)).map(p => ({
            key: `prompt-${p.key}`, num: p.skillChapter, title: p.title,
            tag: p.category, onSelect: () => goToPrompt(p.key),
        }));

        const tools = (idle ? [] : (liveTools ?? []).filter(t =>
            t.name?.toLowerCase().includes(q) ||
            t.provider?.toLowerCase().includes(q) ||
            t.category?.toLowerCase().includes(q)
        ).slice(0, 4)).map(t => ({
            key: `tool-${t.id}`, num: t.provider, title: t.name,
            tag: t.category, onSelect: () => { onToolClick(t.name); onClose(); },
        }));

        const updates = (idle ? [] : (liveUpdates ?? []).filter(u =>
            u.title?.toLowerCase().includes(q) ||
            u.summary?.toLowerCase().includes(q)
        ).slice(0, 3)).map(u => ({
            key: `update-${u.id}`, num: u.tag, title: u.title,
            onSelect: () => { onUpdateClick(u.id); onClose(); },
        }));

        return [
            { label: idle ? 'Jump to' : 'Skills', items: skills },
            { label: 'Workflows', items: workflows },
            { label: 'Prompts', items: prompts },
            { label: 'Tools', items: tools },
            { label: 'Articles', items: updates },
        ].filter(s => s.items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, liveSkills, liveWorkflows, liveTools, liveUpdates, allPrompts]);

    // Flatten in display order so arrow keys can walk every result
    const flatItems = useMemo(() => sections.flatMap(s => s.items), [sections]);
    const hasResults = flatItems.length > 0;

    // Keep the selection in range as results change
    useEffect(() => { setSelectedIndex(0); }, [query]);

    // Keep the keyboard-selected row inside the scrollable viewport
    useEffect(() => {
        activeItemRef.current?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (query.trim().toLowerCase() === 'admin') {
                onClose();
                navigate('/admin');
                return;
            }
            flatItems[selectedIndex]?.onSelect();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((i) => (flatItems.length ? (i + 1) % flatItems.length : 0));
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((i) => (flatItems.length ? (i - 1 + flatItems.length) % flatItems.length : 0));
        }
    };

    // Running index so each rendered row knows its place in the flat list
    let runningIndex = -1;

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
                        placeholder="Search skills, workflows, prompts, tools, articles…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <span className="cmd-esc-hint">esc</span>
                </div>

                <div className="cmd-results">
                    {query.trim() && !hasResults && (
                        <p className="cmd-empty">No results for &ldquo;{query}&rdquo;</p>
                    )}

                    {sections.map((section) => (
                        <div className="cmd-group" key={section.label}>
                            <span className="cmd-group-label">{section.label}</span>
                            {section.items.map((item) => {
                                runningIndex += 1;
                                const index = runningIndex;
                                const isActive = index === selectedIndex;
                                return (
                                    <button
                                        key={item.key}
                                        ref={isActive ? activeItemRef : null}
                                        className={`cmd-item ${isActive ? 'active' : ''}`}
                                        onClick={item.onSelect}
                                        onMouseMove={() => setSelectedIndex(index)}
                                    >
                                        {item.num && <span className="cmd-item-num">{item.num}</span>}
                                        <span className="cmd-item-title">{item.title}</span>
                                        <DifficultyDot level={item.difficulty} />
                                        {item.tag && <span className="cmd-item-tag">{item.tag}</span>}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="cmd-footer">
                    <span className="cmd-footer-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                    <span className="cmd-footer-hint"><kbd>↵</kbd> open</span>
                    <span className="cmd-footer-hint"><kbd>esc</kbd> close</span>
                </div>
            </div>
        </div>
    );
}
