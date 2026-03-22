import React, { useState, useRef, useEffect } from 'react';

export default function SingleSelectDropdown({ options = [], value = '', onChange, placeholder = 'Select…' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') { e.stopPropagation(); setIsOpen(false); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 30);
    else setSearch('');
  }, [isOpen]);

  const select = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const filtered = search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selectedLabel = options.find(o => o.value === value)?.label;

  return (
    <div className="ms-dropdown" ref={wrapRef}>
      <button
        type="button"
        className={`ms-trigger${isOpen ? ' open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedLabel
          ? <span style={{ color: 'var(--admin-text-primary)', fontWeight: 500 }}>{selectedLabel}</span>
          : <span className="ms-placeholder">{placeholder}</span>
        }
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
          <div className="ms-options" role="listbox">
            {filtered.length === 0 ? (
              <div className="ms-empty">No matches</div>
            ) : (
              filtered.map(opt => {
                const checked = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    className={`ms-option${checked ? ' checked' : ''}`}
                    role="option"
                    aria-selected={checked}
                    tabIndex={0}
                    onClick={() => select(opt.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(opt.value); } }}
                  >
                    <span className="ms-check">
                      {checked && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </span>
                    <span className="ms-option-label">{opt.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
