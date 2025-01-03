import { collection, addDoc, getDoc, doc, query, where, getDocs, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { Complaint, ComplaintStatus } from '../../types';

export async function createComplaint(data: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) {
  const now = Timestamp.now();
  const complaintData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  
  const docRef = await addDoc(collection(db, 'complaints'), complaintData);
  return { 
    id: docRef.id, 
    ...complaintData,
    createdAt: complaintData.createdAt.toDate(),
    updatedAt: complaintData.updatedAt.toDate()
  };
}

export async function getComplaintByTracking(trackingNumber: string) {
  const q = query(
    collection(db, 'complaints'),
    where('trackingNumber', '==', trackingNumber)
  );
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  const data = doc.data();
  
  return { 
    id: doc.id, 
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date()
  } as Complaint;
}

export async function getUserComplaints(userId: string) {
  const q = query(
    collection(db, 'complaints'),
    where('userId', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    };
  }) as Complaint[];
}

export async function updateComplaintStatus(
  complaintId: string,
  status: ComplaintStatus,
  feedback?: Complaint['feedback']
) {
  const docRef = doc(db, 'complaints', complaintId);
  const updateData: Record<string, any> = {
    status,
    updatedAt: Timestamp.now()
  };
  
  if (feedback) {
    updateData.feedback = feedback;
  }
  
  await updateDoc(docRef, updateData);
  return true;
}