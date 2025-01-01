import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Complaint Management System
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Submit and track your complaints efficiently. We're here to help resolve your issues.
        </p>
        {!user && (
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700">
                <FileText className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <Link to="/complaints/new" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Submit Complaint
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                File a new complaint with detailed information and attachments.
              </p>
            </div>
          </div>

          <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700">
                <AlertCircle className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <Link to="/dashboard" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Track Status
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Monitor the progress of your submitted complaints in real-time.
              </p>
            </div>
          </div>

          <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-md">
            <div>
              <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700">
                <CheckCircle className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <Link to="/dashboard" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Resolution Center
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get updates and communicate about your complaint resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}