import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { InputField, TextAreaField } from '../../../components/ui/FormField';
import { Button } from '../../../components/ui/Button';
import { useComplaint } from '../../../lib/hooks/useComplaint';
import { useAuth } from '../../../contexts/AuthContext';
import type { Complaint } from '../../../types';

export function ComplaintForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitComplaint, loading } = useComplaint();
  const [file, setFile] = useState<File>();
  const [isAnonymous, setIsAnonymous] = useState(!user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const data: Partial<Complaint> = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        department: formData.get('department') as string,
        location: formData.get('location') as string,
        isAnonymous: isAnonymous,
      };

      const result = await submitComplaint(data as Omit<Complaint, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt' | 'status'>, file);
      
      toast.success('Complaint submitted successfully!');
      
      // Show tracking number in toast
      const message = isAnonymous 
        ? `Important: Save your tracking number: ${result.trackingNumber}. You'll need this to check your complaint status.`
        : `Your tracking number is: ${result.trackingNumber}`;
      
      toast.success(message, {
        duration: isAnonymous ? 30000 : 5000,
      });

      // Redirect based on user authentication status
      if (user && !isAnonymous) {
        navigate('/dashboard');
      } else {
        navigate('/track');
      }
    } catch (error) {
      toast.error('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        id="title"
        name="title"
        label="Complaint Title"
        required
        placeholder="Brief description of your complaint"
        helperText="Provide a clear and concise title for your complaint"
      />
      <TextAreaField
        id="description"
        name="description"
        label="Detailed Description"
        required
        rows={4}
        placeholder="Provide detailed information about your complaint"
        helperText="Include all relevant details that could help address your complaint"
      />
      <InputField
        id="department"
        name="department"
        label="Department"
        required
        placeholder="Which government department is this about?"
        helperText="Select the department most relevant to your complaint"
      />
      <InputField
        id="location"
        name="location"
        label="Location"
        required
        placeholder="Where did this occur?"
        helperText="Specify the location where the incident occurred"
      />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">
          Supporting Documents
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
        <p className="text-sm text-gray-500">
          Upload any relevant documents or images (optional)
        </p>
      </div>
      
      {user && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="anonymous" className="text-sm text-gray-700">
            Submit anonymously
          </label>
        </div>
      )}

      {!isAnonymous && user && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="notifications" className="text-sm text-gray-700">
            Receive notifications about this complaint
          </label>
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Complaint'}
      </Button>
    </form>
  );
}