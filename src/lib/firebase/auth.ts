import { getAuth } from 'firebase/auth';
import { app } from './app';

// Initialize Firebase Authentication
export const auth = getAuth(app);