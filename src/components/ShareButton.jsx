import React, { useState } from 'react';

// Copies an absolute link to the clipboard. `path` is app-relative, e.g. '/skills/5'.
export default function ShareButton({ path, label = 'Share', className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async (e) => {
        e.stopPropagation();
        const url = `${window.location.origin}${path}`;
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = url;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            className={`share-btn ${copied ? 'copied' : ''} ${className}`}
            onClick={handleShare}
            aria-label="Copy link"
        >
            {copied ? (
                <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {label && 'Link copied'}
                </>
            ) : (
                <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    {label}
                </>
            )}
        </button>
    );
}
