import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { updateComplaintStatus } from '../../../lib/db/complaints';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { useComplaintFilters } from '../../../lib/hooks/useComplaintFilters';
import { toast } from 'react-hot-toast';
import type { Column } from '../types';
import type { Complaint } from '../../../types';

const columns: Column[] = [
  { key: 'trackingNumber', label: 'Tracking Number' },
  { key: 'title', label: 'Title' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

export function ComplaintTable() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    departmentFilter,
    setDepartmentFilter,
    departments,
    filteredComplaints
  } = useComplaintFilters(complaints);

  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const complaintData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Complaint[];
      
      setComplaints(complaintData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (complaintId: string, newStatus: Complaint['status']) => {
    try {
      await updateComplaintStatus(complaintId, newStatus);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
      throw error; // Re-throw to handle in the UI
    }
  };

  if (loading) {
    return <div className="text-center">Loading complaints...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar
          status={statusFilter}
          department={departmentFilter}
          onStatusChange={setStatusFilter}
          onDepartmentChange={setDepartmentFilter}
          departments={departments}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={columns} />
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredComplaints.map((complaint) => (
              <TableRow
                key={complaint.id}
                complaint={complaint}
                columns={columns}
                onStatusChange={handleStatusUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>

      {filteredComplaints.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No complaints found matching your filters.
        </div>
      )}
    </div>
  );
}