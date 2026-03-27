import React, { useEffect, useRef } from 'react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
    const cancelRef = useRef(null);
    useEffect(() => { cancelRef.current?.focus(); }, []);
    return (
        <div className="admin-overlay" role="presentation">
            <div className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
                <h3 id="confirm-dialog-title">{title}</h3>
                <p>{message}</p>
                <div className="admin-dialog-actions">
                    <button ref={cancelRef} className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Delete permanently</button>
                </div>
            </div>
        </div>
    );
}
