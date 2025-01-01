import React from 'react';
import { clsx } from 'clsx';
import { inputBaseStyles, getInputStateStyles, getIconStyles } from './styles';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, startIcon, endIcon, error, ...props }, ref) => {
    return (
      <div className="relative rounded-md shadow-sm">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{startIcon}</span>
          </div>
        )}
        <input
          ref={ref}
          className={clsx(
            inputBaseStyles(),
            getInputStateStyles(!!error),
            startIcon && getIconStyles('start'),
            endIcon && getIconStyles('end'),
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{endIcon}</span>
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';