import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FileText, LogIn, LogOut, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function Layout() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <nav className="bg-primary-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <FileText className="h-6 w-6 text-white" />
                <span className="ml-2 text-xl font-semibold text-white">
                  Complaint Portal
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors"
              >
                Submit Complaint
              </Link>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center text-white hover:text-primary-100 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center text-white hover:text-primary-100 transition-colors"
                  >
                    <LogIn className="h-5 w-5 mr-1" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center text-white hover:text-primary-100 transition-colors"
                  >
                    <UserPlus className="h-5 w-5 mr-1" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}