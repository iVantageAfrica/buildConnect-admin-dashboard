import React from 'react'
import Authlayout from '../Authlayout'
import { TwoPeopleWithBuildingPlan } from '@/libs/constants/image'
import InputField from '@/components/ui/Forms/InputField'
import Button from '@/components/ui/Button/Button'
import { PasswordInput } from '@/components/ui/Forms/PasswordInput'

const CreateNewPassword = () => {
  return (
    <Authlayout image={TwoPeopleWithBuildingPlan}>
       <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-2">
          Create New Password
        </h1>
        <p className="text-gray-600 text-sm sm:text-base text-center">
      Enter your new password below.
        </p>
      </div>
       <div className="mb-6">
             <PasswordInput
               label="Password"
               id="password"
               placeholder="Enter Password"
               //   error={errors.password?.message}
               //   {...register("password")}
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
        Reset Password
      </Button>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">
          Forgot Password?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Recover
          </a>
        </p>
      </div>
    </Authlayout>
  )
}

export default CreateNewPassword