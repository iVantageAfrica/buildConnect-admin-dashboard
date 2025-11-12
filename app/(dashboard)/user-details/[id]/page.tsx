'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import UserDetails from '@/components/Pages/Dashboard/UserDetails/UserDetails'
const page = () => {
   const params = useParams()
    const { id } = params
  return (
<UserDetails/>
  )
}

export default page
