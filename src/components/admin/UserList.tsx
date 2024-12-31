import React from 'react';
import { useUsers } from '../../hooks/useUsers';

export function UserList() {
  const { users, loading, toggleAdmin } = useUsers();

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">{user.full_name || user.email}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.is_admin}
                onChange={() => toggleAdmin(user.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Admin</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}