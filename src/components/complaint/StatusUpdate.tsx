import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/Button';
import type { ComplaintStatus as StatusType } from '../../types';
import { updateComplaintStatus } from '../../lib/db/complaints';

interface Props {
  complaintId: string;
  currentStatus: StatusType;
  onStatusUpdated?: () => void;
}

export function StatusUpdate({ complaintId, currentStatus, onStatusUpdated }: Props) {
  const [status, setStatus] = useState<StatusType>(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateComplaintStatus(complaintId, status);
      toast.success('Status updated successfully');
      onStatusUpdated?.();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 print:hidden">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as StatusType)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
      >
        <option value="pending">Pending Review</option>
        <option value="in-progress">In Progress</option>
        <option value="inquiry">Additional Information Needed</option>
        <option value="completed">Completed</option>
      </select>
      <Button 
        onClick={handleUpdate} 
        disabled={loading || status === currentStatus}
        variant="primary"
        size="sm"
      >
        {loading ? 'Updating...' : 'Update Status'}
      </Button>
    </div>
  );
}