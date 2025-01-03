export function generateTrackingNumber(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `BDC_${timestamp}_${randomStr}`.toUpperCase();
}