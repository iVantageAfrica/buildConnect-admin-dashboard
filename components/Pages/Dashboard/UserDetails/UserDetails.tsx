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
import { useUsers } from '@/libs/hooks/useUsers'

export interface UserDetailsProps {
  id: string;
}

const UserDetails = ({ id }: UserDetailsProps) => {


  const { singleUserQuery } = useUsers()
  const { data, isLoading, error } = singleUserQuery(id); 

  console.log('User data:', data);
  if (isLoading) {
    return (
      <DashboardLayout urlpath={URLS.DASHBOARD.USERS}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout urlpath={URLS.DASHBOARD.USERS}>
        <div className="text-red-500 text-center p-4">
          Error loading user: {error.message}
        </div>
      </DashboardLayout>
    );
  }

 
  const user = data?.data?.data || {};
  const metrics = [
    {
      icon: Building2,
      label: 'Total Projects',
      value: user.projectsCount || 0,
      change: 15,
      isPositive: true
    },
    {
      icon: AlertCircle,
      label: 'Documents',
      value: user.documentsCount || 0,
      change: 15,
      isPositive: false
    },
    {
      icon: AlertTriangle,
      label: 'Total Spent',
      value: '₦0', 
      change: 15,
      isPositive: true
    },
    {
      icon: AlertTriangle,
      label: 'Total Earned',
      value: '₦0', 
      change: 15,
      isPositive: true
    }
  ];

  return (
    <DashboardLayout urlpath={URLS.DASHBOARD.USERS}>
      <BackButton/>
      <div className="flex gap-4">
        <div>
          <button className="w-20 h-20 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Image
              src={AvatarImage}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        <div className="mt-9">
          <div className="flex gap-4 mb-4">
            <p className="text-gray-800 font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <Button className="text-xs bg-gray-200 text-yellow-500 capitalize">
              {user.verificationStatus || 'pending'}
            </Button>
          </div>
   
          <div className="flex gap-4">
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phoneNumber}</p>
          </div>
        </div>
      </div>

      <MetricsCard metrics={metrics}/>
      <Otherdetails id={id}/>
    </DashboardLayout>
  )
}

export default UserDetails