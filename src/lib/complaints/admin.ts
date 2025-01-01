import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Complaint } from '../../types/complaint';
import { AppError } from '../../utils/errorHandling';

export async function getAllComplaints(): Promise<Complaint[]> {
  try {
    const q = query(
      collection(db, 'complaints'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Complaint[];
  } catch (error) {
    throw new AppError('Failed to fetch complaints', 'complaints/fetch-failed');
  }
}

export async function updateComplaintStatus(
  complaintId: string,
  status: Complaint['status'],
  adminNotes?: string
): Promise<void> {
  try {
    const complaintRef = doc(db, 'complaints', complaintId);
    const updateData: Partial<Complaint> = {
      status,
      adminNotes,
      ...(status === 'resolved' ? { resolvedAt: new Date().toISOString() } : {})
    };
    
    await updateDoc(complaintRef, updateData);
  } catch (error) {
    throw new AppError('Failed to update complaint status', 'complaints/update-failed');
  }
}