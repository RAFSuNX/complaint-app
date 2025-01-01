import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllComplaints } from '../lib/complaints/admin';
import { getUserComplaints } from '../lib/complaints/query';
import { Complaint } from '../types/complaint';
import { AppError } from '../utils/errorHandling';

export function useComplaints(isAdmin = false) {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchComplaints() {
      if (!user && !isAdmin) return;
      
      try {
        setLoading(true);
        const data = isAdmin 
          ? await getAllComplaints()
          : await getUserComplaints(user!.uid);
        setComplaints(data);
      } catch (error) {
        setError(error instanceof Error ? error : new AppError('Failed to fetch complaints'));
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, [user, isAdmin]);

  return { complaints, loading, error };
}