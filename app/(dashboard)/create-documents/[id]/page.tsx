'use client'
import React from 'react'
import { useParams } from 'next/navigation'

import CreateDocuments from '@/components/Pages/Dashboard/CreateDocuments/CreateDocuments'

const page = () => {
   const params = useParams()
    const { id } = params
  return (
<CreateDocuments id={id}/>
  )
}

export default page
