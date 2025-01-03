import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA8pDR1SSPDsPByNWR0cj6eouxWkxX9Xv4",
  authDomain: "complaints-98229.firebaseapp.com",
  projectId: "complaints-98229",
  storageBucket: "complaints-98229.firebasestorage.app",
  messagingSenderId: "574344229974",
  appId: "1:574344229974:web:47ea8fbd213bd15ab2b7f7"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (error.code !== 'app/duplicate-app') {
    throw error;
  }
  // If we already have an app, get that instead
  app = getApp();
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);