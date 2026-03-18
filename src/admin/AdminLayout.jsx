import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';
import './admin.css';

function IconSkills() {
  return (
    <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
}

function IconTools() {
  return (
    <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function IconArticles() {
  return (
    <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}

function IconPreview() {
  return (
    <svg className="admin-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

function getInitial(email) {
  if (!email) return '?';
  return email.charAt(0).toUpperCase();
}

export default function AdminLayout({ children, title, actions, fullWidth }) {
  const { session, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Close sidebar on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const email = session?.user?.email;
  const initial = getInitial(email);

  return (
    <div className="admin-layout">
      {/* Mobile hamburger */}
      <button
        className="admin-mobile-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <IconMenu />
      </button>

      {/* Mobile overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <span className="admin-sidebar-logo">Ai Atlas</span>
            <span className="admin-sidebar-label">Admin</span>
          </div>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-label">Content</div>
          <NavLink to="/admin/skills" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <IconSkills />
            Skills
          </NavLink>
          <NavLink to="/admin/tools" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <IconTools />
            Tools
          </NavLink>
          <NavLink to="/admin/updates" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <IconArticles />
            Articles
          </NavLink>

          <div className="admin-nav-label" style={{ marginTop: '0.75rem' }}>Site</div>
          <NavLink to="/admin/preview" onClick={() => setSidebarOpen(false)} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <IconPreview />
            Preview
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          {email && (
            <div className="admin-user-info">
              <div className="admin-user-avatar">{initial}</div>
              <div className="admin-user-email">{email}</div>
            </div>
          )}
          <button className="admin-logout-btn" onClick={handleLogout}>
            <IconLogout />
            Log out
          </button>
          <div className="admin-sidebar-version">v1.0 prod</div>
        </div>
      </aside>

      <main className="admin-main">
        {(title || actions) && (
          <div className="admin-topbar">
            <span className="admin-topbar-title">{title}</span>
            {actions && <div className="admin-topbar-actions">{actions}</div>}
          </div>
        )}
        {fullWidth
          ? <div className="admin-main-full">{children}</div>
          : <div className="admin-content">{children}</div>
        }
      </main>
    </div>
  );
}
