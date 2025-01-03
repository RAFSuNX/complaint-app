import { useEffect, useState } from 'react';
import { getUserComplaints } from '../../../lib/db/complaints';
import { useAuth } from '../../../contexts/AuthContext';
import { ComplaintCard } from '../../../components/complaint/ComplaintCard';
import type { Complaint } from '../../../types';

export function ComplaintList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComplaints = async () => {
      if (user) {
        const userComplaints = await getUserComplaints(user.uid);
        setComplaints(userComplaints);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  if (loading) {
    return <div className="text-center">Loading complaints...</div>;
  }

  if (complaints.length === 0) {
    return (
      <div className="text-center text-gray-500">
        You haven't submitted any complaints yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {complaints.map((complaint) => (
        <ComplaintCard 
          key={complaint.id} 
          complaint={complaint}
          showFeedback={true}
        />
      ))}
    </div>
  );
}