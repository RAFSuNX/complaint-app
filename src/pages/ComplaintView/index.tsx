import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComplaintByTracking } from '../../lib/db/complaints';
import { ComplaintDetails } from './components/ComplaintDetails';
import { Button } from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import type { Complaint } from '../../types';

export function ComplaintView() {
  const { trackingNumber } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaint = async () => {
    if (!trackingNumber) {
      setError('No tracking number provided');
      setLoading(false);
      return;
    }

    try {
      const data = await getComplaintByTracking(trackingNumber);
      if (!data) {
        setError('Complaint not found');
      } else {
        setComplaint(data);
      }
    } catch (err) {
      setError('Failed to load complaint');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [trackingNumber]);

  if (loading) {
    return <div className="text-center py-8">Loading complaint details...</div>;
  }

  if (error || !complaint) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-6 print:hidden"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      
      <ComplaintDetails 
        complaint={complaint} 
        onStatusUpdated={fetchComplaint}
      />
    </div>
  );
}