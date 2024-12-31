import { useState, useEffect } from 'react';
import type { Complaint } from '../types/database';
import { fetchComplaints } from '../services/complaints';

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadComplaints() {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (err) {
        console.error('Error loading complaints:', err);
        setError(err instanceof Error ? err : new Error('Failed to load complaints'));
      } finally {
        setLoading(false);
      }
    }

    loadComplaints();
  }, []);

  return { complaints, loading, error };
}