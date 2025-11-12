'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import MileStoneDetails from '@/components/Pages/Dashboard/MilestoneDetails/MileStoneDetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<MileStoneDetails/>
  )
}

export default page
