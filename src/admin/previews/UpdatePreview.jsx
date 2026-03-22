import React from 'react';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';

export default function UpdatePreview({ update }) {
  const [isDark, toggleTheme] = useTheme();

  if (!update) return null;

  return (
    <>
      <Header
        activeNav={null}
        onNavClick={() => {}}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onOpenPalette={() => {}}
      />
      <div className="detail-view">
        <div className="container">
          <button className="detail-back" style={{ cursor: 'default' }} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
          </button>

          <div className="detail-meta">
            <span className="detail-meta-date">{update.date}</span>
            <span className="update-tag">{update.tag}</span>
          </div>

          <h1 className="detail-heading">{update.title || 'Untitled Article'}</h1>

          <div className="detail-divider" />

          {update.image_url && (
            <div
              className={`detail-hero-image${update.image_aspect_ratio === '1/1' ? ' ratio-square' : ''}`}
              style={{ aspectRatio: update.image_aspect_ratio || '16/9' }}
            >
              <img src={update.image_url} alt={update.title} />
            </div>
          )}

          <section className="detail-section">
            <h2 className="detail-section-title">Details</h2>
            {(update.content ?? []).map((p, i) => (
              <p key={i} className="detail-text">{p}</p>
            ))}
          </section>

          {(update.action_items ?? []).length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">Action Items</h2>
              <ul className="tips-list">
                {update.action_items.map((item, i) => (
                  <li key={i} className="tip-item">
                    <span className="tip-marker">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
