'use client'
import React from 'react'
import { useParams } from 'next/navigation'

import CreateDocuments from '@/components/Pages/Dashboard/CreateDocuments/CreateDocuments'
import ScheduleMeetings from '@/components/Pages/Dashboard/ScheduleMeetings/ScheduleMeetings'

const page = () => {
   const params = useParams()
    const { id, clientid } = params
  return (
<ScheduleMeetings id={id}  organizerId={clientid}/>
  )
}

export default page
