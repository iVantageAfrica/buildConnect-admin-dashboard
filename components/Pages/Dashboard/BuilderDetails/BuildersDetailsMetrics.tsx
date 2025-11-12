import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { Building2, AlertCircle, AlertTriangle } from "lucide-react";

export default function BuilderDetailsMetrics() {
  const metrics = [
    {
      icon: Building2,
      label: "Completed Projects",
      value: "24",
      change: 15,
      isPositive: true,
    },
    {
      icon: AlertCircle,
      label: "Total Bids",
      value: "8",
      change: 15,
      isPositive: false,
    },
    {
      icon: AlertTriangle,
      label: "Total Earned",
      value: "8",
      change: 15,
      isPositive: true,
    },
  ];

  return <MetricsCard metrics={metrics} />;
}
