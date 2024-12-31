import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { handleError } from '../services/complaints';

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<null | { id: string; email?: string }>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from('complaints').select('id').limit(1);
        if (error) {
          handleError('check connection', error);
        }
        setIsConnected(true);
      } catch (err) {
        handleError('check connection', err);
        setIsConnected(false);
      } finally {
        setIsChecking(false);
      }
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        setUser(session?.user ?? null);
      } else {
        setUser(null);
      }
    });

    checkConnection();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { isConnected, isChecking, user };
}
