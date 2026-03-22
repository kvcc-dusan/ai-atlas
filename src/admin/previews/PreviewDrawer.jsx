import React from 'react';
import { createPortal } from 'react-dom';

export default function PreviewDrawer({ children, onClose }) {
  return createPortal(
    <div className="preview-drawer">
      <div className="preview-drawer-bar">
        <span className="preview-drawer-label">Preview — changes not saved yet</span>
        <button className="preview-drawer-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Close preview
        </button>
      </div>
      <div className="preview-drawer-body">
        {children}
      </div>
    </div>,
    document.body
  );
}
