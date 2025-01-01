import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebase.config';

// Initialize Firebase app instance
export const app = initializeApp(firebaseConfig);