export interface User {
  id: string;
  email: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
}

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: ComplaintStatus;
  is_anonymous: boolean;
  user_id?: string;
  created_at: string;
  updated_at: string;
}