import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import './admin.css';

export default function SkillsAdmin() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('skills')
      .select('id, chapter, category, title, status, last_updated')
      .order('id')
      .then(({ data }) => { setSkills(data); setLoading(false); });
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Skills</h1>
          <p className="admin-page-desc">All playbook entries. Click a row to edit.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/skills/new')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New skill
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">Loading skills…</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ch.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {skills?.map((s) => (
              <tr key={s.id} onClick={() => navigate(`/admin/skills/${s.id}`)} style={{ cursor: 'pointer' }}>
                <td className="admin-table-meta">{s.chapter}</td>
                <td>
                  <span className="admin-table-link">{s.title}</span>
                </td>
                <td>
                  <span className="admin-badge">{s.category}</span>
                </td>
                <td>
                  <span className={`admin-badge ${s.status === 'active' ? 'green' : 'amber'}`}>
                    {s.status === 'active' ? 'Active' : 'Coming soon'}
                  </span>
                </td>
                <td className="admin-table-meta">{s.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
