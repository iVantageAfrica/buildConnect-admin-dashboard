'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import BuilderDetails from '@/components/Pages/Dashboard/BuilderDetails/BuilderDetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<BuilderDetails/>
  )
}

export default page
