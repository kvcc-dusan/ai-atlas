import React from 'react';

export default function ToolMultiSelect({ values = [], onChange, tools = [] }) {
  const toggle = (name) => {
    if (values.includes(name)) {
      onChange(values.filter(v => v !== name));
    } else {
      onChange([...values, name]);
    }
  };

  if (tools.length === 0) {
    return <p className="admin-field-hint">Loading tools…</p>;
  }

  return (
    <div className="tool-multiselect">
      {tools.map(tool => (
        <label key={tool.id} className="admin-checkbox-item">
          <input
            type="checkbox"
            checked={values.includes(tool.name)}
            onChange={() => toggle(tool.name)}
          />
          {tool.name}
        </label>
      ))}
    </div>
  );
}
