import { FirebaseError } from 'firebase/app';

export function handleFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // Storage errors
      case 'storage/unauthorized':
        return 'Access denied. Please check your permissions.';
      case 'storage/canceled':
        return 'Upload canceled.';
      case 'storage/retry-limit-exceeded':
        return 'Upload failed. Please try again.';
      case 'storage/invalid-checksum':
        return 'File corrupted. Please try uploading again.';
      case 'storage/file-too-large':
        return 'File is too large. Maximum size is 5MB.';

      // Firestore errors
      case 'permission-denied':
        return 'Access denied. Please check your permissions.';
      case 'failed-precondition':
        return 'Operation failed. Please try again.';
      case 'unavailable':
        return 'Service temporarily unavailable. Please try again later.';
      case 'resource-exhausted':
        return 'Too many requests. Please try again later.';
      
      // Default error
      default:
        return error.message || 'An unknown error occurred.';
    }
  }
  return 'An unexpected error occurred. Please try again.';
}