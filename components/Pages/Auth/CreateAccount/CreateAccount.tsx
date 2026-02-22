import React from 'react'
import Authlayout from '../Authlayout'
import Button from '@/components/ui/Button/Button'
import { PasswordInput } from '@/components/ui/Forms/PasswordInput'
import { EngineersWithBuidlingPlan} from '@/libs/constants/image'
import InputField from '@/components/ui/Forms/InputField'
import Link from 'next/link'
import { URLS } from '@/libs/constants/pageurl'
import { useAuth } from '@/libs/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createAccountSchema } from '@/libs/schema/authschema'
import Dropdown from '@/components/ui/Forms/Dropdown'

const CreateAccount = () => {

   const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
  });

  const { registerMutation } = useAuth();
     const utilityProvider = watch('role');
  const onSubmit = (data:any) => {
    console.log(data);
    registerMutation.mutate(data)
  };
      const utilityProviders = [
    { value: "admin", label: "Admin" },
    { value: "super_admin", label: "Super Admin" },
  ];
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <InputField
            label="Full Name"
            id="fullName"
            placeholder="Enter Full Name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </div>

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

        <div className="mb-6">
          <InputField
            label="Phone Number"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />
        </div>

        <div className="mb-6">
          <InputField
            label="Location"
            id="location"
            placeholder="Enter Location"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <div className="mb-6">
 <Dropdown
               width="responsive"
            label="Role"
            id="role"
            value={utilityProvider}
          onChange={(e) =>
            setValue("role", e.target.value, { shouldValidate: true })
          }
          options={utilityProviders}
          error={errors.role?.message as string}
          />
        </div>

        <Button 
          type="submit"
         loading={registerMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mb-6"
        >
          Create account
        </Button>
      </form>

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