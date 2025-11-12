import React from 'react';
import { Building2, AlertCircle, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsDashboard() {
  const metrics = [
    {
      icon: Building2,
      label: 'Active Projects',
      value: '24',
      change: 15,
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'Pending Verifications',
      value: '8',
      change: 15,
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Open Disputes',
      value: '8',
      change: 15,
      isPositive: true
    },
    {
      icon: DollarSign,
      label: 'Total Escrow Value',
      value: '₦2.4M',
      change: 15,
      isPositive: true
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-stretch border-t border-b border-gray-200">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.isPositive ? TrendingUp : TrendingDown;
            
            return (
              <div 
                key={index}
                className={`flex-1 py-8 px-6 ${index !== metrics.length - 1 ? 'border-r border-gray-200' : ''}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-5 h-5 text-gray-700" />
                  <span className="text-sm text-gray-600 font-medium">
                    {metric.label}
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <h2 className="text-4xl font-bold text-gray-900">
                    {metric.value}
                  </h2>
                  
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    metric.isPositive ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    <span>{metric.change}%</span>
                    <TrendIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}