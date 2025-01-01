import React from 'react';
import { clsx } from 'clsx';

interface FormControlProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function FormControl({
  children,
  label,
  error,
  helperText,
  required,
}: FormControlProps) {
  const id = React.useId();

  return (
    <div className="space-y-1.5">
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              id,
              'aria-describedby': error || helperText ? `${id}-description` : undefined,
              'aria-invalid': error ? 'true' : undefined,
            })
          : child
      )}

      {(error || helperText) && (
        <p
          id={`${id}-description`}
          className={clsx(
            "text-sm",
            error ? "text-danger" : "text-gray-500"
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}