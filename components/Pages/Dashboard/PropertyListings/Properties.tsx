import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { URLS } from '@/libs/constants/pageurl'
import ActionButton from '@/components/ui/Button/ActionButton'
import { AlertCircle, AlertTriangle, Building2, PlusIcon } from 'lucide-react'
import MetricsCard from '@/components/ui/Custom/MetricsCard'
import PropertyListing from './PropertyListing'

const Properties = () => {

      const metrics = [
    {
      icon: Building2,
      label: 'Total Properties',
      value: '24',
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'For Sale',
      value: '9',
  
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Pre Sale',
      value: '8',
  
      isPositive: true
    },
     {
      icon: AlertTriangle,
      label: 'Verified',
      value: '8',
  
      isPositive: true
    },
    
  ];
  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.PROPERTIES}>
  <div className="">
    <div className="flex justify-between">
       <div>
            <p className="text-2xl font-bold">
          Property Listing
            </p>
          
        </div>

             <div>
                <ActionButton
          label="Add Property"
          icon={<PlusIcon />}
          href="/add-property"
        />
             </div>
    </div>
          

             <div className="mt-4">
                <MetricsCard metrics={metrics}/>
             </div>

             <div>
         <PropertyListing/>
             </div>
             
        </div>
    </DashboardLayout>
  )
}

export default Properties