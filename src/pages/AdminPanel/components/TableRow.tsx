import { ComplaintStatus } from '../../../components/complaint/ComplaintStatus';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '../../../components/ui/Button';
import { Eye } from 'lucide-react';
import type { Column } from '../types';
import type { Complaint } from '../../../types';

interface Props {
  complaint: Complaint;
  columns: Column[];
  onStatusChange: (id: string, status: Complaint['status']) => void;
}

export function TableRow({ complaint, columns, onStatusChange }: Props) {
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await onStatusChange(complaint.id, e.target.value as Complaint['status']);
    } catch (error) {
      toast.error('Failed to update status');
      // Reset select to previous value
      e.target.value = complaint.status;
    }
  };

  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {column.key === 'status' ? (
            <ComplaintStatus status={complaint.status} />
          ) : column.key === 'actions' ? (
            <div className="flex items-center gap-2">
              <select
                value={complaint.status}
                onChange={handleStatusChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="inquiry">Inquiry</option>
                <option value="completed">Completed</option>
              </select>
              <Link to={`/complaint/${complaint.trackingNumber}`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </Link>
            </div>
          ) : (
            complaint[column.key as keyof Complaint]
          )}
        </td>
      ))}
    </tr>
  );
}