import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { Complaint, ComplaintFormData, AnonymousComplaintResponse } from '../types/complaint';
import { AppError } from '../utils/errorHandling';
import { generateTrackingNumber } from '../utils/trackingNumber';

export async function createComplaint(
  data: ComplaintFormData,
  userId?: string,
  files?: File[]
): Promise<AnonymousComplaintResponse> {
  try {
    const attachments: string[] = [];
    
    if (files?.length) {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          throw new AppError('File size must be less than 5MB', 'storage/file-too-large');
        }
        const storageRef = ref(storage, `attachments/anonymous/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        attachments.push(url);
      }
    }

    const trackingNumber = generateTrackingNumber();
    
    const complaintData: Omit<Complaint, 'id'> = {
      ...data,
      userId,
      trackingNumber,
      status: 'pending',
      createdAt: new Date().toISOString(),
      attachments,
      isAnonymous: !userId
    };

    const docRef = await addDoc(collection(db, 'complaints'), complaintData);
    const complaint = { id: docRef.id, ...complaintData };

    return { trackingNumber, complaint };
  } catch (error) {
    throw new AppError('Failed to create complaint', 'complaints/create-failed');
  }
}

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