import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Complaint } from '../../types/complaint';
import { AppError } from '../../utils/errorHandling';

export async function getComplaintByTracking(trackingNumber: string): Promise<Complaint | null> {
  try {
    const q = query(
      collection(db, 'complaints'),
      where('trackingNumber', '==', trackingNumber)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Complaint;
  } catch (error) {
    throw new AppError('Failed to fetch complaint', 'complaints/fetch-failed');
  }
}

export async function getUserComplaints(userId: string): Promise<Complaint[]> {
  try {
    const q = query(
      collection(db, 'complaints'),
      where('userId', '==', userId)
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

export async function getComplaintById(complaintId: string): Promise<Complaint | null> {
  try {
    const docRef = doc(db, 'complaints', complaintId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return { id: docSnap.id, ...docSnap.data() } as Complaint;
  } catch (error) {
    throw new AppError('Failed to fetch complaint', 'complaints/fetch-failed');
  }
}