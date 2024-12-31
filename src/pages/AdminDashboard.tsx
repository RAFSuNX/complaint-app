import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { AdminStats } from '../components/admin/AdminStats';
import { ComplaintList } from '../components/admin/ComplaintList';
import { UserList } from '../components/admin/UserList';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function AdminDashboard() {
  const { isAdmin, loading, error } = useAdmin();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-accent-50 text-accent-700 p-4 rounded-md">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-600 -mt-6 -mx-6 px-6 py-12 sm:-mx-6 lg:-mx-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-primary-100 max-w-3xl">
            Manage complaints, users, and monitor system statistics.
          </p>
        </div>
      </div>
      
      <AdminStats />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <ComplaintList />
        <UserList />
      </div>
    </div>
  );
}