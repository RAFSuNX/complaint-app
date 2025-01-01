import React from 'react';
import { clsx } from 'clsx';
import { inputBaseStyles, getInputStateStyles } from './styles';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          inputBaseStyles(),
          getInputStateStyles(!!error),
          "min-h-[120px] resize-y",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';