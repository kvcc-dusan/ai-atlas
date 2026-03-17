import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      navigate('/admin/skills');
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-box">
        <div className="admin-login-logo">
          <span className="admin-login-logo-name">Ai Atlas</span>
          <span className="admin-login-logo-label">Admin</span>
        </div>
        <h1 className="admin-login-heading">Sign in</h1>
        <p className="admin-login-sub">Content management for Ai Atlas</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label className="admin-label">Email</label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoFocus
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <div className="admin-error">{error}</div>}
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading} style={{ marginTop: '0.25rem' }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  );
}
