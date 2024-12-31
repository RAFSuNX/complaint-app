import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300',
      className
    )}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children }: CardProps) {
  return (
    <div className={cn('px-6 py-4 bg-gray-50 rounded-b-lg', className)}>
      {children}
    </div>
  );
}