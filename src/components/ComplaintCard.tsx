import React from 'react';
import type { Complaint } from '../types/database';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatDate';

interface Props {
  complaint: Complaint;
}

export function ComplaintCard({ complaint }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 border-l-4 border-primary-500 rounded-l-lg">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-900">{complaint.title}</h2>
          <StatusBadge status={complaint.status} />
        </div>
        <p className="mt-3 text-gray-600">{complaint.description}</p>
        <div className="mt-4 flex justify-between items-center text-sm">
          <span className="inline-flex items-center text-primary-700">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {complaint.location}
          </span>
          <span className="text-gray-500">{formatDate(complaint.created_at)}</span>
        </div>
      </div>
    </div>
  );
}