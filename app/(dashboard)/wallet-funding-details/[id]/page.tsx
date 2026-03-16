'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import WalletFunding from '@/components/Pages/Dashboard/Escrow/WalletFunding'
import WalletFundingDetails from '@/components/Pages/Dashboard/Escrow/WalleFundingdetails/WalletFundingdetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<WalletFundingDetails id={id}/>
  )
}

export default page
