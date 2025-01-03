import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { generateTrackingNumber } from '../utils/tracking';
import { generateAnonymousUserData } from '../utils/anonymous';
import { useAuth } from '../../contexts/AuthContext';
import type { Complaint } from '../../types';

export function useComplaint() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const submitComplaint = async (
    data: Omit<Complaint, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt' | 'status'>,
    file?: File
  ) => {
    setLoading(true);
    try {
      let attachmentUrl;
      if (file) {
        try {
          const storageRef = ref(storage, `attachments/${Date.now()}-${file.name}`);
          await uploadBytes(storageRef, file);
          attachmentUrl = await getDownloadURL(storageRef);
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('Failed to upload attachment');
        }
      }

      // Generate anonymous user data if complaint is anonymous
      const anonymousData = data.isAnonymous ? generateAnonymousUserData() : null;

      const now = Timestamp.now();
      const complaintData = {
        title: data.title,
        description: data.description,
        department: data.department,
        location: data.location,
        isAnonymous: data.isAnonymous,
        trackingNumber: generateTrackingNumber(),
        status: 'pending',
        createdAt: now,
        updatedAt: now,
        userId: data.isAnonymous ? anonymousData?.id : user?.uid,
        attachmentUrl: attachmentUrl || null,
        feedback: null
      };

      try {
        const docRef = await addDoc(collection(db, 'complaints'), complaintData);
        return { 
          id: docRef.id, 
          ...complaintData,
          createdAt: complaintData.createdAt.toDate(),
          updatedAt: complaintData.updatedAt.toDate()
        };
      } catch (error) {
        console.error('Error adding complaint:', error);
        throw new Error('Failed to submit complaint');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { submitComplaint, loading };
}