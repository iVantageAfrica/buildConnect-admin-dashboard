import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import BuilderDetailsMetrics from './BuildersDetailsMetrics'
import { URLS } from '@/libs/constants/pageurl'
import Image from 'next/image'
import { AvatarImage } from '@/libs/constants/image'
import Button from '@/components/ui/Button/Button'
import Otherdetails from './Others/Otherdetails'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/ui/BackButton'

const BuilderDetails = (id :any) => {
    const router = useRouter();
  return (
 <DashboardLayout urlpath={URLS.DASHBOARD.USERS}>
      <BackButton label="Back" />
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
<BuilderDetailsMetrics/>
<Otherdetails/>
 </DashboardLayout>
  )
}

export default BuilderDetails