import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search complaints..."
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
      />
    </div>
  );
}