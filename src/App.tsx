import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SignIn } from './pages/Auth/SignIn';
import { SignUp } from './pages/Auth/SignUp';
import { AdminLogin } from './pages/Auth/AdminLogin';
import { SubmitComplaint } from './pages/SubmitComplaint';
import { TrackComplaint } from './pages/TrackComplaint';
import { ComplaintView } from './pages/ComplaintView';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/complaint/:trackingNumber" element={<ComplaintView />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}