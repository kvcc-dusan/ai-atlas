import React from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateById, useSkills } from '../hooks/useData';

export default function UpdateDetailView({ onBack, onSkillClick }) {
    const { id } = useParams();
    const { data: update, loading } = useUpdateById(id);
    const { data: allSkills } = useSkills();

    if (loading) {
        return (
            <div className="detail-view">
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

    if (!update) {
        return (
            <div className="detail-view">
                <div className="container">
                    <button className="detail-back" onClick={onBack}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                        </svg>
                    </button>
                    <p className="detail-text" style={{ marginTop: '3rem' }}>Article not found.</p>
                </div>
            </div>
        );
    }

    const affectedSkills = update.detail?.affectedSkills
        ? update.detail.affectedSkills.map((sid) => allSkills?.find((s) => s.id === sid)).filter(Boolean)
        : [];

    return (
        <div className="detail-view">
            <div className="container">
                <button className="detail-back" onClick={onBack} aria-label="Back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                    </svg>
                </button>

                <div className="detail-meta">
                    <span className="detail-meta-date">{update.date}</span>
                    <span className="update-tag">{update.tag}</span>
                </div>

                <h1 className="detail-heading">{update.title}</h1>

                <div className="detail-divider" />

                <section className="detail-section">
                    <h2 className="detail-section-title">Details</h2>
                    {update.detail.content.map((p, i) => (
                        <p key={i} className="detail-text">{p}</p>
                    ))}
                </section>

                {update.detail.actionItems?.length > 0 && (
                    <section className="detail-section">
                        <h2 className="detail-section-title">Action Items</h2>
                        <ul className="tips-list">
                            {update.detail.actionItems.map((item, i) => (
                                <li key={i} className="tip-item">
                                    <span className="tip-marker">{String(i + 1).padStart(2, '0')}</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {affectedSkills.length > 0 && (
                    <section className="detail-section">
                        <h2 className="detail-section-title">Affected Skills</h2>
                        <div className="related-grid">
                            {affectedSkills.map((s) => (
                                <div
                                    key={s.id}
                                    className="related-card"
                                    onClick={() => onSkillClick(s.id)}
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
    );
}
