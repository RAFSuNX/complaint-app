import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/database';
import { handleError } from '../services/complaints';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        handleError('fetch users', error);
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      handleError('fetch users', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleAdmin(userId: string) {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !user.is_admin })
        .eq('id', userId);

      if (error) {
        handleError('toggle admin status', error);
      } else {
        await fetchUsers();
      }
    } catch (error) {
      handleError('toggle admin status', error);
    }
  }

  return { users, loading, toggleAdmin };
}
