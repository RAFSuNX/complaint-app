import { v4 as uuidv4 } from 'uuid';

export function generateAnonymousId(): string {
  return `ANON-${uuidv4().slice(0, 8)}`;
}