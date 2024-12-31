import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';
import { ComplaintForm } from '../components/complaints/ComplaintForm';
import { handleError } from '../services/complaints';

export function SubmitComplaint() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { user } = useSupabaseConnection();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    
    try {
      const complaintData: { 
        title: FormDataEntryValue | null; 
        description: FormDataEntryValue | null; 
        category: FormDataEntryValue | null; 
        location: FormDataEntryValue | null; 
        is_anonymous: boolean; 
        status: string; 
        user_id?: string; 
      } = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        location: formData.get('location'),
        is_anonymous: formData.get('isAnonymous') === 'true',
        status: 'pending'
      };

      if (user && !complaintData.is_anonymous) {
        complaintData['user_id'] = user.id;
      }

      const { error } = await supabase.from('complaints').insert(complaintData);

      if (error) {
        handleError('submit complaint', error);
      } else {
        navigate('/');
      }
    } catch (err) {
      handleError('submit complaint', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <ComplaintForm
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
}
