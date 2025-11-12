import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye, Edit, Trash2, Search, X } from 'lucide-react';

// Reusable Table Component
export function DataTable({ 
  columns, 
  data, 
  actions,
  rowsPerPageOptions = [5, 8, 10, 20],
  defaultRowsPerPage = 8,
  showSerialNumber = true,
  // Optional search configuration
  showSearch = false,
  searchPlaceholder = "Search...",
  searchableColumns = [],
  // Optional filter configuration
  filters = [],
  onFilterChange,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  // Apply search and filters only if enabled
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply filters only if provided
    if (filters.length > 0) {
      Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
        if (filterValue && filterValue !== 'all') {
          result = result.filter(row => row[filterKey] === filterValue);
        }
      });
    }

    // Apply search only if enabled
    if (showSearch && searchTerm && searchableColumns.length > 0) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(row => 
        searchableColumns.some(col => {
          const val = row[col];
          return val && val.toString().toLowerCase().includes(lowerSearch);
        })
      );
    }

    return result;
  }, [data, activeFilters, searchTerm, searchableColumns, showSearch, filters.length]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, searchTerm]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search and Filters - Only show if enabled */}
      {(showSearch || filters.length > 0) && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3 items-center">
            {showSearch && (
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {filters.map((filter) => (
              <div key={filter.key} className="flex items-center gap-2">
                <label className="text-sm text-gray-600 whitespace-nowrap">
                  {filter.label}:
                </label>
                <select
                  value={activeFilters[filter.key] || 'all'}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  {filter.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {(searchTerm || Object.values(activeFilters).some(v => v && v !== 'all')) && (
            <div className="mt-3 text-sm text-gray-600">
              Showing {filteredData.length} of {data.length} results
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {showSerialNumber && (
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">S/N</th>
              )}
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-600"
                >
                  {column.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((row, index) => (
                <tr key={row.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                  {showSerialNumber && (
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      #{startIndex + index + 1}
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="py-4 px-4 text-sm">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => action.onClick(row)}
                            className={`p-2 rounded hover:bg-gray-100 ${action.className || ''}`}
                            title={action.label}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (showSerialNumber ? 1 : 0) + (actions?.length > 0 ? 1 : 0)}
                  className="py-8 px-4 text-center text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {rowsPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className={`w-8 h-8 rounded text-sm font-medium ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}