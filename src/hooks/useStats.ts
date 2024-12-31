import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Stats {
  totalUsers: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  criticalIssues: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    criticalIssues: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_dashboard_stats')
          .select('*')
          .single();

        if (error) throw error;
        
        setStats({
          totalUsers: data.total_users || 0,
          pendingComplaints: data.pending_complaints || 0,
          resolvedComplaints: data.resolved_complaints || 0,
          criticalIssues: data.critical_issues || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}