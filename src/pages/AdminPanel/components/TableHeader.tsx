import type { Column } from '../types';

interface Props {
  columns: Column[];
}

export function TableHeader({ columns }: Props) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}