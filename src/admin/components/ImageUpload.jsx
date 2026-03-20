import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';

const ASPECT_RATIOS = [
  { label: '16:9', value: '16/9' },
  { label: '1:1', value: '1/1' },
];

export default function ImageUpload({ imageUrl, aspectRatio, onImageChange, onAspectRatioChange, bucket = 'Images' }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10 MB.');
      return;
    }

    setUploading(true);
    setError(null);

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '31536000',
      upsert: false,
    });

    if (uploadErr) {
      setError(uploadErr.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onImageChange(data.publicUrl);
    setUploading(false);
  };

  const handleFile = (e) => upload(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    upload(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    onImageChange('');
  };

  return (
    <div className="image-upload">
      {/* Aspect ratio selector */}
      <div className="image-upload-ratios">
        <span className="admin-label" style={{ marginBottom: '0.25rem' }}>Aspect ratio</span>
        <div className="image-upload-ratio-btns">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`image-ratio-btn ${aspectRatio === r.value ? 'active' : ''}`}
              onClick={() => onAspectRatioChange(r.value)}
            >
              <div className="image-ratio-preview" style={{ aspectRatio: r.value }} />
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload area / preview */}
      {imageUrl ? (
        <div className="image-upload-preview-wrap">
          <div className="image-upload-preview" style={{ aspectRatio: aspectRatio || '16/9' }}>
            <img src={imageUrl} alt="Uploaded" />
          </div>
          <div className="image-upload-actions">
            <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => inputRef.current?.click()}>
              Replace
            </button>
            <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`image-upload-dropzone ${dragOver ? 'drag-over' : ''}`}
          style={{ aspectRatio: aspectRatio || '16/9', maxHeight: '220px' }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="image-upload-label">
            {uploading ? 'Uploading…' : 'Click or drag an image here'}
          </span>
          <span className="image-upload-hint">JPG, PNG, WebP — max 10 MB</span>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
      {error && <div className="admin-error" style={{ marginTop: '0.5rem' }}>{error}</div>}
    </div>
  );
}
