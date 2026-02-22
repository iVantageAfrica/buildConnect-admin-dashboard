import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: number;
  isPositive?: boolean;
}

interface MetricsCardProps {
  metrics: MetricItem[];
}

export default function MetricsCard({ metrics }: MetricsCardProps) {
  const count = metrics.length;

  // Pick a grid-cols class that matches the number of metrics at large screens,
  // then collapse gracefully on smaller viewports.
  const gridCols =
    count === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : count === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : count === 4
      ? "grid-cols-2 lg:grid-cols-4"     // 2×2 on tablet, 4-wide on desktop
      : "grid-cols-2 lg:grid-cols-3";    // fallback for 5+

  return (
    <div className="  py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${gridCols} border-t border-l border-gray-200`}>
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
                className="py-8 px-6 border-b border-r border-gray-200"
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