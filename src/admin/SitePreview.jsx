import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import './admin.css';

const DEVICES = [
  { key: 'desktop', label: 'Desktop', width: null },
  { key: 'tablet',  label: 'Tablet',  width: 768  },
  { key: 'mobile',  label: 'Mobile',  width: 390  },
];

function IconDesktop() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="2" width="14" height="10" rx="1.5" />
      <path d="M5 14h6M8 12v2" />
    </svg>
  );
}

function IconTablet() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="1" width="10" height="14" rx="1.5" />
      <circle cx="8" cy="13" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconMobile() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="1" width="8" height="14" rx="1.5" />
      <circle cx="8" cy="13" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const icons = { desktop: <IconDesktop />, tablet: <IconTablet />, mobile: <IconMobile /> };

export default function SitePreview() {
  const [device, setDevice] = useState('desktop');
  const current = DEVICES.find(d => d.key === device);

  const iframeStyle = current.width
    ? { width: current.width, boxShadow: '0 0 0 1px #D4D4D8, 0 8px 40px rgba(0,0,0,0.12)' }
    : { width: '100%' };

  return (
    <AdminLayout fullWidth>
      <div className="site-preview-toolbar">
        <span className="site-preview-toolbar-title">Live Site Preview</span>
        <p className="site-preview-toolbar-sub">Showing current Supabase data — save edits first to see them here</p>
        <div className="site-preview-devices">
          {DEVICES.map(d => (
            <button
              key={d.key}
              className={`site-preview-device-btn ${device === d.key ? 'active' : ''}`}
              onClick={() => setDevice(d.key)}
            >
              {icons[d.key]}
              {d.label}
            </button>
          ))}
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn admin-btn-secondary admin-btn-sm"
        >
          Open in new tab ↗
        </a>
      </div>

      <div className="site-preview-viewport">
        <iframe
          src="/"
          className="site-preview-frame"
          style={iframeStyle}
          title="Live site preview"
        />
      </div>
    </AdminLayout>
  );
}
