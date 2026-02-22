import InputField from '@/components/ui/Forms/InputField'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const Address = () => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-4">
      <InputField 
        label="Street Address *" 
        placeholder="Enter street address" 
        error={errors.location?.message}
        {...register("location")}
      />

  
      </div>
  )
}

export default Address