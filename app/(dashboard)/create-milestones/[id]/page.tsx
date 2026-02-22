'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import ProjectDetails from '@/components/Pages/Dashboard/ProjectDetails/ProjectDetails'
import CreateMilestoneForm from '@/components/Pages/Dashboard/CreateMilestones/CreateMilestones'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<CreateMilestoneForm id={id}/>
  )
}

export default page
