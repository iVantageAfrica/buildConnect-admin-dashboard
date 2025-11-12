"use client"
import React from 'react'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { URLS } from '@/libs/constants/pageurl'
import BackButton from '@/components/ui/BackButton'
import InputField from '@/components/ui/Forms/InputField'
import FileUploadComponent from '@/components/ui/Forms/ImageForm'
import { Controller, useForm } from 'react-hook-form'
import FileUpload from '@/components/ui/Forms/UploadForm'
import Button from '@/components/ui/Button/Button'

const AddProperty = () => {
   const { control, handleSubmit } = useForm({
    // resolver: zodResolver(),
  });
  return (
  <DashboardLayout urlpath={URLS.DASHBOARD.DOCUMENTS}>
<BackButton/>
<div>
  <div className="mb-9">
        <p className="text-2xl font-bold">
            Property
            </p>
            <p className="text-md">Upload a new document and optionally associate it with a user project</p>
        </div>
    </div>

<div className="border border-gray-300 p-6 rounded-xl">
 <div className="grid grid-cols-2 gap-4">
     <InputField
        label="Document Name"
          id="Final Contract"
          placeholder="e.g., Site visit"
            // error={errors.meetingTitle?.message}
            // {...register("meetingTitle")}
              />

              <InputField
        label="Document Type"
          id="Final Contract"
          placeholder="e.g., Site visit"
            // error={errors.meetingTitle?.message}
            // {...register("meetingTitle")}
              />
 </div>

 <div className="mt-4 mb-4">
   <InputField
        label="Document Type"
          id="Final Contract"
          placeholder="e.g., Site visit"
            // error={errors.meetingTitle?.message}
            // {...register("meetingTitle")}
              />
 </div>

 <Controller
        name="files"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FileUpload
            label="Upload your documents"
            accept="documents"
            multiple
            onFileSelect={(files) => onChange(files)}
            onError={(error) => console.error(error)}
          />
        )}
      />

      {/* {errors.files && (
        <p className="text-red-500 text-sm mt-1">{errors.files.message}</p>
      )} */}

      <div className="flex gap-2 mt-5">
         <Button
                  type="submit"
                  className=" border  border-gray-400 bg-gray-100  text-black hover:bg-primary"
              
                >
               Cancel
                </Button>
         <Button
                  type="submit"
                  className="text-white bg-primary-02 hover:bg-primary"
              
                >
               Submit
                </Button>
      </div>
 <div>

 </div>
</div>
  </DashboardLayout>
  )
}

export default AddProperty