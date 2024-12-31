import React from 'react';
import { useStats } from '../../hooks/useStats';
import { AlertCircle, CheckCircle, Clock, Users } from 'lucide-react';

export function AdminStats() {
  const { stats, loading } = useStats();

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={<Users className="h-6 w-6" />}
        color="bg-blue-500"
      />
      <StatCard
        title="Pending Complaints"
        value={stats.pendingComplaints}
        icon={<Clock className="h-6 w-6" />}
        color="bg-yellow-500"
      />
      <StatCard
        title="Resolved Complaints"
        value={stats.resolvedComplaints}
        icon={<CheckCircle className="h-6 w-6" />}
        color="bg-green-500"
      />
      <StatCard
        title="Critical Issues"
        value={stats.criticalIssues}
        icon={<AlertCircle className="h-6 w-6" />}
        color="bg-red-500"
      />
    </div>
  );
}

function StatCard({ title, value, icon, color }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}