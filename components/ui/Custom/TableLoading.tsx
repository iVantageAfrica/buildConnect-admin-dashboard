const TableRowSkeleton = () => (
  <tr className="border-b border-gray-200">
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-3 bg-gray-200 rounded-full animate-pulse w-16"></div>
    </td>
  </tr>
);

export const TableLoadingSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-14"></div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRowSkeleton key={index} />
        ))}
      </tbody>
    </table>
  </div>
);