import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile || userProfile.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}