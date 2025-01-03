import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { AuthForm } from './components/AuthForm';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await signIn(email, password);
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      toast.error('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h1>
        <AuthForm 
          mode="signin" 
          onSubmit={handleSubmit} 
          loading={loading}
          error={error}
        />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-green-600 hover:text-green-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}