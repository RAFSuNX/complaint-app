import React from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '../hooks/useComplaints';
import { Button } from '../components/ui/Button';
import { ComplaintList } from '../components/ComplaintList';

export default function DashboardPage() {
  const { complaints, loading, error } = useComplaints();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading complaints</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Complaints</h1>
        <Link to="/complaints/new">
          <Button>New Complaint</Button>
        </Link>
      </div>
      <ComplaintList complaints={complaints} />
    </div>
  );
}