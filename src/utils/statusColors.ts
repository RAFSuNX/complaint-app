export const statusColors = {
  resolved: 'bg-primary-100 text-primary-800',
  rejected: 'bg-accent-100 text-accent-700',
  in_progress: 'bg-primary-100 text-primary-700',
  pending: 'bg-gray-100 text-gray-800'
} as const;

export type ComplaintStatus = keyof typeof statusColors;

export function formatStatus(status: string): string {
  return status.replace('_', ' ').toUpperCase();
}