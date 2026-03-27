import React, { useState, useMemo, useRef, useEffect } from 'react';
import SkillCard from './SkillCard';

const INITIAL_LIMIT = 12;

function ChevronDown() {
    return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ChevronUp() {
    return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function CardGrid({ skills, onCardClick, onToolClick, readIds = new Set(), showAll = false, onShowAll }) {
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [filterOpen, setFilterOpen] = useState(false);
    const dropdownRef = useRef(null);

    const activeCategories = useMemo(() => {
        const cats = new Set(skills.map((s) => s.category));
        return ['ALL', ...Array.from(cats)];
    }, [skills]);

    const filtered = useMemo(() => {
        if (activeFilter === 'ALL') return skills;
        return skills.filter((s) => s.category === activeFilter);
    }, [skills, activeFilter]);

    const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = filtered.length > INITIAL_LIMIT && !showAll;

    const handleFilterSelect = (cat) => {
        setActiveFilter(cat);
        setFilterOpen(false);
    };

    // Click outside to close
    useEffect(() => {
        if (!filterOpen) return;
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [filterOpen]);

    return (
        <section className="section" id="skills-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills &amp; Domains</h2>
                    <div className="section-header-right">
                        <div className="filter-dropdown-wrap" ref={dropdownRef}>
                            <button
                                className={`filter-trigger ${activeFilter !== 'ALL' ? 'has-filter' : ''}`}
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                {activeFilter === 'ALL' ? 'Filter' : activeFilter}
                                <span className="filter-arrow">
                                    {filterOpen ? <ChevronUp /> : <ChevronDown />}
                                </span>
                            </button>
                            {filterOpen && (
                                <div className="filter-dropdown">
                                    {activeCategories.map((cat) => (
                                        <button
                                            key={cat}
                                            className={`filter-dropdown-item ${activeFilter === cat ? 'active' : ''}`}
                                            onClick={() => handleFilterSelect(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className="section-count">{filtered.length} {activeFilter === 'ALL' ? 'entries' : 'matching'}</span>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state-text">No skills match your filters.</p>
                        <button className="empty-state-clear" onClick={() => setActiveFilter('ALL')}>
                            Clear filter
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="card-grid">
                            {visible.map((skill) => (
                                <SkillCard
                                    key={skill.id}
                                    skill={skill}
                                    onClick={() => onCardClick(skill.id)}
                                    onToolClick={onToolClick}
                                    isRead={readIds.has(skill.id)}
                                />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="card-grid-load-more">
                                <button
                                    className="load-more-btn"
                                    onClick={onShowAll}
                                >
                                    Load {filtered.length - INITIAL_LIMIT} more skills
                                    <ChevronDown />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
