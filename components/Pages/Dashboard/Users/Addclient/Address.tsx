import InputField from '@/components/ui/Forms/InputField'
import React from 'react'

const Address = () => {
  return (
     <div className="space-y-4">
       <div className="">
   
         <InputField label="Address" placeholder="Enter client name" />
       </div>
       <div>
    
         <InputField label="City" placeholder="City" />
       </div>
       <div>
  
         <InputField label="State" placeholder="State" />
       </div>
       <div>
  
         <InputField  label="Post Code" placeholder="Post Code" />
       </div>
     </div>
  )
}

export default Address