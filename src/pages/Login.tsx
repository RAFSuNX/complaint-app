import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthForm } from '../components/auth/AuthForm';

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <AuthForm
        type="login"
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
}