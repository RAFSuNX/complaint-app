import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AppError } from '../utils/errorHandling';

interface UserProfile {
  id: string;
  fullName: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const profileDoc = await getDoc(doc(db, 'profiles', result.user.uid));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as UserProfile);
      }
    } catch (error) {
      throw new AppError('Invalid email or password', 'auth/invalid-credentials');
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const profile = {
        id: result.user.uid,
        fullName,
        role: 'user' as const,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'profiles', result.user.uid), profile);
      setProfile(profile);
    } catch (error) {
      throw new AppError('Failed to create account', 'auth/signup-failed');
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      setProfile(null);
    } catch (error) {
      throw new AppError('Failed to sign out', 'auth/signout-failed');
    }
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new AppError('Failed to send password reset email', 'auth/reset-failed');
    }
  }

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}