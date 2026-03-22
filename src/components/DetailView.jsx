import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSkillById, useSkills } from '../hooks/useData';
import CopyIcon from '../assets/icons/copy.svg';

export default function DetailView({ onBack, onNavigate, onToolClick }) {
    const { id } = useParams();
    const { data: skill, loading } = useSkillById(parseInt(id, 10));
    const { data: allSkills } = useSkills();

    const [copiedIndex, setCopiedIndex] = useState(null);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        if (!skill) return;
        const sections = document.querySelectorAll('.detail-section[data-section]');
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.dataset.section);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
        );

        sections.forEach((s) => observer.observe(s));

        const handleScroll = () => {
            const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
            if (nearBottom) {
                const last = sections[sections.length - 1];
                if (last) setActiveSection(last.dataset.section);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [skill]);

    if (loading) {
        return (
            <div className="detail-view detail-view--skill">
                <div className="container">
                    <button className="detail-back" onClick={onBack}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                        </svg>
                    </button>
                    <p className="detail-text" style={{ marginTop: '3rem' }}>Loading…</p>
                </div>
            </div>
        );
    }

    if (!skill) {
        return (
            <div className="detail-view detail-view--skill">
                <div className="container">
                    <button className="detail-back" onClick={onBack}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                        </svg>
                    </button>
                    <p className="detail-text" style={{ marginTop: '3rem' }}>Skill not found.</p>
                </div>
            </div>
        );
    }

    const relatedSkills = skill.detail.relatedSkills
        ? skill.detail.relatedSkills.map((rid) => allSkills?.find((s) => s.id === rid)).filter(Boolean)
        : [];

    const handleCopy = async (text, index) => {
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
    };

    const tocItems = [
        { key: 'overview', label: 'Overview' },
        { key: 'tools', label: 'Tools' },
        { key: 'getting-started', label: 'Getting Started' },
        { key: 'prompts', label: 'Prompts' },
        { key: 'tips', label: 'Tips & Gotchas' },
        ...(relatedSkills.length > 0 ? [{ key: 'related', label: 'Related' }] : [])
    ];

    const scrollToSection = (key) => {
        const el = document.querySelector(`[data-section="${key}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="detail-view detail-view--skill">
            <div className="container">
                <button className="detail-back" onClick={onBack} aria-label="Back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                    </svg>
                </button>

                <div className="detail-meta">
                    <span className="detail-meta-label">{skill.chapter}</span>
                    <span className="detail-meta-sep">/</span>
                    <span className="detail-meta-label">{skill.category}</span>
                    {skill.lastUpdated && (
                        <>
                            <span className="detail-meta-sep">/</span>
                            <span className="detail-meta-date">{skill.lastUpdated}</span>
                        </>
                    )}
                </div>

                <h1 className="detail-heading">{skill.title}</h1>

                <div className="detail-divider" />

                <div className="detail-layout">
                    <aside className="detail-toc">
                        <nav className="toc-nav">
                            {tocItems.map((item) => (
                                <button
                                    key={item.key}
                                    className={`toc-item ${activeSection === item.key ? 'active' : ''}`}
                                    onClick={() => scrollToSection(item.key)}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="detail-content">
                        <section className="detail-section" data-section="overview">
                            <h2 className="detail-section-title">Overview</h2>
                            {skill.detail.overview.map((p, i) => (
                                <p key={i} className="detail-text">{p}</p>
                            ))}
                        </section>

                        <section className="detail-section" data-section="tools">
                            <h2 className="detail-section-title">Recommended Tools</h2>
                            <table className="tools-table">
                                <thead>
                                    <tr>
                                        <th>Tool</th>
                                        <th>Best For</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {skill.detail.tools.map((tool) => (
                                        <tr key={tool.name}>
                                            <td>
                                                <span
                                                    className="detail-tool-link"
                                                    onClick={() => onToolClick?.(tool.name)}
                                                >
                                                    {tool.name}
                                                </span>
                                            </td>
                                            <td>{tool.best}</td>
                                            <td>{tool.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <section className="detail-section" data-section="getting-started">
                            <h2 className="detail-section-title">Getting Started</h2>
                            <ol className="steps-list">
                                {skill.detail.gettingStarted.map((step, i) => (
                                    <li key={i} className="step-item">
                                        <span className="step-number" />
                                        <p className="step-content">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        {skill.image_rows?.length > 0 && (
                            <div className="detail-image-rows">
                                {skill.image_rows.map((row, i) => (
                                    row.type === 'wide' && row.url ? (
                                        <div key={i} className="detail-image-row-wide">
                                            <img src={row.url} alt="" loading="lazy" />
                                        </div>
                                    ) : row.type === 'pair' && (row.urls?.[0] || row.urls?.[1]) ? (
                                        <div key={i} className="detail-image-row-pair">
                                            {row.urls[0] && (
                                                <div className="detail-image-row-square">
                                                    <img src={row.urls[0]} alt="" loading="lazy" />
                                                </div>
                                            )}
                                            {row.urls[1] && (
                                                <div className="detail-image-row-square">
                                                    <img src={row.urls[1]} alt="" loading="lazy" />
                                                </div>
                                            )}
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        )}

                        <section className="detail-section" data-section="prompts">
                            <h2 className="detail-section-title">Prompt Templates</h2>
                            {skill.detail.prompts.map((prompt, i) => (
                                <div key={i} className="prompt-block">
                                    <div className="prompt-header">
                                        <span className="prompt-title">{prompt.title}</span>
                                        <button
                                            className={`copy-btn ${copiedIndex === i ? 'copied' : ''}`}
                                            onClick={() => handleCopy(prompt.template, i)}
                                        >
                                            <img src={CopyIcon} alt="Copy" className="icon-copy theme-svg" />
                                            {copiedIndex === i ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <p className="prompt-context">{prompt.context}</p>
                                    <pre className="prompt-template">{prompt.template}</pre>
                                </div>
                            ))}
                        </section>

                        <section className="detail-section" data-section="tips">
                            <h2 className="detail-section-title">Tips & Gotchas</h2>
                            <ul className="tips-list">
                                {skill.detail.tips.map((tip, i) => (
                                    <li key={i} className="tip-item">
                                        <span className="tip-marker">//</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {relatedSkills.length > 0 && (
                            <section className="detail-section" data-section="related">
                                <h2 className="detail-section-title">Related Skills</h2>
                                <div className="related-grid">
                                    {relatedSkills.map((s) => (
                                        <div
                                            key={s.id}
                                            className="related-card"
                                            onClick={() => onNavigate(s.id)}
                                        >
                                            <span className="related-chapter">{s.chapter}</span>
                                            <span className="related-title">{s.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
