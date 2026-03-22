import React, { useState } from 'react';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import CopyIcon from '../../assets/icons/copy.svg';

export default function SkillPreview({ skill }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isDark, toggleTheme] = useTheme();

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

  const tocItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'tools', label: 'Tools' },
    { key: 'getting-started', label: 'Getting Started' },
    { key: 'prompts', label: 'Prompts' },
    { key: 'tips', label: 'Tips & Gotchas' },
  ];

  const scrollToSection = (key) => {
    const el = document.querySelector(`.preview-drawer-body [data-section="${key}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            <span className="detail-meta-label">{skill.chapter}</span>
            <span className="detail-meta-sep">/</span>
            <span className="detail-meta-label">{skill.category}</span>
            {skill.last_updated && (
              <>
                <span className="detail-meta-sep">/</span>
                <span className="detail-meta-date">{skill.last_updated}</span>
              </>
            )}
          </div>

          <h1 className="detail-heading">{skill.title || 'Untitled Skill'}</h1>

          <div className="detail-divider" />

          <div className="detail-layout">
            <aside className="detail-toc">
              <nav className="toc-nav">
                {tocItems.map((item) => (
                  <button
                    key={item.key}
                    className="toc-item"
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
                {(skill.overview ?? []).map((p, i) => (
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
                    {(skill.detail_tools ?? []).map((tool, i) => (
                      <tr key={i}>
                        <td><span className="detail-tool-link">{tool.name}</span></td>
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
                  {(skill.getting_started ?? []).map((step, i) => (
                    <li key={i} className="step-item">
                      <span className="step-number" />
                      <p className="step-content">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {(skill.image_rows ?? []).length > 0 && (
                <div className="detail-image-rows">
                  {skill.image_rows.map((row, i) => (
                    row.type === 'wide' && row.url ? (
                      <div key={i} className="detail-image-row-wide">
                        <img src={row.url} alt="" />
                      </div>
                    ) : row.type === 'pair' && (row.urls?.[0] || row.urls?.[1]) ? (
                      <div key={i} className="detail-image-row-pair">
                        {row.urls[0] && <div className="detail-image-row-square"><img src={row.urls[0]} alt="" /></div>}
                        {row.urls[1] && <div className="detail-image-row-square"><img src={row.urls[1]} alt="" /></div>}
                      </div>
                    ) : null
                  ))}
                </div>
              )}

              <section className="detail-section" data-section="prompts">
                <h2 className="detail-section-title">Prompt Templates</h2>
                {(skill.prompts ?? []).map((prompt, i) => (
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
                  {(skill.tips ?? []).map((tip, i) => (
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
    </>
  );
}
