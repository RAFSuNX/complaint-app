import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { AuthForm } from './components/AuthForm';

export function AdminLogin() {
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
      const { user } = await signIn(email, password);
      const userProfile = await getUserProfile(user.uid);
      
      if (userProfile?.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      toast.success('Signed in as admin');
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials or unauthorized access');
      toast.error('Access denied. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
        <AuthForm 
          mode="signin" 
          onSubmit={handleSubmit} 
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}