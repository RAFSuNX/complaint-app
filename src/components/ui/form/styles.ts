import { clsx } from 'clsx';

export const inputBaseStyles = (...classes: string[]) => 
  clsx(
    // Base styles
    "block w-full rounded-lg transition-all duration-200",
    "px-4 py-3 text-base",
    
    // Border and background
    "bg-white border border-gray-300",
    "hover:border-primary-400",
    
    // Focus states
    "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500",
    
    // Placeholder
    "placeholder:text-gray-400",
    
    // Disabled state
    "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed",
    
    // Custom classes
    ...classes
  );

export const getInputStateStyles = (error?: boolean) => 
  error
    ? "border-danger-300 text-danger-900 placeholder-danger-300 focus:border-danger-500 focus:ring-danger-500/50"
    : "border-gray-300 focus:border-primary-500 focus:ring-primary-500/50";

export const getIconStyles = (position: 'start' | 'end') =>
  position === 'start' ? "pl-10" : "pr-10";