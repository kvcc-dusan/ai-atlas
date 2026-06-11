import React from 'react';

export default function PublishToggle({ value, onChange }) {
  return (
    <label className="admin-publish-toggle">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="admin-publish-track" aria-hidden="true">
        <span className="admin-publish-thumb" />
      </span>
      <span className="admin-publish-text">
        {value ? 'Published — visible on site' : 'Draft — hidden from site'}
      </span>
    </label>
  );
}
