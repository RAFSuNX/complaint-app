import { useState } from 'react';
import { ComplaintTable } from './components/ComplaintTable';
import { UserManagement } from './components/UserManagement';
import { Button } from '../../components/ui/Button';
import { Download, Users } from 'lucide-react';
import { exportToCSV } from '../../lib/utils/export';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Complaint } from '../../types';

export function AdminPanel() {
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'complaints' | 'users'>('complaints');

  const handleExport = async () => {
    setExporting(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'complaints'));
      const complaints = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Complaint[];
      
      exportToCSV(complaints);
    } catch (error) {
      console.error('Failed to export complaints:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <div className="flex gap-4">
          {activeTab === 'complaints' && (
            <Button onClick={handleExport} variant="outline" disabled={exporting}>
              <Download className="w-4 h-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export Complaints'}
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'complaints'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Complaints
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 text-sm font-medium flex items-center ${
                activeTab === 'users'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              User Management
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'complaints' ? (
            <ComplaintTable />
          ) : (
            <UserManagement />
          )}
        </div>
      </div>
    </div>
  );
}