import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Complaint } from '../../types/complaint';

export async function updateStatus(id: string, status: Complaint['status']) {
  try {
    const docRef = doc(db, 'complaints', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating complaint status:', error);
  }
}
