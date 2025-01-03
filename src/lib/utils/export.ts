import { format } from 'date-fns';
import type { Complaint } from '../../types';

export function exportToCSV(complaints: Complaint[]): void {
  const headers = ['Tracking Number', 'Title', 'Department', 'Status', 'Created At', 'Location'];
  
  const csvContent = complaints.map(complaint => [
    complaint.trackingNumber,
    complaint.title,
    complaint.department,
    complaint.status,
    format(complaint.createdAt instanceof Date ? complaint.createdAt : new Date(complaint.createdAt), 'yyyy-MM-dd HH:mm:ss'),
    complaint.location
  ]);

  const csvString = [
    headers.join(','),
    ...csvContent.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `complaints-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}