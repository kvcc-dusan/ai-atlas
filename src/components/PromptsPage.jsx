import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSkills } from '../hooks/useData';

export default function PromptsPage({ onBack }) {
    const { data: skills, loading } = useSkills();
    const [activeCategory, setActiveCategory] = useState('All');
    const [copiedKey, setCopiedKey] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const highlightKey = searchParams.get('highlight');
    const highlightRef = useRef(null);

    const allPrompts = useMemo(() => {
        if (!skills) return [];
        const result = [];
        skills.forEach(skill => {
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
    }, [skills]);

    const categories = useMemo(() => {
        return ['All', ...new Set(allPrompts.map(p => p.category).filter(Boolean))];
    }, [allPrompts]);

    const filtered = activeCategory === 'All'
        ? allPrompts
        : allPrompts.filter(p => p.category === activeCategory);

    // When the highlighted prompt is known, make sure "All" is active so it's visible,
    // then scroll to it and clear the URL param after a moment.
    useEffect(() => {
        if (!highlightKey || loading || allPrompts.length === 0) return;

        // Make sure "All" is selected so the card is visible
        setActiveCategory('All');

        // Small delay so the grid renders, then scroll
        const timer = setTimeout(() => {
            if (highlightRef.current) {
                highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 120);

        // Clear the ?highlight param after 3s so the ring fades and URL is clean
        const cleanup = setTimeout(() => {
            setSearchParams({}, { replace: true });
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(cleanup);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [highlightKey, loading, allPrompts.length]);

    const handleCopy = async (text, key) => {
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
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    return (
        <div className="prompts-page">
            <div className="container">

                {/* ── Back button ── */}
                <button className="detail-back" onClick={onBack} aria-label="Back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                    </svg>
                </button>

                {/* ── Header ── */}
                <div className="prompts-header">
                    <div className="prompts-header-label">Prompt Library</div>
                    <h1 className="prompts-heading">Ready-to-use prompts,<br />copy and adapt.</h1>
                    <p className="prompts-subheading">
                        Every skill in your Atlas ships with battle-tested prompts. Filter by category and paste straight into your AI of choice. Use the global search (⌘K) to find specific prompts.
                    </p>
                </div>

                {/* ── Category filters ── */}
                <div className="prompts-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`prompts-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                            {cat === 'All' && !loading && (
                                <span className="prompts-filter-count">{allPrompts.length}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ── Results meta ── */}
                {!loading && (
                    <div className="prompts-results-meta">
                        {filtered.length} prompt{filtered.length !== 1 ? 's' : ''}
                    </div>
                )}

                {/* ── Grid ── */}
                {loading ? (
                    <div className="prompts-loading">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="pcard pcard--skeleton">
                                <div className="pcard-skeleton-line pcard-skeleton-line--short" />
                                <div className="pcard-skeleton-line" />
                                <div className="pcard-skeleton-line pcard-skeleton-line--long" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="prompts-grid">
                        {filtered.map(prompt => {
                            const isHighlighted = highlightKey === prompt.key;
                            return (
                                <div
                                    key={prompt.key}
                                    ref={isHighlighted ? highlightRef : null}
                                    className={`pcard ${isHighlighted ? 'pcard--highlighted' : ''}`}
                                >
                                    {/* Card header: title left, category tag right */}
                                    <div className="pcard-header">
                                        <h3 className="pcard-title">{prompt.title}</h3>
                                        {prompt.category && (
                                            <span className="pcard-category">{prompt.category}</span>
                                        )}
                                    </div>

                                    {/* Context description */}
                                    {prompt.context && (
                                        <p className="pcard-context">{prompt.context}</p>
                                    )}

                                    {/* Gray template area with copy button pinned bottom-right */}
                                    <div className="pcard-template-wrap">
                                        <pre className="pcard-template">{prompt.template}</pre>
                                        <button
                                            className={`pcard-copy-btn ${copiedKey === prompt.key ? 'copied' : ''}`}
                                            onClick={() => handleCopy(prompt.template, prompt.key)}
                                            aria-label="Copy prompt"
                                        >
                                            {copiedKey === prompt.key ? (
                                                <>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                                    </svg>
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
