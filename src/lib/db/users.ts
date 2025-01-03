import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export interface UserProfile {
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  phoneNumber?: string;
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
  };
}

export async function createUserProfile(userId: string, data: UserProfile) {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    role: data.role || 'user', // Ensure role defaults to 'user'
  });
}

export async function getUserProfile(userId: string) {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as UserProfile : null;
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, data);
}

export async function getAllAdmins() {
  const q = query(
    collection(db, 'users'),
    where('role', '==', 'admin')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as (UserProfile & { id: string })[];
}

export async function promoteToAdmin(userId: string) {
  return updateUserProfile(userId, { role: 'admin' });
}

export async function demoteToUser(userId: string) {
  return updateUserProfile(userId, { role: 'user' });
}