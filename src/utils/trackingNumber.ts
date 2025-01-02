import { getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function generateUniqueTrackingNumber(): Promise<string> {
let trackingNumber = generateTrackingNumber();
let isUnique = false;

while (!isUnique) {
  const docRef = doc(db, 'complaints', trackingNumber);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    isUnique = true;
  } else {
    trackingNumber = generateTrackingNumber();
  }
}

  return trackingNumber;
}

export function generateTrackingNumber(): string {
  const randomNumber = Math.floor(Math.random() * 1000000000000).toString().padStart(13, '0');
  return `BDC_${randomNumber}`;
}
