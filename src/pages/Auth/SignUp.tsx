import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { createUserProfile } from '../../lib/db/users';

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      const { user } = await signUp(email, password);
      await createUserProfile(user.uid, {
        email,
        name,
        role: 'user',
        createdAt: new Date(),
      });
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h1>
        <AuthForm mode="signup" onSubmit={handleSubmit} loading={loading} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-green-600 hover:text-green-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}