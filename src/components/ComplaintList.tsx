import React from 'react';
import { Complaint } from '../types/complaint';
import { formatDate } from '../utils/formatDate';

interface ComplaintListProps {
  complaints: Complaint[];
  isAdmin?: boolean;
}

export function ComplaintList({ complaints, isAdmin }: ComplaintListProps) {
  if (complaints.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No complaints found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            {isAdmin && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {complaints.map((complaint) => (
            <tr key={complaint.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{complaint.title}</div>
                <div className="text-sm text-gray-500">{complaint.category}</div>
              </td>
<td className="px-6 py-4 whitespace-nowrap">
  {isAdmin ? (
<select
  value={complaint.status}
  onChange={(event) => import('../lib/complaints/update').then(({ updateStatus }) => updateStatus(complaint.id, event.target.value as Complaint['status']))}
>
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="resolved">Resolved</option>
      <option value="rejected">Rejected</option>
    </select>
  ) : (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
      {complaint.status}
    </span>
  )}
</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(complaint.priority)}`}>
                  {complaint.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(complaint.createdAt)}
              </td>
{isAdmin && (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    {complaint.anonymousId ? 'Anonymous' : complaint.fullName}
  </td>
)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getStatusColor(status: Complaint['status']) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-primary-100 text-primary-800';
    case 'resolved':
      return 'bg-primary-200 text-primary-800';
    case 'rejected':
      return 'bg-danger-100 text-danger-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: Complaint['priority']) {
  switch (priority) {
    case 'high':
      return 'bg-danger-100 text-danger-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-primary-100 text-primary-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
