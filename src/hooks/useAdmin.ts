import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsAdmin(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setIsAdmin(data?.is_admin ?? false);
      } catch (err) {
        console.error('Error checking admin status:', err);
        setError(err instanceof Error ? err : new Error('Failed to check admin status'));
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return { isAdmin, loading, error };
}