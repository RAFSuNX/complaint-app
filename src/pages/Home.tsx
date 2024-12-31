import React from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ComplaintCard } from '../components/ComplaintCard';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { useComplaints } from '../hooks/useComplaints';

export function Home() {
  const { complaints, loading, error } = useComplaints();

  return (
    <div className="space-y-6">
      <div className="bg-primary-600 -mt-6 -mx-6 px-6 py-12 sm:-mx-6 lg:-mx-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Recent Complaints</h1>
          <p className="text-primary-100 max-w-3xl">
            Track and manage complaints in real-time. Our transparent system ensures every voice is heard and every issue is addressed.
          </p>
        </div>
      </div>
      
      <ConnectionStatus />
      
      <ErrorBoundary>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-accent-50 text-accent-700 p-4 rounded-md">
            <p>{error.message}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}