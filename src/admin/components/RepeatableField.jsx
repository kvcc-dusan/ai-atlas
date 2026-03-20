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
    <div className="repeatable-field">
      {values.map((val, i) => (
        <div key={i} className="repeatable-item">
          <span className="repeatable-item-num">{String(i + 1).padStart(2, '0')}</span>
          {multiline ? (
            <textarea
              className="admin-textarea"
              value={val}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
              rows={2}
            />
          ) : (
            <input
              type="text"
              className="admin-input"
              value={val}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
            />
          )}
          <div className="repeatable-item-btns">
            <button
              type="button"
              className="repeatable-ctrl"
              onClick={() => moveUp(i)}
              disabled={i === 0}
              title="Move up"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
            <button
              type="button"
              className="repeatable-ctrl"
              onClick={() => moveDown(i)}
              disabled={i === values.length - 1}
              title="Move down"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </button>
            <button
              type="button"
              className="repeatable-ctrl repeatable-ctrl-danger"
              onClick={() => remove(i)}
              title="Remove"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      ))}
      <button type="button" className="repeatable-add" onClick={add}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        Add item
      </button>
    </div>
  );
}
