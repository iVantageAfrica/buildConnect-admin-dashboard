import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { URLS } from '@/libs/constants/pageurl'
import Image from 'next/image'
import { AvatarImage } from '@/libs/constants/image'
import Button from '@/components/ui/Button/Button'
import Otherdetails from './Others/Otherdetails'
import { AlertCircle, AlertTriangle, Building2 } from 'lucide-react'
import MetricsCard from '@/components/ui/Custom/MetricsCard'
import BackButton from '@/components/ui/BackButton'


const UserDetails = (id :any) => {

   const metrics = [
    {
      icon: Building2,
      label: 'Total Projects',
      value: '24',
      change: 15,
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'Documents',
      value: '8',
      change: 15,
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Total Spents',
      value: 'N10M',
      change: 15,
      isPositive: true
    }
  ];
  return (
 <DashboardLayout urlpath={URLS.DASHBOARD.USERS}>
  <BackButton/>
  <div className="flex gap-4">
    <div>
          <button
      
          className="w-20 h-20 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Image
            src={AvatarImage}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </button>
    </div>

    <div className="mt-9">
      <div className="flex gap-4 mb-4">
           <p className="text-gray">John smith</p>
           <Button className="text-xs bg-gray-200 text-yellow-500">pending</Button>
      </div>
   
      <div className="flex gap-2">
        <p>john.smith@email.com</p>
          <p>234812345678</p>
      </div>
    </div>
  
  </div>

<MetricsCard metrics={metrics}/>


<Otherdetails/>
 </DashboardLayout>
  )
}

export default UserDetails