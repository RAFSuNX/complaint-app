import { nanoid } from 'nanoid';

export function generateAnonymousUserData() {
  return {
    id: `anon_${nanoid(10)}`,
    name: 'Anonymous User',
    role: 'anonymous',
    createdAt: new Date()
  };
}