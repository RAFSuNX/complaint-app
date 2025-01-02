export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  userId: string | null; // Can be null for anonymous
  anonymousId?: string; // Added for anonymous complaints
  trackingNumber: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
  adminNotes?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  fullName?: string; // Added fullName property
}

export type ComplaintFormData = Pick<Complaint, 
  'title' | 
  'description' | 
  'category' | 
  'priority'
>;

export interface AnonymousComplaintResponse {
  trackingNumber: string;
  anonymousId: string;
  complaint: Complaint;
}
