import React from 'react';
import { clsx } from 'clsx';

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  buttonLabel?: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, buttonLabel = 'Choose files', ...props }, ref) => {
    return (
      <input
        type="file"
        ref={ref}
        className={clsx(
          "block w-full text-sm text-gray-500",
          "file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0",
          "file:text-sm file:font-medium",
          "file:bg-blue-50 file:text-blue-600",
          "hover:file:bg-blue-100",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
          "cursor-pointer disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

FileInput.displayName = 'FileInput';