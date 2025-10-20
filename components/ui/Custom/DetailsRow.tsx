import React from 'react';

interface DetailRowProps {
  label: string;
  value: string | number;
  isLast?: boolean;
  isAmount?: boolean;
}

export function DetailRow({ label, value, isLast = false, isAmount = false }: DetailRowProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <span className="text-gray-600 font-medium">{label}</span>
      <span className={`text-gray-900 font-semibold ${isAmount ? 'font-bold text-lg' : ''}`}>
        {value}
      </span>
    </div>
  );
}