import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAdminAuth();

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'monospace' }}>Loading…</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
