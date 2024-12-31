import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthForm } from '../components/auth/AuthForm';

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
          data: {
            full_name: formData.get('fullName'),
          },
        },
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <AuthForm
        type="register"
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
}