import { ComplaintForm } from './components/ComplaintForm';

export function SubmitComplaint() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit a Complaint</h1>
        <ComplaintForm />
      </div>
    </div>
  );
}