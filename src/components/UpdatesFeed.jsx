import React, { useState } from 'react';
import { useUpdates } from '../hooks/useData';

const SESSION_KEY = 'articles-index';

export default function ArticlesCarousel({ onUpdateClick }) {
    const { data: updates, loading } = useUpdates();
    const [currentIndex, setCurrentIndex] = useState(() => {
        const saved = sessionStorage.getItem(SESSION_KEY);
        return saved ? parseInt(saved, 10) : 0;
    });

    const setIndex = (val) => {
        setCurrentIndex(val);
        sessionStorage.setItem(SESSION_KEY, val);
    };

    if (loading || !updates?.length) {
        return (
            <section className="articles-section" id="updates-section" >
                <div className="articles-inner" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="articles-content">
                        <span className="articles-tag">Loading…</span>
                    </div>
                    <div className="articles-label"><span>ARTICLES</span></div>
                </div>
            </section>
        );
    }

    const safeIndex = Math.min(currentIndex, updates.length - 1);
    if (safeIndex !== currentIndex) setIndex(safeIndex);
    const article = updates[safeIndex];

    const goNext = (e) => {
        e.stopPropagation();
        const next = (currentIndex + 1) % updates.length;
        setIndex(next);
    };

    const goPrev = (e) => {
        e.stopPropagation();
        const prev = (currentIndex - 1 + updates.length) % updates.length;
        setIndex(prev);
    };

    const hasImage = !!article.image_url;

    return (
        <section
            className={`articles-section${hasImage ? ' articles-section--has-image' : ''}`}
            id="updates-section"
        >
            {hasImage && (
                <div className="articles-bg" key={article.id}>
                    <img src={article.image_url} alt="" aria-hidden="true" />
                    <div className="articles-bg-overlay" />
                </div>
            )}
            <div className="articles-inner">
                <div
                    className="articles-content"
                    onClick={() => onUpdateClick(article.id)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="articles-body">
                        <span className="articles-tag">{article.tag}</span>
                        <div className="articles-text">
                            <h2 className="articles-heading">{article.title}</h2>
                            <p className="articles-summary">{article.summary}</p>
                        </div>
                    </div>
                    <div className="articles-nav">
                        <button className="articles-arrow" onClick={goPrev} aria-label="Previous article">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="articles-arrow" onClick={goNext} aria-label="Next article">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <span className="articles-counter">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(updates.length).padStart(2, '0')}
                        </span>
                    </div>
                </div>
                <div className="articles-label">
                    <span>ARTICLES</span>
                </div>
            </div>
        </section>
    );
}
