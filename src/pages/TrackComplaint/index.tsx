import { useState } from 'react';
import { InputField } from '../../components/ui/FormField';
import { Button } from '../../components/ui/Button';
import { useComplaintTracking } from '../../hooks/useComplaintTracking';
import { ComplaintCard } from '../../components/complaint/ComplaintCard';

export function TrackComplaint() {
  const { complaint, loading, error, trackComplaint } = useComplaintTracking();
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await trackComplaint(trackingNumber);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Your Complaint</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="trackingNumber"
            name="trackingNumber"
            label="Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            placeholder="Enter your tracking number (e.g., BDC_ABC123)"
            helperText="Enter the tracking number you received when submitting your complaint"
            error={error || undefined}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Tracking...' : 'Track Complaint'}
          </Button>
        </form>

        {complaint && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Complaint Details</h2>
            <ComplaintCard complaint={complaint} />
          </div>
        )}
      </div>
    </div>
  );
}