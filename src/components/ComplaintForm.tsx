import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormControl } from './ui/form/FormControl';
import { TextField } from './ui/form/TextField';
import { TextArea } from './ui/form/TextArea';
import { Select } from './ui/form/Select';
import { FileInput } from './ui/form/FileInput';
import { Button } from './ui/Button';
import { ComplaintFormData } from '../types/complaint';
import { getErrorMessage } from '../utils/errorHandling';

const complaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(['low', 'medium', 'high']),
});

const priorityOptions = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
];

interface Props {
  onSubmit: (data: ComplaintFormData, files?: File[]) => Promise<void>;
  isLoading?: boolean;
}

export function ComplaintForm({ onSubmit, isLoading }: Props) {
  const [files, setFiles] = React.useState<File[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      priority: 'medium',
    }
  });

const handleFormSubmit = async (data: ComplaintFormData) => {
  try {
    console.log('Form data being submitted:', JSON.stringify(data, null, 2));
    console.log('Files being submitted:', JSON.stringify(files, null, 2));
    await onSubmit(data, files);
  } catch (error) {
    console.error('Error submitting complaint:', getErrorMessage(error));
  }
};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <FormControl
        label="Title"
        error={errors.title?.message}
        required
      >
        <div>
          <TextField
            {...register('title')}
            placeholder="Enter complaint title"
          />
        </div>
      </FormControl>

      <FormControl
        label="Description"
        error={errors.description?.message}
        required
      >
        <div>
          <TextArea
            {...register('description')}
            placeholder="Describe your complaint in detail"
            rows={4}
          />
        </div>
      </FormControl>

      <FormControl
        label="Category"
        error={errors.category?.message}
        required
      >
        <div>
          <TextField
            {...register('category')}
            placeholder="e.g., Technical, Service, Billing"
          />
        </div>
      </FormControl>

      <FormControl
        label="Priority"
        error={errors.priority?.message}
        required
      >
        <div>
          <Select
            {...register('priority')}
            options={priorityOptions}
          />
        </div>
      </FormControl>

      <FormControl
        label="Attachments"
        helperText="Max file size: 5MB"
      >
        <div>
          <FileInput
            multiple
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>
      </FormControl>

      <Button
        isLoading={isLoading}
        className="w-full sm:w-auto"
      >
        Submit Complaint
      </Button>
    </form>
  );
}
