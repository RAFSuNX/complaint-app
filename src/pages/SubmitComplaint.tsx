import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ComplaintForm } from '../components/complaints/ComplaintForm';

export function SubmitComplaint() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.from('complaints').insert({
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        location: formData.get('location'),
        is_anonymous: formData.get('isAnonymous') === 'true',
        status: 'pending'
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
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