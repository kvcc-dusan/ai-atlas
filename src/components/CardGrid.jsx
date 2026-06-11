import React, { useState, useMemo, useRef, useEffect } from 'react';
import SkillCard from './SkillCard';
import WorkflowCard from './WorkflowCard';
import { ROLES, DIFFICULTIES } from '../lib/taxonomy';

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

// Dropdown filter; 'ALL' means inactive and shows the idle label instead
function FilterDropdown({ idleLabel, value, options, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="filter-dropdown-wrap" ref={wrapRef}>
            <button
                className={`filter-trigger ${value !== 'ALL' ? 'has-filter' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {value === 'ALL' ? idleLabel : value}
                <span className="filter-arrow">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </span>
            </button>
            {isOpen && (
                <div className="filter-dropdown">
                    {['ALL', ...options].map((option) => (
                        <button
                            key={option}
                            className={`filter-dropdown-item ${value === option ? 'active' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option === 'ALL' ? `All ${idleLabel.toLowerCase()}s` : option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function CardGrid({ skills, workflows = [], onCardClick, onWorkflowClick, onToolClick, readIds = new Set(), showAll = false, onShowAll }) {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [activeRole, setActiveRole] = useState('ALL');
    const [activeDifficulty, setActiveDifficulty] = useState('ALL');

    // Skills and workflows share the grid; kind drives card type and click target
    const items = useMemo(() => [
        ...skills.map((s) => ({ ...s, kind: 'skill' })),
        ...workflows.map((w) => ({ ...w, kind: 'workflow' })),
    ], [skills, workflows]);

    const categories = useMemo(() => {
        return Array.from(new Set(items.map((s) => s.category).filter(Boolean)));
    }, [items]);

    const filtered = useMemo(() => {
        return items.filter((s) => {
            if (activeCategory !== 'ALL' && s.category !== activeCategory) return false;
            // No roles on an item = it's for everyone, so it survives any role filter
            if (activeRole !== 'ALL' && s.roles?.length > 0 && !s.roles.includes(activeRole)) return false;
            if (activeDifficulty !== 'ALL' && s.difficulty !== activeDifficulty) return false;
            return true;
        });
    }, [items, activeCategory, activeRole, activeDifficulty]);

    const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
    const hasMore = filtered.length > INITIAL_LIMIT && !showAll;
    const hasActiveFilter = activeCategory !== 'ALL' || activeRole !== 'ALL' || activeDifficulty !== 'ALL';

    const clearFilters = () => {
        setActiveCategory('ALL');
        setActiveRole('ALL');
        setActiveDifficulty('ALL');
    };

    return (
        <section className="section" id="skills-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills &amp; Workflows</h2>
                    <div className="section-header-right">
                        <FilterDropdown idleLabel="Category" value={activeCategory} options={categories} onSelect={setActiveCategory} />
                        <FilterDropdown idleLabel="Role" value={activeRole} options={ROLES} onSelect={setActiveRole} />
                        <FilterDropdown idleLabel="Level" value={activeDifficulty} options={DIFFICULTIES} onSelect={setActiveDifficulty} />
                        <span className="section-count">{filtered.length} {hasActiveFilter ? 'matching' : 'entries'}</span>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state-text">No skills match your filters.</p>
                        <button className="empty-state-clear" onClick={clearFilters}>
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="card-grid">
                            {visible.map((item) => (
                                item.kind === 'workflow' ? (
                                    <WorkflowCard
                                        key={`workflow-${item.id}`}
                                        workflow={item}
                                        onClick={() => onWorkflowClick(item.id)}
                                        onToolClick={onToolClick}
                                    />
                                ) : (
                                    <SkillCard
                                        key={`skill-${item.id}`}
                                        skill={item}
                                        onClick={() => onCardClick(item.id)}
                                        onToolClick={onToolClick}
                                        isRead={readIds.has(item.id)}
                                    />
                                )
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
