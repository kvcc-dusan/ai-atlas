import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

const TAG_CLASS = {
  'Model update': 'blue',
  'New tool': 'green',
  'Policy change': 'amber',
  'New skill': 'green',
};

export default function UpdatesAdmin() {
  const navigate = useNavigate();
  const [updates, setUpdates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('updates')
      .select('id, date, title, tag')
      .order('date', { ascending: false })
      .then(({ data }) => { setUpdates(data); setLoading(false); });
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-desc">Updates and announcements. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/updates/new')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New article
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading articles…</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Tag</th>
            </tr>
          </thead>
          <tbody>
            {updates?.map((u) => (
              <tr key={u.id} onClick={() => navigate(`/admin/updates/${u.id}`)} style={{ cursor: 'pointer' }}>
                <td className="admin-table-meta" style={{ whiteSpace: 'nowrap' }}>{u.date}</td>
                <td><span className="admin-table-link">{u.title}</span></td>
                <td><span className={`admin-badge ${TAG_CLASS[u.tag] ?? ''}`}>{u.tag}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
