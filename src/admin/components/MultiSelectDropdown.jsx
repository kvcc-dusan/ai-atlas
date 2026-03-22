import React, { useState, useRef, useEffect } from 'react';

export default function MultiSelectDropdown({ options = [], selected = [], onChange, placeholder = 'Select…' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setIsOpen(false); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Focus search when opened
  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 30);
  }, [isOpen]);

  // Clear search when closed
  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  const toggle = (value) => {
    if (selected.includes(value)) onChange(selected.filter(v => v !== value));
    else onChange([...selected, value]);
  };

  const filtered = search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedOptions = options.filter(o => selected.includes(o.value));

  return (
    <div className="ms-dropdown" ref={wrapRef}>
      <button
        type="button"
        className={`ms-trigger${isOpen ? ' open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOptions.length === 0 ? (
          <span className="ms-placeholder">{placeholder}</span>
        ) : (
          <div className="ms-tags">
            {selectedOptions.map(opt => (
              <span key={opt.value} className="ms-tag">
                {opt.label}
                <span
                  className="ms-tag-x"
                  role="button"
                  onClick={(e) => { e.stopPropagation(); toggle(opt.value); }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/>
                  </svg>
                </span>
              </span>
            ))}
          </div>
        )}
        <svg className="ms-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="ms-menu">
          {options.length > 5 && (
            <div className="ms-search-wrap">
              <input
                ref={searchRef}
                className="ms-search"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
          <div className="ms-options" role="listbox" aria-multiselectable="true">
            {filtered.length === 0 ? (
              <div className="ms-empty">No matches</div>
            ) : (
              filtered.map(opt => {
                const checked = selected.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`ms-option${checked ? ' checked' : ''}`}
                    role="option"
                    aria-selected={checked}
                  >
                    <input type="checkbox" checked={checked} onChange={() => toggle(opt.value)} />
                    <span className="ms-check">
                      {checked && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </span>
                    <span className="ms-option-label">{opt.label}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
