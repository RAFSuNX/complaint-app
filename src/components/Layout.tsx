import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Flag, LogOut, User, Shield } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, userProfile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-green-600">
                <Flag className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">BD Complaints</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/submit">
                <Button variant="primary">Submit Complaint</Button>
              </Link>
              <Link to="/track">
                <Button variant="outline">Track Complaint</Button>
              </Link>
              
              {user ? (
                <>
                  {userProfile?.role === 'admin' && (
                    <Link to="/admin">
                      <Button variant="ghost">
                        <Shield className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  <Link to="/dashboard">
                    <Button variant="ghost">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={signOut}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="secondary">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} BD Complaints. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}