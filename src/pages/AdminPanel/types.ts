import type { Complaint } from '../../types';

export interface Column {
  key: string;
  label: string;
}

export interface ComplaintFilters {
  status?: Complaint['status'];
  department?: string;
  searchTerm?: string;
}