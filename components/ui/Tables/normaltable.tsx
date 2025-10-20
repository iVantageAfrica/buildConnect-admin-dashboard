import React from 'react';

export interface TableData {
  id: string;
  [key: string]: any; 
}

export interface Column {
  key: string;
  label: string;
  render?: (value: any, row: TableData) => React.ReactNode;
}

interface ReusableTableProps {
  data: TableData[];
  columns: Column[];
  onRowAction?: (action: string, row: TableData) => void;
  className?: string;
  actionColumn?: {
    label: string;
    actions: {
      label: string;
      action: string;
      icon?: React.ReactNode;
      className?: string;
    }[];
  };
}

export const ReusableNormalTable: React.FC<ReusableTableProps> = ({
  data,
  columns,
  onRowAction,
  className = "",
  actionColumn
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-sm font-extrabold text-black "
                >
                  {column.label}
                </th>
              ))}
              {actionColumn && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {actionColumn.label}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
                {actionColumn && onRowAction && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {actionColumn.actions.map((action) => (
                        <button
                          key={action.action}
                          onClick={() => onRowAction(action.action, row)}
                          className={`text-gray-600 hover:text-gray-900 ${action.className || ''}`}
                        >
                          {action.icon || action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">No data found</p>
        </div>
      )}
    </div>
  );
};