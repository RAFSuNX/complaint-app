import { getStorage } from 'firebase/storage';
import { app } from './app';

// Initialize Firebase Storage
export const storage = getStorage(app);