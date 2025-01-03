import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { updateUserProfile } from '../../../lib/db/users';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export function NotificationSettings() {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await updateUserProfile(user.uid, {
        phoneNumber,
        notificationPreferences: {
          email: e.currentTarget.email.checked,
          sms: e.currentTarget.sms.checked
        }
      });
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+880"
        />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="email"
              name="email"
              defaultChecked={userProfile?.notificationPreferences?.email}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="email" className="text-sm text-gray-700">
              Email notifications
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sms"
              name="sms"
              defaultChecked={userProfile?.notificationPreferences?.sms}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="sms" className="text-sm text-gray-700">
              SMS notifications
            </label>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </div>
  );
}