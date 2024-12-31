import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AuthForm } from '../components/auth/AuthForm';
import { logError } from '../utils/logError';

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

const handleSubmit = async (formData: FormData) => {
  setLoading(true);
  setError('');
  
  try {
    console.log('Starting sign-up process...');
    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options: {
        emailRedirectTo: 'http://localhost:3000',
        data: {
          full_name: formData.get('fullName'),
        },
      },
    });
    console.log('Sign-up response:', data, error);

    const user = data.user;

    if (error) {
      if (error.message.includes('Email already in use')) {
        setError('Email already in use. Please try a different email address.');
      } else if (error.message.includes('Password is too weak')) {
        setError('Password is too weak. Please try a stronger password.');
      } else {
        setError('Failed to create profile. Please try again.');
      }
      throw error;
    }

    // Insert user into profiles table
    if (user) {
      try {
        console.log('Starting profile insertion...');
        const fullName = formData.get('fullName') as string | null;
        if (fullName) {
          const { data: insertData, error: insertError } = await supabase
            .from('profiles')
            .insert({ id: user.id, full_name: fullName, is_admin: false });
          console.log('Profile insertion response:', insertData, insertError);
          if (insertError) {
            logError(insertError.toString());
            throw insertError;
          }
          if (user.email_confirmed_at) {
            navigate('/');
          } else {
            setError('Please verify your email address before logging in.');
          }
        } else {
          setError('Full name is required.');
          throw new Error('Full name is required.');
        }
      } catch (err) {
        if (err instanceof Error) {
          logError(err.toString());
        } else {
          logError('Unknown error occurred');
        }
        setError('Failed to create profile. Please try again.');
      }
    } else {
      setError('Failed to create user. Please try again.');
    }
  } catch (err) {
    if (err instanceof Error) {
      logError(err.toString());
    } else {
      logError('Unknown error occurred');
    }
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
