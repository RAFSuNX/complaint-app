import React from 'react';
import { useComplaints } from '../../hooks/useComplaints';
import { StatusBadge } from '../StatusBadge';

export function ComplaintList() {
  const { complaints, loading, updateComplaintStatus } = useComplaints();

  if (loading) return <div>Loading complaints...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
      <div className="space-y-4">
        {complaints.slice(0, 5).map((complaint) => (
          <div key={complaint.id} className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{complaint.title}</h3>
                <p className="text-sm text-gray-600">{complaint.description}</p>
              </div>
              <StatusBadge status={complaint.status} />
            </div>
            <div className="mt-2 flex gap-2">
              <select
                value={complaint.status}
                onChange={(e) => updateComplaintStatus(complaint.id, e.target.value)}
                className="text-sm rounded border-gray-300"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}