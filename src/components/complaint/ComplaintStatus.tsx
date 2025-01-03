import { CheckCircle, Clock, AlertCircle, HelpCircle } from 'lucide-react';
import type { ComplaintStatus as StatusType } from '../../types';

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Pending Review',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
  },
  'in-progress': {
    icon: AlertCircle,
    label: 'In Progress',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  inquiry: {
    icon: HelpCircle,
    label: 'Additional Information Needed',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
};

interface Props {
  status: StatusType;
  className?: string;
}

export function ComplaintStatus({ status, className = '' }: Props) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.bg} ${className}`}>
      <Icon className={`w-4 h-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}