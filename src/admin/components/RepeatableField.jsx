import React from 'react';

export default function RepeatableField({ values = [], onChange, multiline = false, placeholder = '' }) {
  const add = () => onChange([...values, '']);
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));
  const update = (i, val) => onChange(values.map((v, idx) => (idx === i ? val : v)));
  const moveUp = (i) => {
    if (i === 0) return;
    const next = [...values];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  };
  const moveDown = (i) => {
    if (i === values.length - 1) return;
    const next = [...values];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onChange(next);
  };

  return (
    <div className="rf-field">
      {values.map((val, i) => (
        <div key={i} className="rf-item">
          <div className="rf-item-head">
            <span className="rf-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="rf-controls">
              <button type="button" className="rf-ctrl" onClick={() => moveUp(i)} disabled={i === 0} title="Move up">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button type="button" className="rf-ctrl" onClick={() => moveDown(i)} disabled={i === values.length - 1} title="Move down">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="rf-ctrl-divider" />
              <button type="button" className="rf-ctrl rf-ctrl-remove" onClick={() => remove(i)} title="Remove">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <div className="rf-item-body">
            {multiline ? (
              <textarea
                className="rf-textarea"
                value={val}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
                rows={2}
              />
            ) : (
              <input
                type="text"
                className="rf-input"
                value={val}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            )}
          </div>
        </div>
      ))}
      <button type="button" className="rf-add" onClick={add}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        Add item
      </button>
    </div>
  );
}
