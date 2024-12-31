import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from('complaints').select('id').limit(1);
        if (error) throw error;
        setIsConnected(true);
      } catch (err) {
        setIsConnected(false);
      } finally {
        setIsChecking(false);
      }
    }

    checkConnection();
  }, []);

  return { isConnected, isChecking };
}