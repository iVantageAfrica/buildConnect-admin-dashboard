import React from 'react'
import Authlayout from '../Authlayout'
import { TwoPeopleWithBuildingPlan } from '@/libs/constants/image'
import InputField from '@/components/ui/Forms/InputField'
import Button from '@/components/ui/Button/Button'
import Link from 'next/link'
import { URLS } from '@/libs/constants/pageurl'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from "@/libs/hooks/useAuth"
import { forgotPasswordInput, forgotPasswordSchema } from "@/libs/schema/authschema" 


const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const { forgotPasswordMutation } = useAuth();

  const handleForgotPassword = handleSubmit((data: forgotPasswordInput) => {
    forgotPasswordMutation.mutate(data)
  })

  return (
    <Authlayout image={TwoPeopleWithBuildingPlan}>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleForgotPassword}>
        <div className="mb-6">
          <InputField
            label="Email Address"
            id="email"
            type="email"
            placeholder="Enter Email Address"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Button 
          type="submit"
          loading={forgotPasswordMutation?.isPending} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-6"
        >
          Submit
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link href={URLS.AUTH.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </Authlayout>
  )
}

export default ForgotPassword