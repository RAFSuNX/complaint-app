import { Filter } from 'lucide-react';
import type { ComplaintStatus } from '../../../types';

interface Props {
  status: ComplaintStatus | '';
  department: string;
  onStatusChange: (status: ComplaintStatus | '') => void;
  onDepartmentChange: (department: string) => void;
  departments: string[];
}

export function FilterBar({ 
  status, 
  department, 
  onStatusChange, 
  onDepartmentChange,
  departments 
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <Filter className="h-4 w-4 text-gray-400" />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as ComplaintStatus | '')}
        className="rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="inquiry">Inquiry</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="rounded-md border-gray-300 focus:border-green-500 focus:ring-green-500"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
    </div>
  );
}