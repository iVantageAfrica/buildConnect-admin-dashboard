'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import WalletFunding from '@/components/Pages/Dashboard/Escrow/WalletFunding'
import WalletFundingDetails from '@/components/Pages/Dashboard/Escrow/WalleFundingdetails/WalletFundingdetails'
import PropertyDetails from '@/components/Pages/Dashboard/PropertyListings/PropertyDetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<PropertyDetails id={id}/>
  )
}

export default page
