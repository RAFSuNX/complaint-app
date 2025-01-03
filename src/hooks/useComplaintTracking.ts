import { useState } from 'react';
import { getComplaintByTracking } from '../lib/db/complaints';
import type { Complaint } from '../types';

export function useComplaintTracking() {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackComplaint = async (trackingNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getComplaintByTracking(trackingNumber);
      if (!result) {
        setError('No complaint found with this tracking number');
        setComplaint(null);
      } else {
        setComplaint(result);
      }
    } catch (err) {
      setError('Failed to track complaint');
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  return { complaint, loading, error, trackComplaint };
}