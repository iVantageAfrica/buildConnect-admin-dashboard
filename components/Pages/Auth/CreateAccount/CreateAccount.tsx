import React from 'react'
import Authlayout from '../Authlayout'
import Button from '@/components/ui/Button/Button'
import { PasswordInput } from '@/components/ui/Forms/PasswordInput'
import { EngineersWithBuidlingPlan} from '@/libs/constants/image'
import InputField from '@/components/ui/Forms/InputField'
import Link from 'next/link'
import { URLS } from '@/libs/constants/pageurl'

const CreateAccount = () => {
  return (
<Authlayout image={EngineersWithBuidlingPlan}>
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Your Admin Account
        </h1>
        <p className="text-gray-600 text-sm sm:text-base text-center">
   Set up your BuildConnect dashboard to manage projects, milestones, and approvals seamlessly.
        </p>
      </div>
        <div className="mb-6">
               <InputField
                 label="First Name"
                 id="firstname"
                 placeholder="Enter Email Address"
                 //   error={errors.emailAddress?.message}
                 //   {...register("emailAddress")}
               />
             </div>
             <div className="mb-6">
               <InputField
                 label="Last Name"
                 id="lastname"
                 placeholder="Enter Last Name"
                 //   error={errors.emailAddress?.message}
                 //   {...register("emailAddress")}
               />
             </div>
          <div className="mb-6">
               <InputField
                 label="Phone Number"
                 id="phonenumber"
                 placeholder="Enter Phone Number"
                 //   error={errors.emailAddress?.message}
                 //   {...register("emailAddress")}
               />
             </div>
             

           <div className="mb-6">
             <PasswordInput
               label="Password"
               id="password"
               placeholder="Confirm Password"
               //   error={errors.password?.message}
               //   {...register("password")}
             />
           </div>


      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-6">
        Sign up
      </Button>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href={URLS.AUTH.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">
            Login
          </Link>
        </p>
      </div>
</Authlayout>
  )
}

export default CreateAccount