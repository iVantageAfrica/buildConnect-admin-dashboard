'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import PaymentInstructionDetails from '@/components/Pages/Dashboard/Escrow/PaymentInstructiondetails/PaymentInstructiondetails'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<PaymentInstructionDetails id={id}/>
  )
}

export default page
