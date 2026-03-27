import React, { useState } from 'react';
import { useUpdates } from '../hooks/useData';

export default function ArticlesCarousel({ onUpdateClick }) {
    const { data: updates, loading } = useUpdates();
    const [currentIndex, setCurrentIndex] = useState(0);

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
    const article = updates[safeIndex];

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % updates.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
    };

    return (
        <section className="articles-section" id="updates-section" >
            <div className="articles-inner">
                <div className="articles-content">
                    <div className="articles-body">
                        <span className="articles-tag">{article.tag}</span>
                        <div className="articles-text">
                            <h2
                                className="articles-heading"
                                onClick={() => onUpdateClick(article.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {article.title}
                            </h2>
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
