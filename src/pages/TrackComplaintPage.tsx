import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { getComplaintByTracking } from '../lib/complaints';
import { Complaint } from '../types/complaint';
import { FormControl } from '../components/ui/form/FormControl';
import { TextField } from '../components/ui/form/TextField';
import { Button } from '../components/ui/Button';
import { formatDate } from '../utils/formatDate';

const trackingSchema = z.object({
  trackingNumber: z.string().min(1, 'Please enter a tracking number'),
});

type TrackingForm = z.infer<typeof trackingSchema>;

export default function TrackComplaintPage() {
  const [complaint, setComplaint] = React.useState<Complaint | null>(null);
  const [notFound, setNotFound] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TrackingForm>({
    resolver: zodResolver(trackingSchema),
  });

  const onSubmit = async (data: TrackingForm) => {
    try {
      const result = await getComplaintByTracking(data.trackingNumber);
      setComplaint(result);
      setNotFound(!result);
    } catch (error) {
      console.error('Error fetching complaint:', error);
      setComplaint(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Track Your Complaint</h1>
        <p className="text-gray-600">Enter your tracking number to check the status of your complaint.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormControl
            label="Tracking Number"
            error={errors.trackingNumber?.message}
          >
            <TextField
              {...register('trackingNumber')}
              placeholder="Enter your tracking number"
              startIcon={<Search className="w-5 h-5" />}
            />
          </FormControl>

          <Button type="submit" isLoading={isSubmitting}>
            Track Complaint
          </Button>
        </form>
      </div>

      {complaint && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-900">{complaint.title}</h2>
            <p className="text-gray-500 text-sm">Submitted on {formatDate(complaint.createdAt)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1 capitalize">{complaint.status.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="mt-1">{complaint.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Priority</p>
              <p className="mt-1 capitalize">{complaint.priority}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="mt-1 text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
          </div>

          {complaint.adminNotes && (
            <div>
              <p className="text-sm font-medium text-gray-500">Admin Response</p>
              <p className="mt-1 text-gray-700">{complaint.adminNotes}</p>
            </div>
          )}
        </div>
      )}

      {notFound && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <p className="text-yellow-800">
            No complaint found with this tracking number. Please check the number and try again.
          </p>
        </div>
      )}
    </div>
  );
}