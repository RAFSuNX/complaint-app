import { FirebaseError } from 'firebase/app';

export type ErrorCode = 
  | 'complaints/create-failed'
  | 'storage/upload-failed'
  | 'storage/file-too-large'
  | 'auth/invalid-credentials'
  | 'auth/signup-failed'
  | 'auth/signout-failed'
  | 'auth/reset-failed';

export type ErrorStatus = 
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 413 // Payload Too Large
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 503; // Service Unavailable

export class AppError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public status: ErrorStatus = 500
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromFirebase(error: FirebaseError): AppError {
    const { code, message } = error;
    
    // Map Firebase error codes to our error codes and statuses
    switch (code) {
      case 'storage/unauthorized':
        return new AppError(message, 'storage/upload-failed', 403);
      case 'storage/file-too-large':
        return new AppError(message, 'storage/file-too-large', 413);
      case 'permission-denied':
        return new AppError('Access denied', 'complaints/create-failed', 403);
      case 'resource-exhausted':
        return new AppError('Too many requests', 'complaints/create-failed', 429);
      case 'unavailable':
        return new AppError('Service unavailable', 'complaints/create-failed', 503);
      default:
        return new AppError(
          message || 'An unexpected error occurred',
          'complaints/create-failed',
          500
        );
    }
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  if (error instanceof FirebaseError) {
    return AppError.fromFirebase(error).message;
  }
  return String(error);
}