import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';
import { LoadingSpinner } from './LoadingSpinner';

export function ConnectionStatus() {
  const { isConnected, isChecking } = useSupabaseConnection();

  if (isChecking) {
    return <LoadingSpinner />;
  }

  if (!isConnected) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
          <div>
            <h3 className="text-amber-800 font-medium">Database Connection Required</h3>
            <p className="text-amber-700 mt-1">
              Please click the "Connect to Supabase" button in the top right corner to set up your database connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}