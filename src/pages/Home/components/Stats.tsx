import { FileText, Users, CheckCircle } from 'lucide-react';

const stats = [
  { name: 'Total Complaints', value: '2,345', icon: FileText },
  { name: 'Active Users', value: '890', icon: Users },
  { name: 'Resolved Cases', value: '1,234', icon: CheckCircle },
];

export function Stats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6 text-bd-green" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}