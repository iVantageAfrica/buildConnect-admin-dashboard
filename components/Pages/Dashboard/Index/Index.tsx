import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import CalendarHeader from '@/components/ui/Datepicker'
import MetricsDashboard from './MetricsCard'
import RecentActivity from './Table'
import { URLS } from '@/libs/constants/pageurl'

const Index = () => {
  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.DASHBOARD}>
  <div>

   <MetricsDashboard/>
   <RecentActivity/>
    </div>
    </DashboardLayout>
  )
}

export default Index