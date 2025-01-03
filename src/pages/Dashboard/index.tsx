import { ComplaintList } from './components/ComplaintList';
import { NotificationSettings } from './components/NotificationSettings';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Complaints</h1>
        <ComplaintList />
      </div>
      
      <NotificationSettings />
    </div>
  );
}