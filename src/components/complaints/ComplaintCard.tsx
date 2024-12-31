import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { StatusBadge } from '../ui/StatusBadge';
import { MapPin, Calendar } from 'lucide-react';
import type { Complaint } from '../../types/database';
import { formatDate } from '../../utils/formatDate';

interface Props {
  complaint: Complaint;
}

export function ComplaintCard({ complaint }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{complaint.title}</h3>
          <StatusBadge status={complaint.status} />
        </div>
        <p className="text-gray-600 mb-4">{complaint.description}</p>
        <div className="flex items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {complaint.location}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(complaint.created_at)}
          </div>
        </div>
      </CardContent>
      {complaint.category && (
        <CardFooter>
          <span className="text-sm font-medium text-primary-600">
            {complaint.category.replace('_', ' ').toUpperCase()}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}