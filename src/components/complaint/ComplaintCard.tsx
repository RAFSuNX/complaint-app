import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { ComplaintStatus } from './ComplaintStatus';
import { formatFirestoreDate } from '../../lib/utils/date';
import { Button } from '../ui/Button';
import { Eye, Building2 } from 'lucide-react';
import type { Complaint } from '../../types';

interface Props {
  complaint: Complaint;
  showFeedback?: boolean;
}

export function ComplaintCard({ complaint, showFeedback = false }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
          <div className="flex items-center text-gray-600">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{complaint.department}</span>
          </div>
        </div>
        <ComplaintStatus status={complaint.status} />
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {formatFirestoreDate(complaint.createdAt)}
        </div>
        <Link to={`/complaint/${complaint.trackingNumber}`}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}