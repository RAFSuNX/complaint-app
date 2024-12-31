import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '../types/database';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
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

      if (error) throw error;
      await fetchUsers();
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  }

  return { users, loading, toggleAdmin };
}