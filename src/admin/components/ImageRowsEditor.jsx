import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';

const BUCKET = 'Images';

function UploadZone({ onUploaded, label, aspectRatio }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Not an image'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Max 10 MB'); return; }

    setUploading(true);
    setError(null);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: err } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
    });

    if (err) { setError(err.message); setUploading(false); return; }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    onUploaded(data.publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <div
        className={`image-upload-dropzone ${dragOver ? 'drag-over' : ''}`}
        style={{ aspectRatio: aspectRatio || '16/9' }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); upload(e.dataTransfer.files?.[0]); }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="image-upload-label" style={{ fontSize: '0.75rem' }}>
          {uploading ? 'Uploading…' : (label || 'Click or drag image')}
        </span>
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => upload(e.target.files?.[0])} hidden />
      {error && <div className="admin-error" style={{ marginTop: '0.375rem', fontSize: '0.75rem' }}>{error}</div>}
    </div>
  );
}

function ImageThumb({ url, aspectRatio, onReplace, onRemove }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const replace = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error: err } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: '31536000', upsert: false });
    if (!err) {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onReplace(data.publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="image-row-thumb-wrap">
      <div className="image-row-thumb" style={{ aspectRatio }}>
        <img src={url} alt="" />
        {uploading && <div className="image-row-thumb-loading">Uploading…</div>}
      </div>
      <div className="image-upload-actions">
        <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => inputRef.current?.click()}>Replace</button>
        <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={onRemove}>Remove</button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={(e) => replace(e.target.files?.[0])} hidden />
    </div>
  );
}

export default function ImageRowsEditor({ rows, onChange }) {
  const safeRows = rows ?? [];

  const addRow = (type) => {
    if (type === 'wide') {
      onChange([...safeRows, { type: 'wide', url: '' }]);
    } else {
      onChange([...safeRows, { type: 'pair', urls: ['', ''] }]);
    }
  };

  const updateRow = (i, updated) => {
    const next = [...safeRows];
    next[i] = updated;
    onChange(next);
  };

  const removeRow = (i) => {
    onChange(safeRows.filter((_, idx) => idx !== i));
  };

  const moveRow = (i, dir) => {
    const next = [...safeRows];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="image-rows-editor">
      {safeRows.map((row, i) => (
        <div key={i} className="structured-block">
          <div className="structured-block-header">
            <span className="structured-block-num">
              {row.type === 'wide' ? `Image row ${i + 1}` : `Image row ${i + 1}`}
            </span>
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {i > 0 && (
                <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => moveRow(i, -1)}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                </button>
              )}
              {i < safeRows.length - 1 && (
                <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => moveRow(i, 1)}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </button>
              )}
              <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removeRow(i)}>Remove</button>
            </div>
          </div>
          <div className="structured-block-body">
            {row.type === 'wide' ? (
              row.url ? (
                <ImageThumb
                  url={row.url}
                  aspectRatio="16/9"
                  onReplace={(url) => updateRow(i, { ...row, url })}
                  onRemove={() => updateRow(i, { ...row, url: '' })}
                />
              ) : (
                <UploadZone onUploaded={(url) => updateRow(i, { ...row, url })} label="Click or drag image" aspectRatio="16/9" />
              )
            ) : (
              <div className="image-row-pair">
                <div className="image-row-pair-slot">
                  {row.urls?.[0] ? (
                    <ImageThumb
                      url={row.urls[0]}
                      aspectRatio="1/1"
                      onReplace={(url) => {
                        const urls = [...(row.urls || ['', ''])];
                        urls[0] = url;
                        updateRow(i, { ...row, urls });
                      }}
                      onRemove={() => {
                        const urls = [...(row.urls || ['', ''])];
                        urls[0] = '';
                        updateRow(i, { ...row, urls });
                      }}
                    />
                  ) : (
                    <UploadZone
                      onUploaded={(url) => {
                        const urls = [...(row.urls || ['', ''])];
                        urls[0] = url;
                        updateRow(i, { ...row, urls });
                      }}
                      label="Left image"
                      aspectRatio="1/1"
                    />
                  )}
                </div>
                <div className="image-row-pair-slot">
                  {row.urls?.[1] ? (
                    <ImageThumb
                      url={row.urls[1]}
                      aspectRatio="1/1"
                      onReplace={(url) => {
                        const urls = [...(row.urls || ['', ''])];
                        urls[1] = url;
                        updateRow(i, { ...row, urls });
                      }}
                      onRemove={() => {
                        const urls = [...(row.urls || ['', ''])];
                        urls[1] = '';
                        updateRow(i, { ...row, urls });
                      }}
                    />
                  ) : (
                    <UploadZone
                      onUploaded={(url) => {
                        const urls = [...(row.urls || ['', ''])];
                        urls[1] = url;
                        updateRow(i, { ...row, urls });
                      }}
                      label="Right image"
                      aspectRatio="1/1"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="image-rows-add-btns">
        <button type="button" className="image-rows-add-btn" onClick={() => addRow('wide')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 9v6M9 12h6"/></svg>
          <span>Wide image</span>
          <span className="image-rows-add-btn-hint">16:9</span>
        </button>
        <button type="button" className="image-rows-add-btn" onClick={() => addRow('pair')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="8" height="16" rx="2"/><rect x="14" y="4" width="8" height="16" rx="2"/><path d="M6 10v4M18 10v4"/></svg>
          <span>Image pair</span>
          <span className="image-rows-add-btn-hint">1:1 + 1:1</span>
        </button>
      </div>
    </div>
  );
}
