import React from 'react';
import { cn } from '../../utils/cn';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function TextAreaField({
  label,
  error,
  className,
  id,
  ...props
}: TextAreaFieldProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          'block w-full rounded-md border-gray-300 shadow-sm',
          'focus:ring-primary-500 focus:border-primary-500',
          'focus:outline-none', // Removed outline on focus
          'focus:ring-2', // Added ring width on focus
          'px-4', // Added padding on x-axis
          'py-2', // Added padding on y-axis
          'text-sm', // Added text size
          'resize-y', // Added vertical resizing
          'placeholder:text-gray-400',
          error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
