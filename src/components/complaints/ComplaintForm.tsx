import React from 'react';
import { MapPin, FileText, Tag, AlertCircle } from 'lucide-react';
import { TextField } from '../ui/TextField';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { SelectField } from '../ui/SelectField';
import { TextAreaField } from '../ui/TextAreaField';

interface ComplaintFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  error?: string;
  loading?: boolean;
}

const CATEGORIES = [
  { value: 'corruption', label: 'Corruption' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'service_delay', label: 'Service Delay' },
  { value: 'misconduct', label: 'Misconduct' },
  { value: 'other', label: 'Other' },
];

export function ComplaintForm({ onSubmit, error, loading }: ComplaintFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold text-gray-900">Submit a Complaint</h1>
        <p className="text-sm text-gray-600 mt-1">
          Please provide detailed information about your complaint
        </p>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Title"
            name="title"
            icon={<FileText className="w-5 h-5" />}
            placeholder="Brief summary of your complaint"
            required
          />

          <SelectField
            label="Category"
            name="category"
            icon={<Tag className="w-5 h-5" />}
            options={CATEGORIES}
            required
          />

          <TextField
            label="Location"
            name="location"
            icon={<MapPin className="w-5 h-5" />}
            placeholder="Where did this occur?"
            required
          />

          <TextAreaField
            label="Description"
            name="description"
            placeholder="Please provide detailed information about your complaint"
            required
            rows={4}
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAnonymous"
              name="isAnonymous"
              value="true"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="isAnonymous" className="text-sm text-gray-700">
              Submit this complaint anonymously
            </label>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full"
          >
            Submit Complaint
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}