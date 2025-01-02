import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import { db, storage } from '../firebase';
import { Complaint, ComplaintFormData, AnonymousComplaintResponse } from '../../types/complaint';
import { AppError } from '../../utils/errorHandling';
import { generateTrackingNumber } from '../../utils/trackingNumber';
import { generateAnonymousId } from '../../utils/anonymousId';

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
          throw new AppError(
            'File size must be less than 5MB',
            'storage/file-too-large',
            413
          );
        }

        try {
          const storagePath = userId 
            ? `attachments/users/${userId}/${Date.now()}-${file.name}`
            : `attachments/anonymous/${Date.now()}-${file.name}`;
          
          const storageRef = ref(storage, storagePath);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          attachments.push(url);
        } catch (error) {
          if (error instanceof FirebaseError) {
            throw AppError.fromFirebase(error);
          }
          throw new AppError(
            'Failed to upload file',
            'storage/upload-failed',
            500
          );
        }
      }
    }

    const trackingNumber = await generateUniqueTrackingNumber();
    const anonymousId = userId ? undefined : generateAnonymousId();
    
const complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'> = {
  ...data,
  userId: userId || null,
  anonymousId,
  trackingNumber,
  status: 'pending',
  attachments,
  isAnonymous: !userId,
  fullName: userId ? (await getDoc(doc(db, 'profiles', userId))).data()?.fullName as string : undefined
};

console.log('Complaint data being added to Firestore:', complaintData);

try {
  console.log('Creating complaint document...');
  const docRef = await addDoc(collection(db, 'complaints'), complaintData);
  console.log('Complaint document created:', docRef.id);
  const docSnapshot = await getDoc(docRef);
  console.log('Complaint document snapshot:', docSnapshot.data());
  const complaint = { 
    id: docRef.id, 
    ...docSnapshot.data(),
    createdAt: docSnapshot.get('createdAt').toDate().toISOString(),
    updatedAt: docSnapshot.get('updatedAt').toDate().toISOString()
  } as Complaint;

  return { 
    trackingNumber, 
    anonymousId: anonymousId || '',
    complaint 
  };
} catch (error) {
  console.error('Detailed error in createComplaint:', error);
  if (error instanceof FirebaseError) {
    console.error('FirebaseError details:', error.code, error.message);
    console.error('FirebaseError details:', JSON.stringify(error, null, 2));
    console.error('FirebaseError stack:', error.stack);
    throw AppError.fromFirebase(error);
  }
  throw new AppError(
    'Failed to create complaint',
    'complaints/create-failed',
    500
  );
}
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    if (error instanceof FirebaseError) {
      throw AppError.fromFirebase(error);
    }
    throw new AppError(
      'An unexpected error occurred',
      'complaints/create-failed',
      500
    );
  }
}
