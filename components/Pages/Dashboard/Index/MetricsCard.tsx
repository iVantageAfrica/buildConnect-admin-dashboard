import React from 'react';
import { Building2, AlertCircle, AlertTriangle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboard } from '@/libs/hooks/useDashboard';
import MetricsCard from '@/components/ui/Custom/MetricsCard';

export default function MetricsDashboard() {

   const { getAnalyticsQuery } = useDashboard();
    const { data, isLoading, error } = getAnalyticsQuery();
  
    const analytics = data?.data?.data || [];
     console.log(analytics);
  const metrics = [
    {
      icon: Building2,
      label: 'Active Projects',
      value: analytics?.activeProjects ?? 0,
    },
    {
      icon: AlertCircle,
      label: 'Pending Verifications',
       value: analytics?.pendingVerifications ?? 0,
    },
    {
      icon: AlertTriangle,
      label: 'Open Disputes',
       value: analytics?.openDisputes ?? 0,
    },
    {
      icon: DollarSign,
      label: 'Total Escrow Value',
     value: analytics?.totalEscrowValue ?? 0,
    }
  ];

  return (
    <MetricsCard metrics={metrics}/>
  );
}