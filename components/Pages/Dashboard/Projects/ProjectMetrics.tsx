import MetricsCard from "@/components/ui/Custom/MetricsCard";
import { Building2, AlertCircle, AlertTriangle } from "lucide-react";




export default function ProjectMetrics({stats} :any) {
  const metrics = [
  {
    icon: Building2,
    label: 'Active Projects',
    value: stats.activeProjects,
   
  },
  {
    icon: AlertCircle,
    label: 'Total Milestone',
    value: stats.totalMilestones,
   
  },
  {
    icon: AlertTriangle,
    label: 'Pending Approval',
    value: stats.pendingApprovals,
  
  },
  {
    icon: AlertTriangle,
    label: 'Completed Project',
    value: stats.completionRate,
   
  }
];
  return <MetricsCard metrics={metrics} />;
}
