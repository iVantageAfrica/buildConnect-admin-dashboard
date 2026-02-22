'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import ProjectDetails from '@/components/Pages/Dashboard/ProjectDetails/ProjectDetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<ProjectDetails id={id}/>
  )
}

export default page
