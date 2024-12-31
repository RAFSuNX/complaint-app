import { supabase } from '../lib/supabase';
import type { Complaint } from '../types/database';
import { logError } from '../utils/logError';

export function handleError(operation: string, error: any) {
  const errorMessage = `Failed to ${operation}: ${error.message}`;
  logError(errorMessage); // Log the error for debugging
  throw new Error(errorMessage);
}

export async function fetchComplaints(): Promise<Complaint[]> {
  const { data, error } = await supabase
    .from('complaints')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    handleError('fetch complaints', error);
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
    handleError('create complaint', error);
  }

  return data;
}
