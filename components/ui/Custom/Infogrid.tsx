
import { ComponentType } from 'react';

export interface InfoItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export interface InfoCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export interface InfoGridProps {
  items: InfoItem[];
  className?: string;
}


function InfoCard({ icon: Icon, label, value }: InfoCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );
}

export function InfoGrid({ items, className = '' }: InfoGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 border border-gray-300 rounded-lg ${className}`}>
      {items.map((item, index) => (
        <InfoCard key={index} {...item} />
      ))}
    </div>
  );
}