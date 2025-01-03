import { format } from 'date-fns';
import { FileText, MapPin, Building2, Calendar, RefreshCw, Printer } from 'lucide-react';
import { ComplaintStatus } from '../../../components/complaint/ComplaintStatus';
import { StatusUpdate } from '../../../components/complaint/StatusUpdate';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import type { Complaint } from '../../../types';

interface Props {
  complaint: Complaint;
  onStatusUpdated?: () => void;
}

export function ComplaintDetails({ complaint, onStatusUpdated }: Props) {
  const { userProfile } = useAuth();
  const isAdmin = userProfile?.role === 'admin';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {complaint.title}
            </h1>
            <p className="text-sm text-gray-500">
              Tracking Number: {complaint.trackingNumber}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="print:hidden"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            {isAdmin ? (
              <StatusUpdate 
                complaintId={complaint.id}
                currentStatus={complaint.status}
                onStatusUpdated={onStatusUpdated}
              />
            ) : (
              <ComplaintStatus status={complaint.status} />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="prose max-w-none">
          <h2 className="flex items-center text-lg font-semibold mb-2">
            <FileText className="w-5 h-5 mr-2 text-gray-400" />
            Description
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {complaint.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="flex items-center text-lg font-semibold mb-2">
              <Building2 className="w-5 h-5 mr-2 text-gray-400" />
              Department
            </h2>
            <p className="text-gray-700">{complaint.department}</p>
          </div>

          <div>
            <h2 className="flex items-center text-lg font-semibold mb-2">
              <MapPin className="w-5 h-5 mr-2 text-gray-400" />
              Location
            </h2>
            <p className="text-gray-700">{complaint.location}</p>
          </div>
        </div>

        {complaint.attachmentUrl && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Attachments</h2>
            <a
              href={complaint.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline"
            >
              View Attachment
            </a>
          </div>
        )}

        <div className="border-t pt-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Submitted: {format(complaint.createdAt, 'PPP')}
            </div>
            <div className="flex items-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              Last Updated: {format(complaint.updatedAt, 'PPP')}
            </div>
          </div>
        </div>

        {complaint.feedback && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Feedback</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-${
                      i < complaint.feedback!.rating ? 'yellow' : 'gray'
                    }-400 text-xl`}
                  >
                    ★
                  </span>
                ))}
              </div>
              {complaint.feedback.comment && (
                <p className="text-gray-700">{complaint.feedback.comment}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}