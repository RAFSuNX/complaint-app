import React from 'react';
import { statusColors, ComplaintStatus, formatStatus } from '../utils/statusColors';

interface Props {
  status: ComplaintStatus;
}

export function StatusBadge({ status }: Props) {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[status]}`}>
      {formatStatus(status)}
    </span>
  );
}