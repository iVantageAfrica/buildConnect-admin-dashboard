import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { Building2, AlertCircle, AlertTriangle } from "lucide-react";


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
    label: 'Total Milestone',
    value: '8',
    change: 15,
    isPositive: false
  },
  {
    icon: AlertTriangle,
    label: 'Pending Approval',
    value: '8',
    change: 15,
    isPositive: true
  },
  {
    icon: AlertTriangle,
    label: 'Completion Rate',
    value: '8',
    change: 15,
    isPositive: true
  }
];

export default function ProjectMetrics() {
  return <MetricsCard metrics={metrics} />;
}
