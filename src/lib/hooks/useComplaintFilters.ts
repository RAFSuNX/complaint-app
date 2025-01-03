import { useState, useMemo } from 'react';
import type { Complaint, ComplaintStatus } from '../../types';

export function useComplaintFilters(complaints: Complaint[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | ''>('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const departments = useMemo(() => {
    const depts = new Set(complaints.map(c => c.department));
    return Array.from(depts).sort();
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(complaint => {
      const matchesSearch = searchTerm === '' || 
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === '' || complaint.status === statusFilter;
      const matchesDepartment = departmentFilter === '' || complaint.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [complaints, searchTerm, statusFilter, departmentFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    departments,
    filteredComplaints
  };
}