export type ComplaintStatus = 'pending' | 'in-progress' | 'inquiry' | 'completed';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  attachmentUrl?: string;
  isAnonymous: boolean;
  department: string;
  location: string;
  feedback?: {
    rating: number;
    comment?: string;
  };
}