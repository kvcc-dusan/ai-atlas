import React from 'react';
import { useUpdates } from '../hooks/useData';

function formatDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function Footer() {
    const { data: updates } = useUpdates();
    const latestDate = updates?.[0]?.date ? formatDate(updates[0].date) : null;

    return (
        <footer className="footer">
            <div className="footer-inner">
                <span className="footer-brand-name">AI Atlas</span>
                <span className="footer-text">INOVA IT</span>
                {latestDate && (
                    <span className="footer-text">Updated {latestDate}</span>
                )}
            </div>
        </footer>
    );
}
