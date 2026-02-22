import React from 'react'
import Authlayout from '../Authlayout'
import { TwoPeopleWithBuildingPlan } from '@/libs/constants/image'
import InputField from '@/components/ui/Forms/InputField'
import Button from '@/components/ui/Button/Button'
import { PasswordInput } from '@/components/ui/Forms/PasswordInput'
import { useSearchParams, useRouter } from 'next/navigation'
import { decryptUrl } from '@/libs/utils/helpers'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/libs/hooks/useAuth'
import { resetPasswordInput, resetPasswordSchema } from '@/libs/schema/authschema'
import Link from 'next/link'
import { URLS } from '@/libs/constants/pageurl'

const CreateNewPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token: any = searchParams.get('token')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const { resetPasswordMutation } = useAuth()

  const handleResetPassword = handleSubmit((formData: resetPasswordInput) => {
     const parsedData = decryptUrl(token);
      const { email, otp } =  JSON.parse(parsedData);
      const dataToSend = {
        ...formData,
        email,
        otp
      }
      
      resetPasswordMutation.mutate(dataToSend)
  })

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

      <form onSubmit={handleResetPassword}>
  
        <div className="mb-4">
          <PasswordInput
            label="New Password"
            id="newPassword"
            placeholder="Enter new password"
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            label="Confirm New Password"
            id="confirmNewPassword"
            placeholder="Confirm new password"
            error={errors.confirmNewPassword?.message}
            {...register('confirmNewPassword')}
          />
        </div>

        <Button 
          type="submit"
          loading={resetPasswordMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-6"
        >
          Reset Password
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <Link href={URLS.AUTH.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </Authlayout>
  )
}

export default CreateNewPassword