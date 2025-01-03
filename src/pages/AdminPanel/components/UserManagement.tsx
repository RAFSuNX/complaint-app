import { useState, useEffect } from 'react';
import { getAllAdmins, promoteToAdmin, demoteToUser } from '../../../lib/db/users';
import { Button } from '../../../components/ui/Button';
import { InputField } from '../../../components/ui/FormField';
import { toast } from 'react-hot-toast';
import type { UserProfile } from '../../../lib/db/users';

export function UserManagement() {
  const [admins, setAdmins] = useState<(UserProfile & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      const adminList = await getAllAdmins();
      setAdmins(adminList);
    } catch (error) {
      console.error('Failed to load admins:', error);
      toast.error('Failed to load administrators');
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;

    try {
      // Here you would typically first find the user by email
      // For now, we'll just show a message
      toast.error('User promotion not implemented yet');
      setNewAdminEmail('');
    } catch (error) {
      toast.error('Failed to promote user');
    }
  };

  const handleDemoteAdmin = async (adminId: string) => {
    try {
      await demoteToUser(adminId);
      toast.success('Administrator demoted to user');
      loadAdmins();
    } catch (error) {
      toast.error('Failed to demote administrator');
    }
  };

  if (loading) {
    return <div>Loading administrators...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Administrators</h2>
        <div className="space-y-4">
          {admins.map((admin) => (
            <div key={admin.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-medium">{admin.name}</p>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleDemoteAdmin(admin.id)}
              >
                Remove Admin
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Add New Administrator</h2>
        <form onSubmit={handlePromoteUser} className="space-y-4">
          <InputField
            label="User Email"
            type="email"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            placeholder="Enter user's email"
            required
          />
          <Button type="submit">
            Promote to Admin
          </Button>
        </form>
      </div>
    </div>
  );
}