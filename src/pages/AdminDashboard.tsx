import React from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { useComplaints } from '../hooks/useComplaints';
import { ComplaintList } from '../components/admin/ComplaintList';
import { AdminStats } from '../components/admin/AdminStats';

export function AdminDashboard() {
  const { isAdmin, loading, error } = useAdmin();
  const { complaints, loading: complaintsLoading, error: complaintsError } = useComplaints();

  if (loading || complaintsLoading) {
    return <div>Loading...</div>;
  }

  if (error || complaintsError) {
    return <div>Error: {error?.message || complaintsError?.message}</div>;
  }

  if (!isAdmin) {
    return <div>You are not authorized to access this page.</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminStats />
      <ComplaintList complaints={complaints} />
    </div>
  );
}
