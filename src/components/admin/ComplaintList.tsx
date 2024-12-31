import React from 'react';
import { Complaint } from '../../types/database';

interface ComplaintListProps {
  complaints: Complaint[];
}

export function ComplaintList({ complaints }: ComplaintListProps) {
  return (
    <div>
      <h2>Complaints</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.title}</td>
              <td>{complaint.description}</td>
              <td>{complaint.category}</td>
              <td>{complaint.location}</td>
              <td>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
