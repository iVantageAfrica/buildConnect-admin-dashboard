'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import MortgageDetails from '@/components/Pages/Dashboard/Mortgage/MortgageDetails/MortgageDetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<MortgageDetails id={id}/>
  )
}

export default page
