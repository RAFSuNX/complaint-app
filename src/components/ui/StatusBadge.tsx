import React from 'react';
import { cn } from '../../utils/cn';
import type { ComplaintStatus } from '../../types/database';

interface Props {
  status: ComplaintStatus;
  size?: 'sm' | 'md';
}

const statusConfig = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Pending'
  },
  in_progress: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'In Progress'
  },
  resolved: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Resolved'
  },
  rejected: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Rejected'
  }
};

export function StatusBadge({ status, size = 'md' }: Props) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center rounded-full font-medium',
      config.bg,
      config.text,
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-sm'
    )}>
      {config.label}
    </span>
  );
}