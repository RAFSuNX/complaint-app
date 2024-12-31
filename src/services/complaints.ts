import { supabase } from '../lib/supabase';
import type { Complaint } from '../types/database';

export async function fetchComplaints(): Promise<Complaint[]> {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch complaints: ${error.message}`);
  }

  return data || [];
}

export async function createComplaint(complaint: Omit<Complaint, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('complaints')
    .insert(complaint)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create complaint: ${error.message}`);
  }

  return data;
}