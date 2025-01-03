import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BaseFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
}

const baseFieldClasses = {
  container: 'space-y-2',
  label: 'block text-sm font-medium text-gray-900',
  input: clsx(
    'block w-full px-4 py-3 rounded-lg',
    'bg-white border border-gray-200',
    'shadow-sm transition-colors duration-200',
    'hover:border-gray-300',
    'focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none',
    'placeholder:text-gray-400 sm:text-sm'
  ),
  error: 'mt-1.5 text-sm font-medium text-red-600',
  helper: 'mt-1.5 text-sm text-gray-500'
};

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & BaseFieldProps;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, helperText, ...props }, ref) => (
    <div className={baseFieldClasses.container}>
      {label && (
        <label htmlFor={props.id} className={baseFieldClasses.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          baseFieldClasses.input,
          error && 'border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className={baseFieldClasses.error}>{error}</p>}
      {helperText && <p className={baseFieldClasses.helper}>{helperText}</p>}
    </div>
  )
);

export type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & BaseFieldProps;

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ className, label, error, helperText, ...props }, ref) => (
    <div className={baseFieldClasses.container}>
      {label && (
        <label htmlFor={props.id} className={baseFieldClasses.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={clsx(
          baseFieldClasses.input,
          'min-h-[120px] resize-y',
          error && 'border-red-300 hover:border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className={baseFieldClasses.error}>{error}</p>}
      {helperText && <p className={baseFieldClasses.helper}>{helperText}</p>}
    </div>
  )
);