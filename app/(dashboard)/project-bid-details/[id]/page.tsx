'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import ProjectBidDetails from '@/components/Pages/Dashboard/ProjectBidDetails/ProjectBidDetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
 <ProjectBidDetails/>
  )
}

export default page
