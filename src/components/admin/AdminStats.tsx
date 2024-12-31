import React from 'react';
import { useStats } from '../../hooks/useStats';

export function AdminStats() {
  const { stats, loading, error } = useStats();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        <li>Total Users: {stats.totalUsers}</li>
        <li>Pending Complaints: {stats.pendingComplaints}</li>
        <li>Resolved Complaints: {stats.resolvedComplaints}</li>
        <li>Critical Issues: {stats.criticalIssues}</li>
      </ul>
    </div>
  );
}
