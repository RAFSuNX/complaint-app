import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export function formatFirestoreDate(date: Date | Timestamp): string {
  if (!date) return 'N/A';
  
  try {
    // Handle Firestore Timestamp
    if (date instanceof Timestamp) {
      return format(date.toDate(), 'PPP');
    }
    
    // Handle regular Date object
    if (date instanceof Date) {
      return format(date, 'PPP');
    }
    
    // Handle string date
    if (typeof date === 'string') {
      return format(new Date(date), 'PPP');
    }
    
    return 'Invalid date';
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
}