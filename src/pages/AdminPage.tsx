import React from 'react';
import { useComplaints } from '../hooks/useComplaints';
import { ComplaintList } from '../components/ComplaintList';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminPage() {
  const { user, profile } = useAuth();
  const { complaints, loading, error } = useComplaints(true);

if (!profile || !user || profile.role !== 'admin') {
  return <Navigate to="/admin/login" replace />;
}

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading complaints</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Complaints</h1>
      <ComplaintList complaints={complaints} isAdmin />
    </div>
  );
}
