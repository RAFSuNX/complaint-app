import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ComplaintForm } from '../components/ComplaintForm';
import { useAuth } from '../contexts/AuthContext';
import { createComplaint } from '../lib/complaints';
import { ComplaintFormData } from '../types/complaint';
import { AppError } from '../utils/errorHandling';
import { getErrorMessage } from '../utils/errorHandling';

export default function NewComplaintPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

const handleSubmit = async (data: ComplaintFormData, files?: File[]) => {
  try {
    setIsSubmitting(true);
    console.log('Data being submitted:', data);
    console.log('Files being submitted:', files);
    console.log('User ID:', user?.uid);
    console.log('Firebase Configuration:', {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    });

    const result = await createComplaint(data, user?.uid, files);
    
    if (!user) {
      toast.success(
        <div className="space-y-2">
          <p className="font-medium">Complaint submitted successfully!</p>
          <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
            <p>
              <span className="font-medium">Tracking Number:</span>{' '}
              <code className="bg-white px-2 py-1 rounded">{result.trackingNumber}</code>
            </p>
            <p>
              <span className="font-medium">Anonymous ID:</span>{' '}
              <code className="bg-white px-2 py-1 rounded">{result.anonymousId}</code>
            </p>
          </div>
          <p className="text-sm text-red-600 font-medium">
            Important: Save these details! They won't be shown again.
          </p>
        </div>,
        { duration: 20000 }
      );
    } else {
      toast.success('Complaint submitted successfully');
    }
    
    navigate('/track');
  } catch (error) {
    console.error('Error submitting complaint:', error);
    const message = error instanceof AppError 
      ? error.message + ' (' + error.code + ')' 
      : 'Failed to submit complaint. Please try again.';
    toast.error(message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit New Complaint</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ComplaintForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        {!user && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-800">
              You are submitting anonymously. You'll receive a tracking number and anonymous ID to check your complaint status.
              Make sure to save these details as they will only be shown once.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
