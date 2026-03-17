import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

const TIER_CLASS = { PRIMARY: 'blue', SECONDARY: '', SPECIALIZED: 'amber' };

export default function ToolsAdmin() {
  const navigate = useNavigate();
  const [tools, setTools] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('tools_data')
      .select('id, name, provider, category, tier, status')
      .order('name')
      .then(({ data }) => { setTools(data); setLoading(false); });
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Tools</h1>
          <p className="admin-page-desc">Evaluated AI tools. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/tools/new')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New tool
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading tools…</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Category</th>
              <th>Tier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tools?.map((t) => (
              <tr key={t.id} onClick={() => navigate(`/admin/tools/${t.id}`)} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`admin-status-dot ${t.status === 'approved' ? 'active' : ''}`} />
                    <span className="admin-table-link">{t.name}</span>
                  </div>
                </td>
                <td className="admin-table-meta">{t.provider}</td>
                <td><span className="admin-badge">{t.category}</span></td>
                <td><span className={`admin-badge ${TIER_CLASS[t.tier] ?? ''}`}>{t.tier}</span></td>
                <td><span className={`admin-badge ${t.status === 'approved' ? 'green' : ''}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
