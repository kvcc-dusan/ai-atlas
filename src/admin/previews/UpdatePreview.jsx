import React from 'react';

export default function UpdatePreview({ update }) {
  if (!update) return null;

  return (
    <div className="detail-view">
      <div className="container">
        <div className="detail-meta">
          <span className="update-date">{update.date}</span>
          <span className="update-tag">{update.tag}</span>
        </div>

        <h1 className="detail-heading">{update.title || 'Untitled Article'}</h1>

        <section className="detail-section">
          <h2 className="detail-section-title">Details</h2>
          {(update.detail?.content ?? []).map((p, i) => (
            <p key={i} className="detail-text">{p}</p>
          ))}
        </section>

        {(update.detail?.actionItems?.length ?? 0) > 0 && (
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
      </div>
    </div>
  );
}
