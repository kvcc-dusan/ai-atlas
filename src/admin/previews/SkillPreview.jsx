import React, { useState } from 'react';
import CopyIcon from '../../assets/icons/copy.svg';

export default function SkillPreview({ skill }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!skill) return null;

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

  return (
    <div className="detail-view">
      <div className="container">
        <div className="detail-meta">
          <span className="card-chapter">{skill.chapter}</span>
          <span className="card-category">{skill.category}</span>
        </div>

        <h1 className="detail-heading">{skill.title || 'Untitled Skill'}</h1>

        {skill.lastUpdated && (
          <div className="detail-status-line">
            <span className="detail-updated">Last updated: {skill.lastUpdated}</span>
          </div>
        )}

        <div className="detail-layout">
          <aside className="detail-toc">
            <nav className="toc-nav">
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'tools', label: 'Tools' },
                { key: 'getting-started', label: 'Getting Started' },
                { key: 'prompts', label: 'Prompts' },
                { key: 'tips', label: 'Tips & Gotchas' },
              ].map(item => (
                <button key={item.key} className="toc-item">{item.label}</button>
              ))}
            </nav>
          </aside>

          <div className="detail-content">
            <section className="detail-section">
              <h2 className="detail-section-title">Overview</h2>
              {(skill.detail?.overview ?? []).map((p, i) => (
                <p key={i} className="detail-text">{p}</p>
              ))}
            </section>

            <section className="detail-section">
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
                  {(skill.detail?.tools ?? []).map((tool, i) => (
                    <tr key={i}>
                      <td><span className="detail-tool-link">{tool.name}</span></td>
                      <td>{tool.best}</td>
                      <td>{tool.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="detail-section">
              <h2 className="detail-section-title">Getting Started</h2>
              <ol className="steps-list">
                {(skill.detail?.gettingStarted ?? []).map((step, i) => (
                  <li key={i} className="step-item">
                    <span className="step-number" />
                    <p className="step-content">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="detail-section">
              <h2 className="detail-section-title">Prompt Templates</h2>
              {(skill.detail?.prompts ?? []).map((prompt, i) => (
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

            <section className="detail-section">
              <h2 className="detail-section-title">Tips & Gotchas</h2>
              <ul className="tips-list">
                {(skill.detail?.tips ?? []).map((tip, i) => (
                  <li key={i} className="tip-item">
                    <span className="tip-marker">//</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
