import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { Building2, AlertCircle, AlertTriangle } from "lucide-react";




export default function ProjectMetrics({stats} :any) {
  const metrics = [
  {
    icon: Building2,
    label: 'Active Projects',
    value: stats.activeProjects,
    change: 15,
    isPositive: true
  },
  {
    icon: AlertCircle,
    label: 'Total Milestone',
    value: stats.totalMilestones,
    change: 15,
    isPositive: false
  },
  {
    icon: AlertTriangle,
    label: 'Pending Approval',
    value: stats.pendingApprovals,
    change: 15,
    isPositive: true
  },
  {
    icon: AlertTriangle,
    label: 'Completed Project',
    value: stats.completionRate,
    change: 15,
    isPositive: true
  }
];
  return <MetricsCard metrics={metrics} />;
}
