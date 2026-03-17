import React, { useState, useMemo, useRef, useEffect } from 'react';
import SkillCard from './SkillCard';

function ChevronDown() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function ChevronUp() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
        </svg>
    );
}

export default function CardGrid({ skills, onCardClick, onToolClick }) {
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
                    <h2 className="section-title">Skills & Domains</h2>
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
                    <div className="card-grid">
                        {filtered.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                onClick={() => onCardClick(skill.id)}
                                onToolClick={onToolClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
