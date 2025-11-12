import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: number;            // optional
  isPositive?: boolean;       // optional (only used if change exists)
}

interface MetricsCardProps {
  metrics: MetricItem[];
}

export default function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-stretch border-t border-b border-gray-200">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon =
              metric.change !== undefined
                ? metric.isPositive
                  ? TrendingUp
                  : TrendingDown
                : null;

            return (
              <div
                key={index}
                className={`flex-1 py-8 px-6 ${
                  index !== metrics.length - 1 ? "border-r border-gray-200" : ""
                }`}
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

                  {metric.change !== undefined && (
                    <div
                      className={`flex items-center gap-1 text-sm font-semibold ${
                        metric.isPositive ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      <span>{metric.change}%</span>
                      {TrendIcon && <TrendIcon className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
