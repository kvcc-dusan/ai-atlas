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
              className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
              onClick={() => moveUp(i)}
              disabled={i === 0}
              title="Move up"
            >↑</button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
              onClick={() => moveDown(i)}
              disabled={i === values.length - 1}
              title="Move down"
            >↓</button>
            <button
              type="button"
              className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
              onClick={() => remove(i)}
              title="Remove"
            >×</button>
          </div>
        </div>
      ))}
      <button type="button" className="repeatable-add" onClick={add}>
        + Add item
      </button>
    </div>
  );
}
