import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="lg:w-120 ">
      <div className="flex items-center bg-gray-100 rounded-lg px-5 py-3 gap-3">
        <Search className="text-gray-500 flex-shrink-0" size={22} />
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-base"
        />
      </div>
    </div>
  );
}