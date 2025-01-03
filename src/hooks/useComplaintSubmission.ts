import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { createComplaint } from '../lib/db/complaints';
import { generateTrackingNumber } from '../lib/utils/tracking';
import type { Complaint } from '../types';

interface SubmissionData {
  title: string;
  description: string;
  department: string;
  location: string;
  isAnonymous: boolean;
  userId?: string;
}

export function useComplaintSubmission() {
  const [loading, setLoading] = useState(false);

  const submitComplaint = async (data: SubmissionData, file?: File) => {
    setLoading(true);
    try {
      let attachmentUrl;
      if (file) {
        const storageRef = ref(storage, `attachments/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        attachmentUrl = await getDownloadURL(storageRef);
      }

      const complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'> = {
        ...data,
        trackingNumber: generateTrackingNumber(),
        status: 'pending',
        attachmentUrl,
      };

      return await createComplaint(complaintData);
    } finally {
      setLoading(false);
    }
  };

  return { submitComplaint, loading };
}