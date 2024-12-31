import React from 'react';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  icon?: React.ReactNode;
}

export function SelectField({
  label,
  options,
  error,
  icon,
  className,
  id,
  ...props
}: SelectFieldProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1">
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <select
          id={selectId}
          className={cn(
            'block w-full rounded-md border-gray-300 shadow-sm',
            'focus:ring-primary-500 focus:border-primary-500',
            icon && 'pl-10',
            error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...props}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}